
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
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { profile, userLogin, userReg } from "../../api service/api";
import { toast } from "react-toastify";

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
    <div style={{ height: "100%" }}>
     
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
        <MDBRow style={{width:"100%",display: "flex",justifyContent: "center",alignItems: "center"}} >
          {/* <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
            style={{ top: "-10%" }}
          >
            <h1
              className="my-1 display-3 fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              <br />
              <span
                style={{ color: "hsl(218, 81%, 75%)", fontFamily: "serif" }}
              >
                {" "}
                Mass Media
              </span>
            </h1>

            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
          </MDBCol> */}
             
          <MDBCol style={{ display: "flex",justifyContent: "center",alignItems: "center",height:"100%"}}   >
            {singup ? (
              <MDBCard className="my-5 bg-glass" style={{width:"450px" ,top:"0"}}> 
                <MDBCardBody className="p-5">
                  <center>
                    <h1>Login</h1>
                  </center>
                  <br />
                  <center>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      style={{
                        width: "101%",
                        backgroundColor: "white",
                        marginBottom: "37px",
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                      id="outlined-basic"
                      label="PassWord"
                      variant="outlined"
                      style={{
                        width: "101%",
                        backgroundColor: "white",
                        marginBottom: "37px",
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
                    <Button variant="contained" onClick={handel}>
                      Login
                    </Button>
                    <br />
                    <br />
                    <Link onClick={() => setSingup(!singup)}>singup</Link>
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
