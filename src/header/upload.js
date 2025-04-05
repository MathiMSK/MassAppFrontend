import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./UploadVideo.css";
import Header from "./index.js";
import {
  MDBCard,
  MDBCardBody,
  // MDBCardText,
  // MDBCardTitle,
  MDBCol,
  // MDBFile,
  // MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
// import FileUpload from "react-material-file-upload";
import { DropzoneArea } from "material-ui-dropzone";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const nav = useNavigate();
  const [video, setVideo] = useState([]);
  // const [upvideo, setUpvideo] = useState(null);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  let getToken = localStorage.getItem("token"),
    token;
  if (getToken) {
    token = JSON.parse(getToken);
  }
  console.log(token);

  const uploadVideo = () => {
    // console.log(video[0]);
    // video?.map((i) => {
    //   return setUpvideo(i);
    // });
    if (!title) {
      return toast.error("Video title requried !!!", {
        position: "top-right",
        autoClose: 2500,
      });
    } else if (!description) {
      return toast.error("Video title description!!!", {
        position: "top-right",
        autoClose: 2500,
      });
    } else if (!category) {
      return toast.error("Video title category!!!", {
        position: "top-right",
        autoClose: 2500,
      });
    } else if (!video) {
      return toast.error("Upload a video !!!", {
        position: "top-right",
        autoClose: 2500,
      });
    } else if (!video || !title) {
      return toast.error("All field are requried !!!", {
        position: "top-right",
        autoClose: 2500,
      });
    }
    setLoading(true);
    const data = new FormData();
    data.append("file", video[0]);
    data.append("upload_preset", "MassApp");
    data.append("cloud_name", "demxjipir");
    fetch("https://api.cloudinary.com/v1_1/demxjipir/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        console.log(data);
        setLoading(false);
        try {
          if (data.url) {
            await axios({
              method: "post",
              url: "https://chatappranjith-1.onrender.com/api/video/create",
              data: {
                title,
                description,
                category,
                videoUrl: data.url,
                public_id: data.public_id,
              },
              headers: {
                accept: "application/json",
                token: token,
              },
            });
            toast.success("Upload video successfully !!!", {
              position: "top-right",
              autoClose: 2500,
            });
          }
          setTitle("");
          setVideo("");
          nav("/video");
        } catch (error) {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 2500,
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };
console.log(video[0])
  const useStyles = makeStyles((theme) =>
    createStyles({
      previewChip: {
        minWidth: 160,
        maxWidth: 210,
      },
    })
  );
  const classes = useStyles();
  return (
    <>
      <Header />
      <div
        style={{
          marginTop: "22px",
          backgroundColor: "gray",
          height: "866px"
        }}
      >
        <MDBCard className="w-500" style={{ backgroundColor: "#595959",marginTop:"23px" }}>
          <center>
            <h1
              style={{ fontFamily: "serif", color: "white", marginTop: "10px" }}
            >
              Upload Video
            </h1>
          </center>
          <MDBCardBody>
            <MDBRow>
              <MDBCol size="md">
                {/* <TextField
                id="outlined-basic"
                label="Video Title"
                variant="outlined"
                style={{
                  width: "101%",
                  backgroundColor: "white",
                  marginBottom: "37px",
                  zIndex:0
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                /> */}
                <TextField
                  id="filled-textarea"
                  label="Video Title"
                  placeholder="Video Title"
                  multiline
                  variant="filled"
                  style={{
                    width: "101%",
                    backgroundColor: "white",
                    marginBottom: "37px",
                    zIndex:0
                  }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </MDBCol>
              <MDBCol size="md">
                <TextField
                   id="filled-textarea"
                   label="Video Description"
                   placeholder="Video Description"
                   multiline
                   variant="filled"
                  style={{
                    width: "101%",
                    backgroundColor: "white",
                    marginBottom: "37px",
                  }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </MDBCol>
              <MDBCol size="md">
                <TextField
                  id="filled-textarea"
                  label="Video Category"
                  placeholder="Video Category"
                  multiline
                  variant="filled"
                  style={{
                    width: "101%",
                    backgroundColor: "white",
                    marginBottom: "37px",
                  }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </MDBCol>
            </MDBRow>
            <DropzoneArea
              acceptedFiles={["video/*"]}
              maxFileSize={800000000}
              onChange={setVideo}
              showPreviews={true}
              showPreviewsInDropzone={false}
              useChipsForPreview
              previewGridProps={{ container: { spacing: 1, direction: "row" } }}
              previewChipProps={{ classes: { root: classes.previewChip } }}
              previewText="Selected files"
              getFileAddedMessage={() => "Your file is successfully added"}
              getFileRemovedMessage={() => "tour file is removed"}
            />
            <br />
            <br />
            <center>
              <Button
                variant="contained"
                onClick={uploadVideo}
                disabled={loading}
              >
                upload
              </Button>
            </center>
            {loading && (
              <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
            )}
            <br />
            <br />
          </MDBCardBody>
        </MDBCard>
        <ToastContainer />
      </div>
    </>
  );
};

export default UploadVideo;
