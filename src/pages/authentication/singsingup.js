
import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./login.css";
import { Button, TextField, Typography,Input } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { profile, userLogin, userReg } from "../../api service/api";
import { toast } from "react-toastify";
import Back from "../backround/back";

function App() {
  const [singup, setSingup] = useState(true);
  const [singupName, setSingupName] = useState("");
  const [singupEmail, setSingupEmail] = useState("");
  const [singupPassword, setSingupPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handel = async () => {
    let res = await userLogin({ email, password });
    if (!res.ok) return toast.error(res?.message);
    localStorage.setItem("token", JSON.stringify(res?.data?.token));
    let response=await profile()
    console.log(response);
    nav("/");
  };
  const reg = async () => {
    let res = await userReg({
      username: singupName,
      email: singupEmail,
      password: singupPassword,
    });
    if (!res.ok) return toast.error(!res.message);
    
    setSingup(!singup);
  };
  return (
    <div style={{ height: "100%" , position:"relative"}}>
      <div  style={{}} >
        <Back  />  
      </div>
      <MDBContainer
        style={{position:"absolute",top:0}}
        fluid
        className="p-4 background-radial-gradient "
      
      >
        <MDBRow style={{width:"100%",display: "flex",justifyContent: "center",alignItems: "center"}} >
        
          <MDBCol style={{ display: "flex",justifyContent: "center",alignItems: "center",height:"100%"}}  >
            {singup ? (
              <MDBCard className="my-5 bg-glass" style={{width:"450px" ,top:"0"}}> 
                <MDBCardBody className="p-5">
                  <center>
                    <h1>Login</h1>
                  </center>
                  <br />
                  <center>
                    <TextField
                      id="standard-password-input"
                      label="Email"
                      variant="outlined"
                      style={{
                        width: "101%",
                        marginBottom: "37px",
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                      id="standard-password-input"
                      label="PassWord"
                      variant="outlined"
                      style={{
                        width: "101%",
                        marginBottom: "37px",
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
                    {/* <Button variant="contained" onClick={handel}>
                      Login
                    </Button>
                    <br />
                    <br />
                    <Link onClick={() => setSingup(!singup)}>Create Account</Link> */}
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                    <Link onClick={() => setSingup(!singup)}><Typography style={{color:"white"}} >Create Account</Typography></Link>
                     <Button variant="contained" onClick={handel}>
                      Login
                    </Button>
                    </div>
                  </center>
                  <br />
                  <br />
                  <div className="text-center">
                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="facebook-f" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="twitter" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="google" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="github" size="sm" />
                    </MDBBtn>
                  </div>
                </MDBCardBody>  
              </MDBCard>
            ) : (
              <MDBCard className="my-5 bg-glass"  style={{width:"450px" ,top:"0"}}>
                <MDBCardBody className="p-5">
                  <center>
                    <h1>singup</h1>
                  </center>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Name"
                    id="form3"
                    type="name"
                    onChange={(e) => setSingupName(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    id="form3"
                    type="email"
                    onChange={(e) => setSingupEmail(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="form4"
                    type="password"
                    onChange={(e) => setSingupPassword(e.target.value)}
                  />
                  <center>
                    <Button variant="contained" onClick={reg}>
                      singup
                    </Button>
                    <br />
                    <br />
                    <Link onClick={() => setSingup(!singup)}>Login</Link>
                  </center>
                  <br />
                  <br />
                  <div className="text-center">
                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="facebook-f" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="twitter" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="google" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="mx-3"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="github" size="sm" />
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default App;
