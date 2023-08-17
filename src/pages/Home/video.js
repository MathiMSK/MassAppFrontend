import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton1 from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReactPlayer from "react-player";
import { FcLike } from "react-icons/fc";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import Box from "@mui/joy/Box"; 
import "./style.scss";
import Header from "../../header/index.js";
import { useEffect } from "react";
import {Follow, likes, profile, unFollow, unlikes, videos } from "../../api service/api";
import { Fragment } from "react";
import ShowMoreText from "react-show-more-text";
import moment from "moment/moment"; 
import CommentModal from "../../components/model";
import Parsonal from "../../components/account";
import { Button } from "@mui/material";
// import { toast } from "react-toastify";


export default function RecipeReviewCard() { 
  const [comment, setComment] = useState(false);
  const [allvideo, setAllvideo] = useState([]);
  const [followingdata, setFollowingdata] = useState([]);
  const [id, setId] = useState("");
  const [refresh, setRefresh] = useState(false); 
  const [open, setOpen] = useState(false); 
  const [profiledata, setProfiledata] = useState("");
  const [zIndex, setZIndex] = useState(0);
  const [isHover,setHover]=useState(-1)

  const handleOver=(i)=>{
    setHover(i)
  }
  const handleOut=()=>{
    setHover(-1)
  }
  //console.log(isHover);

  const [show, setShow] = useState({ like: false, id: 0 }); 

  const showlike = async (i, index) => {
    console.log("hi");
    if (show.like === false && !i.likes.includes(id)) {
      console.log("uu");
      setShow({ like: true, id: i._id });
    }
    setTimeout(() => {
      setShow({ like: false, id: i._id });
    }, 1000);

    if (!i.likes.includes(id)) {
      let res = await likes(i._id);
      console.log(res);
      setRefresh(!refresh);
    }
    if (i.likes.includes(id)) {
      let response = await unlikes(i._id);
      console.log(response);
      setRefresh(!refresh);
    }
  };

  const viewcommentbox = (index) => {
    setZIndex(index);
    setComment(!comment);
  };

  const following =async(i) => {
   let res=await Follow(i?.postedBy?._id)
   setRefresh(!refresh);
  };
  const unfollow =async(i) => {
   let res=await unFollow(i?.postedBy?._id)
   setRefresh(!refresh)
  };



  const handle = async () => {
    try {
      let res = await videos();
      setAllvideo(res?.data?.videos)
      let response = await profile();
      console.log(response?.data?.data?._id);
      setFollowingdata(response?.data?.data?.following)
      console.log(followingdata);
      setId(response?.data?.data?._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handle();
  }, [id, refresh]);

  return (
    <div style={{ backgroundColor: "gray", minHeight: "1281px " }}>
      <Header />
       { open ? <Parsonal profiledata={profiledata} open={open} setOpen={setOpen}/>
       :
      <>
        {allvideo?.map((i, index) => {
          return (
            <Fragment key={index}>
          {console.log(i)}
              {comment && index === zIndex ? <CommentModal comment={comment} setComment={setComment} i={i} userId={id}  index={index}  zIndex={zIndex} setZIndex={setZIndex} setRefresh={setRefresh}  refresh={refresh} 
              /> :null}
              <center>
                <Card
                  sx={{
                    maxWidth: 845,
                    backgroundColor: "#2d3f4f",
                    marginTop: "20px",
                  }}
                >
                  <CardHeader
                    avatar={
                      <>
                        <Box
                          style={{
                            backgroundColor: "white",
                            width: "85px",
                            height: "83px",
                            borderRadius: "55px",
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: red[500],
                              width: "65px",
                              height: "65px",
                              marginTop: "9px",
                              cursor:"pointer"
                            }}
                            aria-label="recipe"
                            src={
                              i
                                ? i?.postedBy.profilePicture
                                : "https://alldesignkp.weebly.com/uploads/1/1/0/7/110716317/avatar-example.jpg"
                            }
                            onClick={()=>{
                              setOpen(!open) 
                              setProfiledata(i)}
                            }
                          />
                        </Box>
                        <Box style={{ maxWidth: "10px" }}>
                          <Typography
                            sx={{
                              marginLeft: "10px",
                              marginTop: " 10px",
                              fontSize: "x-large",
                              fontFamily: "serif",
                            }}
                          >
                            {i?.postedBy?.username} 
                          </Typography>
                           <>  
                          {followingdata?.length === 0 && id!==i.postedBy._id ?
                          <Button variant="outlined" style={{fontSize:"8px",marginLeft:"10px",color:"white"}} onClick={()=>following(i)}>follow</Button>:null}
                         
                          {i?.postedBy?._id !== id && followingdata?.length !== 0 ? followingdata?.includes(i?.postedBy?._id ) ? 
                            <Button key={index} variant="outlined" style={{fontSize:"8px",marginLeft:"10px",color:"white"}} onClick={()=>unfollow(i)}>unfollow</Button>:
                            <Button key={index} variant="outlined" style={{fontSize:"8px",marginLeft:"10px",color:"white"}} onClick={()=>following(i)}>follow</Button> :null}
                          </>
                        </Box>
                      </> 
                    }
                    action={
                      <>
                        <IconButton1 aria-label="settings">
                          <MoreVertIcon />
                        </IconButton1>
                      </>
                    }
                    style={{ color: "white", fontFamily: "serif" }}
                  />
                  <CardMedia  style={{ backgroundColor: "black" }}>
                    <div
                    onMouseOver={()=>handleOver(i._id)}
                    onMouseOut={handleOut}
                      style={{
                        alignItems: "center",
                        height: "400px",
                        position: "relative",
                        display: "flex",
                        alignItem: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "serif",
                          color: "red",
                          fontSize: "70px",
                          position: "absolute",
                          zIndex: 2,
                          top: "163px",
                        }}
                      >
                        {show.like === true &&
                        i.likes[index] !== id &&
                        show.id === i._id ? (
                          <FcLike
                            style={{
                              display: "flex",
                              alignSelf: "center",
                              justifyContent: "center",
                            }}
                          />
                        ) : null}
                      </div>
                      <ReactPlayer
                        url={i.videoUrl}
                        loop={isHover===i._id ?true:false}
                        playing={isHover===i._id ?true:false}
                        muted={isHover===i._id ?true:false}
                        style={{ width: "90%", height: "350px" }}
                        controls={true}
                      />
                    </div>
                  </CardMedia>
                  <Typography
                    style={{
                      fontFamily: "serif",
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      fontSize: "x-large",
                      margin: "6px",
                      marginLeft: "70px",
                    }}
                  >
                    Title:{i.title}
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "serif",
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      fontSize: "large",
                      margin: "6px",
                      marginLeft: "70px",
                    }}
                  >
                    {moment(i.createdAt).format("MMMM Do YYYY")}
                  </Typography>
                  <CardContent>
                    <Box
                      style={{
                        backgroundColor: "rgb(5 30 53)",
                        color: "white",
                        borderRadius: "10px",
                        maxWidth: "700px",
                        padding: "10px",
                      }}
                    >
                      <h1
                        style={{
                          fontFamily: "serif",
                          fontSize: "25px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          paddingLeft: "30px",
                          display: "flex",
                        }}
                      >
                        Description :
                      </h1>
                      <ShowMoreText
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                        lines={1}
                        more="Show More"
                        less="Show Less"
                        className="content-css"
                        anchorClass="show-more-less-clickable"
                        expanded={false}
                        width={259}
                        truncatedEndingComponent={"... "}
                      >
                        <Typography>{i.description}</Typography>
                      </ShowMoreText>
                    </Box>
                    <br />
                    {/* {i?.comments.length <= 0 ? null : (
                      <Box
                        style={{
                          backgroundColor: "rgb(5 30 53)",
                          color: "white",
                          borderRadius: "14px",
                          maxWidth: "700px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          paddingLeft: "30px",
                        }}
                      >
                        <Typography>COMMENTS :</Typography>
                        <ShowMoreText
                          style={{ display: "flex", flexDirection: "column" }}
                          lines={1}
                          more="Show More"
                          less="Show Less"
                          className="content-css"
                          anchorClass="show-more-less-clickable"
                          expanded={false}
                          width={259}
                          truncatedEndingComponent={"... "}
                        >
                          {i.comments.map((j) => (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                minWidth: 300,
                                fontWeight,
                                fontStyle: italic ? "italic" : "initial",
                                color: "white",
                              }}
                            >
                              <b> ( {j?.postedBy?.username}): * </b>
                              {j?.text}{" "}
                              <span style={{ color: "#5f6f7d" }}>
                                ({moment(j.createdAt).format("MMM Do YY")})
                              </span>
                            </Typography>
                          ))}
                        </ShowMoreText>
                      </Box>
                    )}
                    {comment && index === zIndex ? (
                      <>
                        <FormControl>
                          <FormLabel sx={{ color: "white" }}>
                            Your comment
                          </FormLabel>
                          <Textarea
                            placeholder="Type something here…"
                            minRows={3}
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            startDecorator={
                              <div className="App">
                                <div>
                                  <Typography>Emoji:</Typography>
                                  <SentimentSatisfiedAltIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setEmoji(!emoji)}
                                  />
                                </div>
                                {emoji ? (
                                  <EmojiPicker
                                    onEmojiClick={onEmojiClick}
                                    autoFocusSearch={false}
                                    emojiStyle={EmojiStyle.NATIVE}
                                  />
                                ) : null}
                              </div>
                            }
                            endDecorator={
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: "var(--Textarea-paddingBlock)",
                                  pt: "var(--Textarea-paddingBlock)",
                                  borderTop: "1px solid",
                                  borderColor: "divider",
                                  flex: "auto",
                                }}
                              >
                                {["200", "normal", "bold"].map((weight) => (
                                  <IconButton
                                    onClick={() => {
                                      setFontWeight(weight);
                                    }}
                                  >
                                    <ListItemDecorator>
                                      {weight}
                                    </ListItemDecorator>
                                  </IconButton>
                                ))}
                                <IconButton
                                  variant={italic ? "soft" : "plain"}
                                  color={italic ? "primary" : "neutral"}
                                  aria-pressed={italic}
                                  onClick={() => setItalic((bool) => !bool)}
                                >
                                  <FormatItalic />
                                </IconButton>
                                <Button
                                  sx={{ ml: "auto" }}
                                  onClick={() => viewcommet(i)}
                                >
                                  Send
                                </Button>
                              </Box>
                            }
                            sx={{
                              minWidth: 300,
                              fontWeight,
                              fontStyle: italic ? "italic" : "initial",
                            }}
                          />
                        </FormControl>
                      </>
                    ) : null} */}
                  </CardContent>
                  <Typography
                    sx={{ ml: 2, backgroundColor: "black", height: "4px" }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                  ></Typography>
                  <CardActions disableSpacing>
                    <div
                      className="button-container-1"
                      style={{ marginTop: "10px", marginLeft: "11px" }}
                    >
                      <>
                        {i.likes.map((item,index) => {
                          if (item === id) {
                            return (
                              <span
                              key={index} 
                                className="mas"
                                style={{ marginTop: "10px" }}
                              >
                                <FavoriteIcon 
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginTop: "-5px",
                                    color: "red",
                                  }}
                                />
                              </span>
                            );
                          } else {
                            return (
                              <span
                                key={index} 
                                className="mas"
                                style={{ marginTop: "10px" }}
                              >
                                <FavoriteIcon
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginTop: "-5px",
                                    color: "white",
                                  }}
                                />
                              </span>
                            );
                          }
                        })}
                        <span className="mas" style={{ marginTop: "10px" }}>
                          {i.likes?.includes(id) ? (
                            <FavoriteIcon
                              style={{
                                width: "40px",
                                height: "40px",
                                marginTop: "-5px",
                                color: "red",
                              }}
                            />
                          ) : (
                            <FavoriteIcon
                              style={{
                                width: "40px",
                                height: "40px",
                                marginTop: "-5px",
                              }}
                            />
                          )}
                        </span>
                        <button
                          id="work"
                          type="button"
                          name="Hover"
                          onClick={() => showlike(i, index)}
                        >
                          {/* {i.likes.map((item)=>{ 
                                console.log(i.likes?.includes(id));  
                                if(item === id){  
                                    return ( 
                                        <FavoriteIcon
                                            style={{
                                            width: "40px",
                                            height: "40px",
                                            marginTop: "-5px",
                                            color: "red",
                                            }}
                                        /> 
                                    )
                                }
                            })} */}
                          {i.likes?.includes(id) ? (
                            <FavoriteIcon
                              style={{
                                width: "40px",
                                height: "40px",
                                marginTop: "-5px",
                                color: "red",
                              }}
                            />
                          ) : (
                            <FavoriteIcon
                              style={{
                                width: "40px",
                                height: "40px",
                                marginTop: "-5px",
                              }}
                            />
                          )}
                        </button>
                      </>
                    </div>
                    <div
                      className="button-container-2"
                      style={{ marginTop: "10px" }}
                    >
                      <span className="mas">COMMENT</span>
                      <button
                        type="button"
                        name="Hover"
                        onClick={() => viewcommentbox(index)}
                      >
                        <CommentBankIcon />
                      </button>
                    </div>
                  </CardActions>
                </Card>
              </center>
              <br />
              <br />
            </Fragment>
          );
        })}
      </>}
    </div>
  );
}
