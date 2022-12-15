import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../firebaseconfig'

export default function Mainpage({setIsAuth, isAuth}) {

  const [posts, setposts] = useState([])

  async function fetchData() {
    const response = await fetch('http://localhost:3003/posts')
    const data = await response.json()
    setposts(data)
  }

  useEffect(() => {
    fetchData()
  }, [posts])

  const [name, setName] = useState<string | null>()
  const [postContent, setPostContent] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.currentUser) {
      setName(auth.currentUser?.email)
      setIsAuth(true)
    } else {
      navigate('/login')
    }
  })

  function logOut() {
    signOut(auth)
    navigate('/login')
  }

  async function postImage() {
    const response = await fetch('http://localhost:3003/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: name,
        content: postContent
      })
    })
  }

  return (
    <>
  <section className='feedCont'>
    <div className='leftFeed'>
      
    </div>
    <div className='centerFeed'>
      {posts.map((current:any) => {
        return (
          <div key={current.id} className='postCard'>
            <h1 className='title'>{current.username}</h1>
            <h3 className='content'>{current.content}</h3>
          </div>
        )
      })}
    </div>
    <div className='rightFeed'>
      <h1>{name} is logged in!</h1>
      <button>Post</button>
    </div>
    </section>
    </>
  )
}
