import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState, Component } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebaseconfig";
import { NavLink } from "react-router-dom";
import FileUpload from "./FileUpload.tsx";

// import Popup from './Popup.jsx';

export default function Dashboard({ setIsAuth, isAuth }) {
  const [posts, setposts] = useState([]);
  const [username, setusername] = useState<string | null>("empty");
  const [popupOpen, setPopupOpen] = useState(false);
  const [email, setEmail] = useState<string | null>();
  const [profilePicture, setProfilePicture] = useState<string>();

  useEffect(() => {
    if (auth.currentUser) {
      setEmail(auth.currentUser?.email);
      setIsAuth(true);
    } else {
      navigate("/login");
    }
  });

  const navigate = useNavigate();

  function logOut() {
    signOut(auth);
    navigate("/login");
  }

  async function fetchData() {
    const response = await fetch(
      "http://localhost:3003/getPostsByEmail/" + auth.currentUser?.email
    );
    const data = await response.json();
    setposts(data);
  }

  async function getUsername() {
    fetch("http://localhost:3003/getUsername/" + auth.currentUser?.email)
      .then((res) => res.text())
      .then((text) => {
        //console.log(text);
        setusername(text);
        setProfilePicture(`http://localhost:3003/images/${text}-PFP.png`);
      });
  }

  useEffect(() => {
    if (posts.length === 0) {
      fetchData();
      getUsername();
      //console.log("twwt");
    }
  }, [posts]);

  

  return (
    <>
      <section className="feedCont">
        <div className="leftFeed">
          <NavLink to={"/"}>Feed</NavLink>
          <h2>Dashboard</h2>
          <button onClick={logOut}>Sign out</button>
        </div>

        <div className="dashboardCenterFeed">
          <div className="profileDisplay">
            <div className="profilePicture">
              <img src={profilePicture}   
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
                }}
              />
            </div>

            <div className="profileInfo">
              <h2> {username} </h2>
              <h4> {email} </h4>
            </div>
          </div>

          <h1 className="titleSmall">My Posts</h1>

          {
            <div className="posts">
              {posts.map((current: any) => {
                return (
                  <div className="myPostsCont">
                    <div key={current.id} className="myPosts">
                      <h1>{username}</h1>
                      <h3>{current.content}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          }
        </div>

        <div className="rightFeed">
          <div className="fileUploadContainer">
            <i className="fileUploadForm"/> Upload a Profile Picture
            <FileUpload />
          </div>
        </div>

        

      </section>
    </>
  );
}
function typeOf(username: string | null | undefined) {
  throw new Error("Function not implemented.");
}
