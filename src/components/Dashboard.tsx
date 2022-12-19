import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../firebaseconfig'
import {NavLink} from 'react-router-dom';
import Popup from './Popup.jsx';

export default function Dashboard({setIsAuth, isAuth}) {

  const [posts, setposts] = useState([])
  const [username, setusername] = useState<string | null>()
  const [popupOpen, setPopupOpen] = useState(false)
  const [email, setEmail] = useState<string | null>()

  useEffect(() => {
    if (auth.currentUser) {
      setEmail(auth.currentUser?.email)
      setIsAuth(true)
    } else {
      navigate('/login')
    }
  })

  const navigate = useNavigate()

  function logOut() {
    signOut(auth)
    navigate('/login')
  }

  async function fetchData() {
    const response = await fetch('http://localhost:3003/getPostsByEmail/' + auth.currentUser?.email)
    const data = await response.json()
    setposts(data)
  }
  
  useEffect(() => {
    fetchData()
  }, [posts])

  async function getUsername() {
    fetch('http://localhost:3003/getUsername/' + auth.currentUser?.email)
    .then(res => res.text())
    .then(text => {
      //console.log(text)
      setusername(text)
    });
  }

  getUsername()

  return (
  <>

  <section className='feedCont'>
    <div className='leftFeed'>

    <NavLink to={'/'}>Feed</NavLink>
    <h2>Dashboard</h2>
    <button onClick={logOut}>Sign out</button>

    </div>



    <div className='dashboardCenterFeed'>


      <div className='profileDisplay'>

        <div className='profilePicture'>
          <img src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"/>
        </div>
        
        <div className='profileInfo'>
          <h2> {username} </h2>
          <h4> {email} </h4>
        </div>


      </div>


      <h1 className='titleSmall'>My Posts<span> (scroll right)</span></h1>

      <div className='posts'>
        {posts.map((current:any) => {
          return (
        <div className="myPostsCont">

            <div key={current.id} className='myPosts'>
              <h1>{username}</h1>
              <h3>{current.content}</h3>
            </div>

        </div>
          )
        })}
      </div>


    </div>
    
    <div className='rightFeed'>
      <h1>{username}</h1>
      {/* {popupOpen && <Popup name={name} setPopupOpen={setPopupOpen}/>}
      <button onClick={() => setPopupOpen(true)}>Post</button> */}
    </div>


  </section>

</>)
}
