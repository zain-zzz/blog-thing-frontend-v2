import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../firebaseconfig'
import {NavLink} from 'react-router-dom';
// import Popup from './PostPopup.jsx';

export default function Mainpage({setIsAuth, isAuth}) {

  const [posts, setposts] = useState([])
  const [username, setusername] = useState<string | null>()
  const [popupOpen, setPopupOpen] = useState(false)

  async function fetchData() {
    const response = await fetch('http://localhost:3003/posts')
    const data = await response.json()
    setposts(data)
  }
  
  async function getUsername() {
    fetch('http://localhost:3003/getUsername/' + auth.currentUser?.email)
    .then(res => res.text())
    .then(text => {
      console.log(text)
      setusername(text)
    });
  }
  
  useEffect(() => {
    if (posts.length === 0) {
      fetchData()
      getUsername()
      //console.log('twwt')
    }
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


  // setInterval


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
          <div key={current.content} className='postCard'>
            <h1 className='title'>{current.username}</h1>
            <h3 className='content'>{current.content}</h3>
          </div>
        )
      })}
    </div>
    <div className='rightFeed'>
      <h1>{username} is logged in!</h1>
      {/* {popupOpen && <PostPopup name={name} setPopupOpen={setPopupOpen}/>} */}
      {/* <button onClick={() => setPopupOpen(true)}>Post</button> */}
    </div>
    </section>
    </>
  )
}
