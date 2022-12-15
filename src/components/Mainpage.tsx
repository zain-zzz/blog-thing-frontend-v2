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
    <header>
    <h1>Insert title</h1>
  </header>
  <input id='postInput' type='input' onChange={(e) => {
    setPostContent(e.target.value)
  }}/>
  <button onClick={postImage}>post</button>
  <section className='sidebar'>
    <h2>welcome {name}</h2>
    <button onClick={logOut}>logout</button>
  </section>
  <section>
    {posts.map((current:any) => {
      return (
        <div className='postCard'>
          <h1 className='title'>{current.username}</h1>
          <h2>{current.content}</h2>
        </div>
      )
    })}
  </section>
    </>
  )
}
