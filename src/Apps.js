import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./pages/authentication/singsingup";
import Video from "./pages/Home/video";
import Chat from "./pages/chat/index";

import { ToastContainer } from "react-toastify";
import UploadVideo from "./header/upload.js";
import MyAccount from "./pages/profile/myAccount.js";
import { profile } from "./api service/api";
export default function Apps() {
  let navigate = useNavigate();

  let getToken = localStorage.getItem("token");
  let token;
  if (getToken) {
    token = JSON.parse(getToken);
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
    // eslint-disable-next-line
  }, [token]);

  return (
    <>
      <Routes>
        {!token && <Route exact path="/" element={<Layout />}></Route>}
        {token && <Route exact path="/" element={<Video />}></Route>}
        <Route exact path="/MyAccount" element={<MyAccount />}></Route>
        <Route exact path="/upload" element={<UploadVideo />}></Route>
        <Route exact path="/chat" element={<Chat />}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}
