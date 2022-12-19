import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../firebaseconfig'
import {NavLink} from 'react-router-dom';
import Popup from './Popup.jsx';

export default function Mainpage({setIsAuth, isAuth}) {

  const [posts, setposts] = useState([])
  const [username, setusername] = useState<string | null>()
  const [popupOpen, setPopupOpen] = useState(false)

  async function fetchData() {
    const response = await fetch('http://localhost:3003/posts')
    const data = await response.json()
    setposts(data)
  }

  useEffect(() => {
    fetchData()
  }, [posts])

  const [name, setName] = useState<string | null>()
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

  async function getUsername(email) {
    fetch('http://localhost:3003/getUsername/' + email)
    .then(res => res.text())
    .then(text => {
      //console.log(text)
      setusername(text)
    });
  }

  // useEffect( () => {
  //   posts.forEach(post => {
  //     getUsername(post.username)
  //     // console.log(post.username)
      
  //   })
  // },[])




  return (
    <>
  <section className='feedCont'>
    <div className='leftFeed'>
    <h2>Feed</h2>
    <NavLink to={'/dashboard'}>Dashboard</NavLink>
    <button onClick={logOut}>Sign out</button>
    </div>
    <div className='centerFeed'>
      {posts.map((current:any) => {
        //getUsername(current.username)
        return (
          <div key={current.id} className='postCard'>
            <h1 className='title'>{username}</h1>
            <h3 className='content'>{current.content}</h3>
          </div>
        )
      })}
    </div>
    <div className='rightFeed'>
      <h1>{name} is logged in!</h1>
      {popupOpen && <Popup name={name} setPopupOpen={setPopupOpen}/>}
      <button onClick={() => setPopupOpen(true)}>Post</button>
    </div>
    </section>
    </>
  )
}
