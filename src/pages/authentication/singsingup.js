
import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./login.css";
import { Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { profile, userLogin, userReg } from "../../api service/api";
import { toast } from "react-toastify";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  focused: {},
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
    color:"white",
  }
}));

function App() {
  const classes = useStyles();

  const [signup, setSignup] = useState(true);

  const nav = useNavigate();

  //Login
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const loginHandler = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value})
 }

  const handel = async () => {
    let res = await userLogin({ email: loginValues.email, password: loginValues.password });
    if (!res.ok) return toast.error(res?.message);
    localStorage.setItem("token", JSON.stringify(res?.data?.token));
    let response=await profile();
    console.log(response);
    nav("/");
  };

  //Register
  const [signupValues, setSignupValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const registerHandler = (e) => {
    setSignupValues({ ...signupValues, [e.target.name]: e.target.value });
  };

  const reg = async () => {
    let res = await userReg({
      username: signupValues.username,
      email: signupValues.email,
      password: signupValues.password,
    });
    if (!res.ok) return toast.error(!res.message);
    setSignup(!signup);
  };

 
  
  return (
    <div style={{ height: "100%" }}>
      <MDBContainer
        style={{position:"absolute",top:0}}
        fluid
        className="p-4 background-radial-gradient "
      
      >
        <MDBRow style={{width:"100%",display: "flex",justifyContent: "center",alignItems: "center"}} >
        
          <MDBCol style={{ display: "flex",justifyContent: "center",alignItems: "center",height:"100%"}}  >
            {signup ? (
              <MDBCard className="my-5 bg-glass" style={{width:"450px" ,top:"421px"}}> 
                <MDBCardBody className="p-5">
                  <center>
                    <h1 style={{color:"white"}}>Login</h1>
                  </center>
                  <br />
                  <center>
                    <TextField
                      id="standard-password-input"
                      name="email"
                      label="Email"
                      variant="outlined"
                      InputProps={{
                        classes: {
                          root: classes.root,
                          focused: classes.focused,
                          notchedOutline: classes.notchedOutline
                        }
                          }}
                      style={{
                        width: "101%",
                        marginBottom: "37px",
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {color: 'white'},//styles the label
                        "& .MuiOutlinedInput-root": {
                          "& > fieldset": { borderColor: "white", fontcolor:"white" },
                        },
                        "& .MuiFormLabel-root": {
                          "&.Mui-focused": { color: "white" },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "white",
                        },
                      }}
                      onChange={loginHandler}
                    />
                   <TextField
                      id="standard-password-input"
                      name="password"
                      label="PassWord"
                      variant="outlined"
                      // fontcolor="white"
                      InputProps={{
                        classes: {
                          root: classes.root,
                          focused: classes.focused,
                          notchedOutline: classes.notchedOutline
                        }
                          }}
                      style={{
                        width: "101%",
                        marginBottom: "37px",
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {color: 'white'},//styles the label
                        "& .MuiOutlinedInput-root": {
                          "& > fieldset": { borderColor: "white", fontcolor:"white" },
                        },
                        "& .MuiFormLabel-root": {
                          "&.Mui-focused": { color: "white" },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "white",
                        },
                      }}
                      onChange={loginHandler}
                    />
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                   <div  style={{filter: "drop-shadow(5px 5px 5px rgba(255, 255, 255))" ,marginTop:"8px"}}><Link onClick={() => setSignup(!signup)}><Typography style={{color:"whitesmoke",filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))" }} >Create Account</Typography></Link></div> 
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
                    <h1>Create Account</h1>
                  </center>
                  <TextField
                      id="standard-password-input"
                      name="username"
                      label="Name"
                      variant="outlined"
                      style={{
                        width: "101%",
                        marginBottom: "37px",
                      }}
                      onChange={registerHandler}
                    />
                <TextField
                      id="standard-password-input"
                      name="email"
                      label="Email"
                      variant="outlined"
                      style={{
                        width: "101%",
                        marginBottom: "37px",
                      }}
                      onChange={registerHandler}
                    />
                 <TextField
                      id="standard-password-input"
                      name="password"
                      label="PassWord"
                      variant="outlined"
                      style={{
                        width: "101%",
                        marginBottom: "37px",
                      }}
                      onChange={registerHandler}
                    />
                  <center>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div  style={{filter: "drop-shadow(5px 5px 5px rgba(255, 255, 255))",marginTop:"8px"}}> <Link onClick={() => setSignup(!signup)}><Typography style={{color:"whitesmoke",filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.3))"}}>Login</Typography></Link></div>
                    <Button variant="contained" onClick={reg}>
                      sign up
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
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default App;
