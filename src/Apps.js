import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./pages/authentication/singsingup";
import Video from "./pages/Home/video";
import Chat from "./pages/chat/index";
import { io } from "socket.io-client";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import UploadVideo from "./header/upload.js";
import MyAccount from "./pages/profile/myAccount.js";
import { profile } from "./api service/api";
import Store from "./context/context";

export default function Apps() {
  const [socketConnected,setSocketConnected]=useState(false)
  const [userDetails,setUserDetails]=useState([])
  const context=useContext(Store) 
  const ENDPOINT = "ws://localhost:7373/";
  let socket;
  let navigate = useNavigate();
  let getToken = localStorage.getItem("token");
  let token;
  let decoded;
  if (getToken) {
    token = JSON.parse(getToken);
    decoded = jwt_decode(token);
  }
  const pro = async () => {
    let res = await profile();
    if (!res?.ok) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  if(token){
    pro()
  }
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    socket = io(ENDPOINT)
    socket.emit("setup", decoded)
    socket.on("connected", () => setSocketConnected(true))
    socket.emit("addUser", decoded?.id);
    socket.on("getUser", (user) => {
      context.usersArr=user
      setUserDetails(user)
    });
   
  context.socket=socket
  console.log(decoded)
  context.userData=decoded
      // eslint-disable-next-line
  }, [token]);
  
  return (
    <>
      <Routes>
        {!token && <Route exact path="/" element={<Layout />}></Route>}
        {token && <Route exact path="/" element={<Video />}></Route>}
        <Route exact path="/MyAccount" element={<MyAccount />}></Route>
        <Route exact path="/upload" element={<UploadVideo />}></Route>
        <Route exact path="/chat" element={<Chat userDetails={userDetails}  />}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}
