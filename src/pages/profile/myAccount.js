/* eslint-disable */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Header from "../../header/index";
import {Modal, Slider, Button, CircularProgress } from "@mui/material";
import AvatarEditor from "react-avatar-editor";
import {
  MDBCol,
  // MDBContainer,
  MDBRow,
  MDBCard,
  // MDBCardText,
  MDBCardBody,
  MDBCardImage,
  // MDBBtn,
  MDBTypography,
  // MDBIcon,
  // MDBCardTitle
} from "mdb-react-ui-kit";
// import { Divider } from '@mui/material';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import LabTabs from "../profile/LabTabs.js";
import { Editprofile, profile } from "../../api service/api.js";
import { useEffect } from "react";
import { useState } from "react";
import "./myaccount.css"
import "../../header/profileedit.css"
import {MdPermIdentity} from 'react-icons/md'
import { AddAPhoto } from "@mui/icons-material";
import { useRef } from "react";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const boxStyle = {
  width: "300px",
  height: "300px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center"
};
const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const CropperModal = ({ src, modalOpen, setModalOpen,setRefresh,refresh }) => {
  const [slideValue, setSlideValue] = useState(10);
  const [loading,setLoading]=useState(false)
 
  const cropRef = useRef(null);

  const handleSave1 =async()=>{
   setLoading(true)
   const data = new FormData();
   data.append("file", src);
   data.append("upload_preset", "profileImage");
   data.append("cloud_name", "demxjipir");
   fetch("https://api.cloudinary.com/v1_1/demxjipir/upload", {
    method: "post",
    body: data,
  })
  .then((resp) => resp.json())
  .then(async (data) => {
    console.log(data)
    setLoading(false)
    try {
      if(data?.url){
       let res = await Editprofile({
          profilePicture:data.url
        })   
        setRefresh(!refresh)
        if(res?.ok)return toast.success(res.message)
      }
    } catch (error) {
      toast.error(error.message, {
            position: "top-right",
            autoClose: 2500,
          });
    }
  })

  }

  return (
    <>
   
    <Modal sx={modalStyle} open={modalOpen}>
      <Box sx={boxStyle}>
        <AvatarEditor
          ref={cropRef}
          image={src}
          style={{ width: "100%", height: "100%" }}
          border={50}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />

        {/* MUI Slider */}
        <Slider
          min={10}
          max={50}
          sx={{
            margin: "0 auto",
            width: "80%",
            color: "cyan"
          }}
          size="medium"
          defaultValue={slideValue}
          value={slideValue}
          onChange={(e) => setSlideValue(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            border: "3px solid white",
            background: "black"
          }}
        >
          <Button
            size="small"
            sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
            variant="outlined"
            onClick={(e) => setModalOpen(false)}
          >
            cancel
          </Button>
          <Button
            sx={{ background: "#5596e6" }}
            size="small"
            variant="contained"
            onClick={()=>{ 
              setModalOpen(false)  
              handleSave1()}}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
      {loading && (
              <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
            )}
             </>
  );
};

export default function MyAccount({prosanalid}) {
  const [data, setData] = useState(null);
  const [src, setSrc] = useState([]);
  const [refresh,setRefresh]=useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);
  // const [profiledata,setProfiledata]=useState(null)
  // const [profileIddata,setProfileIddata]=useState("")
  const pro = async () => {
    let res = await profile();
    setData(res?.data?.data)
  };

  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current. click()
  };

  const handleImgChange = (e) => {
    setSrc(e.target.files[0]) 
    setModalOpen(true)
  };
  useEffect(() => {
    pro();
  },[refresh]);
  return (
    <div style={{width:"99.5%"}}>
    { prosanalid===undefined ? <Header />:null}
      <Box sx={{ flexGrow: 1, marginTop: "5px",backgroundColor:"gray" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
                  <img
                // src="https://scitechdaily.com/images/Animated-Illustration-Atom.gif"
                src="https://www.bing.com/th/id/OGC.6fc9de85a9b477177029e7d362a96c50?pid=1.7&rurl=https%3a%2f%2fstatic.businessinsider.com%2fimage%2f55255d6069bedda52e3a96f2%2fimage.gif&ehk=7DtbPk73NQfTilTCyEkZ%2fh6ajJ2AMODOfheDpYbssUs%3d"
                style={{ width: "100%", height: "447px" }}
                alt="..."
              />
              <center>
                <h1 className="animate-charcter"  style={{
                 marginTop:" -288px",
                  zIndex: 0,
                  position: "10px",
                  fontWeight: "bold",
                  fontFamily: "serif", color: "white",
                  // wordBreak: "break-all"
                }}>
                 Mass Media</h1>    
              </center>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <MDBRow>
                <MDBCol md="12" xl="22">
                  <MDBCard style={{ borderRadius: "15px" ,backgroundColor:"#d5d4d48a" }}>
                    <MDBCardBody
                      style={{
                        alignItems: "baseline",
                        display: "flex",
                        flexWrap:"wrap"
                      }}
                    >
                   { prosanalid ===undefined ? 
                   <>
                      <CropperModal
                      modalOpen={modalOpen}
                      src={src}
                      setPreview={setPreview}
                      refresh={refresh}
                      setRefresh={setRefresh}
                      setModalOpen={setModalOpen}
                    /> 
                      <div className="containerImg"  >
                        <MDBCardImage
                          src={data?.profilePicture}
                          className="rounded-circle"
                          fluid
                          style={{ width: "200px", height: "200px" }}
                        />
                        <div class="overlay">
                          <div  class="icon"  >
                            <AddAPhoto sx={{width:"40px",height:"40px",fontSize:"48px",cursor:"pointer"}} onClick={handleInputClick}  /> 
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          ref={inputRef}
                          onChange={handleImgChange}
                        />
                          </div>
                          
                        </div> 
                      </div>
                      </>
                      :
                      <div>
                        <MDBCardImage
                          src={prosanalid?.profilePicture}
                          className="rounded-circle"
                          fluid
                          style={{ width: "200px", height: "200px" }}
                        />
                        </div> }
                      <div style={{ fontSize: "x-large",marginTop:"10px" }}>
                        <MDBTypography style={{fontFamily: "Georgia,serif"}}>
                          {" "}
                          <MdPermIdentity/> <b>{prosanalid ===undefined ?data?.username?.toUpperCase(): prosanalid?.username?.toUpperCase()}</b>
                        </MDBTypography>
                        <MDBTypography
                          style={{ marginLeft: "10px", fontSize: "x-large" }}
                        >
                          {" "}
                          <b>{prosanalid ===undefined ?data?.email: prosanalid?.email}</b>
                        </MDBTypography>{" "}
                      </div>
                    </MDBCardBody>
                    <div style={{ margin: "5px" }}>
                      <LabTabs pronalid={prosanalid?._id} />
                    </div>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
