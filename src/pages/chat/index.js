/* eslint-disable array-callback-return */
import * as React from "react";

import { RiSendPlaneFill } from "react-icons/ri";
import { BiMessageAdd } from "react-icons/bi";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import Header from "../../header";
// import { toast } from "react-toastify";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./chat.css";
import {
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { io } from "socket.io-client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { EmojiStyle } from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { useEffect } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import {
  UserChat,
  WriteChat,
  allUser,
  deleteMessage,
  getByIdChat,
  getchatId,
  profile,
  readby,
  userGetChat,
} from "../../api service/api";
import Select from "react-select";
import { Box, Typography } from "@mui/material";
import ScrollableFeed from "react-scrollable-feed";
import _ from "lodash";
import GroupChat from "./chat";
import IconButton1 from "@mui/material/IconButton";
import moment from "moment/moment";
import jwt_decode from "jwt-decode";
import Fab from "@mui/material/Fab";
import { useContext } from "react";
import Store from "../../context/context";
import ShowMoreText from "react-show-more-text";

let token = localStorage.getItem("token");
let decoded;
if (token) {
  decoded = jwt_decode(token);
}

// const ENDPOINT = "ws://localhost:7373/";
// let socket;

const Chat = (userDetails) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data1, setData1] = useState([]);
  const [allData, setAllData] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [removeuser, setRemoveuser] = useState();
  const [action, setAction] = useState("");
  const [id, setID] = useState("");
  const [chatData, setChatData] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [chatId, setchatId] = useState("");
  const [chatObj, setChatObj] = useState( );
  const [chatpic, setChatpic] = useState("");
  const [send, setSend] = useState([]);
  const [demo, setDemo] = useState([]);
  const [searchinput, setSearchinput] = useState();
  const [deleteId, setDeleteId] = useState("");
  const [reload, setReload] = useState(false);
  const [group, setGroup] = useState(false);
  const [groupCreator, setGroupCreator] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [chatlist, setChatlist] = useState(false);
  const [groupAdmin, setGroupAdmin] = useState([]);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [userList, setUserList] = useState("");
  const [messageForSocket, setMessageForSocket] = useState();
  let found =false
  const context=useContext(Store) 
  const open1 = Boolean(anchorEl1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
// console.log(windowWidth >= 500);
// console.log(windowWidth );
  useEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  });
  
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const user = async () => {
    let count = 0;
    let data = [];
    let res = await allUser();
    setAllData(res?.data?.users);
    let pro = await profile();
    let reschat = await userGetChat();
    reschat?.data?.map((item) => {
      item?.messages?.map((k) => {
        if (k.sendby._id !== pro?.data?.data?._id) {
          if (k?.readBy?.includes(pro?.data?.data?._id)) {
            return;
          }
          count++;
        }
      });
      item.count = count;
      count = 0;
    });
    let sort = _.sortBy(reschat.data, (i) => {
      return new Date(i?.updatedAt);
    }).reverse();
    // console.log(sort);
    setDemo(sort);
    res?.data?.users?.map((i) => {
      if (i?._id !== pro?.data?.data._id) {
        return data.push({
          value: i?.username,
          label: (
            <div>
              <img
                alt="profileImage"
                src={i.profilePicture}
                style={{ borderRadius: "50%", marginRight: "10px" }}
                height="30px"
                width="30px"
              />
              {i?.username}
            </div>
          ),
          id: i._id,
        });
      }
    });
    setData1(data);
    setID(pro?.data?.data?._id);
  };

  useEffect(() => {
    user();
  }, [reload]);

  const handle = async (i, j) => {
    try {
      let { data } = await readby(i._id);
      // console.log(data.data);
    } catch (error) {
      return console.log(error);
    }
    setUserList(j?._id)
    setChatData(j?.username);
    setChatpic(j?.profilePicture);
    setSend(i?.messages);
    setchatId(i?._id);
    setChatlist(true);
    setReload(!reload);
  };
  const grouphandle = async (i) => {
    // console.log(i);
    try {
       await readby(i._id);
      // console.log(data.data);
    } catch (error) {
      return console.log(error);
    }
    setGroupAdmin(i?.groupAdmin);
    setGroupCreator(i?.groupCreator);
    setChatData(i?.groupName);
    setChatpic(i?.groupDp);
    setSend(i?.messages);
    setchatId(i?._id);
    setReload(!reload);
    setChatlist(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  // //   socket = io(ENDPOINT);
  //   // context.socket.emit("setup", decoded)
  // //   context.socket.on("connected", () => setSocketConnected(true));
  //   // context.socket.emit("addUser",decoded?.id);
  //      context?.socket?.on("getUser", (user) => {
  //     console.log(user)
  //   });
  // },[]);

  const chatCreate = async (e) => {
    setSearchinput(e.value);
    let found = false;
    let cid = "";
    demo.map((item) => {
      item?.users?.find(async (i) => {
        if (i?._id === e.id) {
          cid = item?._id;
          return (found = true);
        }
      });
    });
    if (found === false) {
      let res = await UserChat({ newUsers: e.id });
      let response = await getchatId(res?.data?.data?._id);
      setchatId(res?.data?.data?._id);
      setChatObj(res.data)
      response?.data?.map((i) => {
        i.users.map((j) => {
          console.log(j, "vfgdskjgf");
          setChatData(j?.username);
          setChatpic(j?.profilePicture);
          setSend(i?.messages);
        });
      });
    }
    if (found === true) {
      let response = await getchatId(cid);
      setchatId(cid);
      setChatObj(response.data)
      response?.data?.map((i) => {
        i.users.map((j) => {
          // console.log(j);
          setChatData(j?.username);
          setChatpic(j?.profilePicture);
          setSend(i?.messages);
        });
      });
    }
    setReload(!reload);
  };

  const onEmojiClick = (e) => {
    const sym = e.unified.split("_");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    if (sendMessage) {
      setSendMessage(sendMessage + emoji);
    } else {
      setSendMessage(emoji);
    }
  };

  const messagehandel = async () => {
    if (sendMessage !== "") {
      await WriteChat(chatId, { message: sendMessage });
      const data = await getByIdChat(chatId);
      // console.log("hi", data);
      context.socket.emit("new message", data);
      setSendMessage("");
      setReload(!reload);
    }
  };

  const open = Boolean(anchorEl);
  const handleClick = (event, item) => {
    setDeleteId(item);
    setAnchorEl(event.currentTarget);
  };

  const deletemessage = async () => {
    await deleteMessage(chatId, deleteId._id);
    setAnchorEl(null);
    setReload(!reload);
  };

  useEffect(() => {
    let fetch = async () => {
      let res = await getByIdChat(chatId);
      setChatObj(res.data)
      context.socket.emit("join chat", chatId);
      setSend(res?.data?.messages);
      setGroup(res?.data?.isGroup);
    };
    if (chatId) fetch();
  }, [chatId, reload]);

  useEffect(() => {
    let fetch = async () => {
      context?.socket?.on("message recieved", (newMessageRecieved) => {
        // console.log("message received");
        setMessageForSocket(newMessageRecieved);
      });
    };
    fetch();
  });

  useEffect(() => {
    let fetch = async () => {
      if (
        chatId !== undefined &&
        id !== messageForSocket?.lastMessage?.sendby?._id &&
        chatId === messageForSocket?._id
      ) {
        // console.log("message add to list");
        let { data } = await readby(messageForSocket._id);
        console.log(data);
        setSend([...send, messageForSocket?.lastMessage]);
        setReload(!reload);
      } else if (chatId == undefined || messageForSocket?._id !== undefined) {
        let count = 0;
        if (count === 0) {
          // console.log("add new notification");
          count++;
          setMessageForSocket(null);
          setReload(!reload);
        }
      }
    };
    fetch();
  }, [messageForSocket]);

  return (
    <>
      <Header />
      <div style={{ marginTop: "30px" }}>
        <MDBRow style={{ width: "100%" }}>
          {/* {chatlist === false && ( */}
          <MDBCol
            md="3"
            style={windowWidth <= 500 ? chatId == "" ?   {marginLeft:"10px"} : { display: "none" } : {marginLeft:"10px"}}
          >
            <MDBCard style={{ height: "835px" }}>
              <MDBCardHeader style={{ display: "flex", alignItems: "center" }}>
                <SearchIcon />
                <div style={{ width: "100%" }}>
                  <Select
                    value={searchinput}
                    options={data1}
                    onChange={chatCreate}
                  />
                </div>
                <BiMessageAdd
                  style={{ fontSize: "xx-large", cursor: "pointer" }}
                  onClick={() => {
                    setBasicModal(!basicModal);
                    setAction("new");
                  }}
                />
              </MDBCardHeader>
              <MDBCardBody>
                <List
                  style={{
                    width: "100%",
                    maxWidth: 570,
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 740,
                    "& ul": { padding: 0 },
                  }}
                >
                  {demo?.map((i, index) =>
                    !i.isGroup ? (
                      i?.users?.map((j, index) => {
                        if (j._id !== id) {
                          return (
                            <ul key={index}>
                              <ListItem
                                style={{ cursor: "pointer" }}
                                onClick={() => handle(i, j)}
                              >
                                <ListItemAvatar>
                                  <Avatar src={j?.profilePicture} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={<b>{j?.username}</b>}
                                  secondary={ <ShowMoreText
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
                                    <Typography>{i?.lastMessage?.message}</Typography>
                                  </ShowMoreText>}
                                />
                                {i.count !== 0 && (
                                  <Fab
                                    color="secondary"
                                    sx={{
                                      position: "absolute",
                                      width: "35px",
                                      height: "35px",
                                      top: "10px",
                                      bottom: (theme) => theme.spacing(1),
                                      right: (theme) => theme.spacing(1),
                                    }}
                                  >
                                    {i.count}
                                  </Fab>
                                )}
                              </ListItem>
                              <hr
                                style={{
                                  margin: 0,
                                  backgroundColor: "white",
                                }}
                              />
                            </ul>
                          );
                        }
                      })
                    ) : (
                      <>
                        <ListItem
                          key={index}
                          style={{ cursor: "pointer" }}
                          onClick={() => grouphandle(i)}
                        >
                          <ListItemAvatar>
                            <Avatar src={i?.groupDp} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={<b>{i?.groupName}</b>}
                            secondary={ <ShowMoreText
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
                              truncatedEndingComponent={"..."}
                            >
                              <Typography>{i?.lastMessage?.message}</Typography>
                            </ShowMoreText>}
                          />
                          {i.count !== 0 && (
                            <Fab
                              color="secondary"
                              sx={{
                                position: "absolute",
                                width: "35px",
                                height: "35px",
                                top: "10px",
                                zIndex: "auto",
                                bottom: (theme) => theme.spacing(1),
                                right: (theme) => theme.spacing(1),
                              }}
                            >
                              {i.count}
                            </Fab>
                          )}
                        </ListItem>
                        <hr style={{ margin: 0, backgroundColor: "white" }} />
                      </>
                    )
                  )}
                </List>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          {/* )} */}
          {chatData && chatpic !== "" ? (
            <MDBCol> 
              <MDBCard style={{ height: "840px" }}>
                
                <MDBCardHeader>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{ fontFamily: "serif", fontSize: "larger" }}
                    >
                      <IoArrowBackCircleSharp
                        style={{ fontSize: "xx-large", cursor: "pointer" }}
                        onClick={() => {
                          setChatData("");
                          setChatpic("");
                          setChatlist(false);
                          setchatId("");
                        }}
                      />
                      {chatData.toUpperCase()}
                      
                      {
                      context.usersArr.map((i)=>{
                          if(i.userId===userList) {
                            found=true
                            return <div style={{color:"green"}}>online</div>
                          }
                         
                     })  
                    }
                    { found===false &&  <div>offline</div>}
                    </div>{" "}
                    <Avatar
                      src={chatpic}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (group === true) {
                          if (groupCreator === id) {
                            setAction("view");
                            setBasicModal(!basicModal);
                          } else {
                            groupAdmin?.map((i) => {
                              if (i?._id === id) {
                                setAction("view");
                                setBasicModal(!basicModal);
                              }
                            });
                          }
                        }
                      }}
                    />{" "}
                  </div>
                </MDBCardHeader>
                <MDBCardBody
                  style={{
                    background:
                      'url("https://i.ytimg.com/vi/QNAYhssraok/maxresdefault.jpg") no-repeat',
                    backgroundSize: "cover",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ScrollableFeed>
                    {send?.map((i, index) => (
                      <div key={index}>
                        {i?.sendby?._id !== id ? (
                          <div key={index}>
                            {" "}
                          
                            <Box>
                              <div
                                style={{
                                  maxWidth: "75%",
                                  width: "fit-content",
                                  minWidth: "fit-content",
                                  background: "#13b1d799",
                                  padding: "10px",
                                  wordBreak: "break-word",
                                  marginBottom: "10px",
                                  borderRadius: "5px",
                                }}
                              >
                                <Typography
                                  style={{
                                    fontFamily: "serif",
                                    justifyContent: "center",
                                    display: "flex",
                                    color: "#e36c6c",
                                  }}
                                >
                                  ~{i?.sendby?.username}
                                </Typography>
                                <hr
                                  style={{
                                    margin: 0,
                                    backgroundColor: "white",
                                  }}
                                />
                                <Typography
                                  style={{
                                    fontFamily: "serif",
                                    justifyContent: "center",
                                    display: "flex",
                                    color: "white",
                                  }}
                                >
                                  {i?.message}
                                </Typography>
                                <div
                                  style={{
                                    fontSize: "11px",
                                    color: "#c9c0c0",
                                    display: "flex",
                                    justifyContent: "end",
                                  }}
                                >
                                  {moment(i.createdAt).format("LT")}
                                </div>
                              </div>
                            </Box>{" "}
                          </div>
                        ) : (
                          <Box
                          style={{ display: "flex", justifyContent: "end" }}
                          key={index}
                          >
                           
                            <div
                              style={{
                                maxWidth: "75%",
                                minWidth: "fit-content",
                                background: "#4f3f3f",
                                padding: "10px",
                                wordBreak: "break-word",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                marginRight: "10px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  style={{
                                    fontFamily: "serif",
                                    display: "flex",
                                    justifyContent: "end",
                                    color: "white",
                                  }}
                                >
                                  {i?.message}
                                </Typography>
                                <IconButton1
                                  style={{
                                    width: "8px",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    top: "-14px",
                                  }}
                                  aria-label="settings"
                                  id="basic-button"
                                  aria-controls={
                                    open ? "basic-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open ? "true" : undefined}
                                  onClick={(e) => handleClick(e, i)}
                                >
                                  <MoreVertIcon style={{ color: "white" }} />
                                </IconButton1>
                                <Menu
                                  id="basic-menu"
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                  MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                  }}
                                >
                                  <MenuItem onClick={() => deletemessage()}>
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </div>
                              <div
                                style={{
                                  fontSize: "11px",
                                  color: "#c9c0c0",
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                {moment(i.createdAt).format("LT")}
                                <div>
                                  {i.readBy.length<=0 ?  <DoneAllIcon />: <DoneAllIcon style={{color:"#6dace3"}} />}
  
                                 </div>
                              </div>
                            </div>
                          </Box>
                        )}
                      </div>
                    ))}
                  </ScrollableFeed>
                </MDBCardBody>
                <MDBCardFooter
                  className="text-muted"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      messagehandel();
                    }}
                    style={{ width: "100%" }}
                  >
                    <TextField
                      style={{ width: "100%" }}
                      id="outlined-basic"
                      value={sendMessage}
                      onChange={(e) => setSendMessage(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <Tooltip title="Account settings">
                              <SentimentSatisfiedAltIcon
                                style={{ cursor: "pointer" }}
                                onClick={handleClick1}
                              />
                            </Tooltip>
                            <Menu
                              anchorEl={anchorEl1}
                              id="account-menu"
                              open={open1}
                              onClose={handleClose1}
                              style={{ top: "-100px", left: "50px" }}
                              transformOrigin={{
                                horizontal: "right",
                                vertical: "top",
                              }}
                              anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom",
                              }}
                            >
                              <EmojiPicker
                                height={350}
                                width={300}
                                onEmojiClick={onEmojiClick}
                                autoFocusSearch={false}
                                emojiStyle={EmojiStyle.NATIVE}
                              />
                            </Menu>
                          </InputAdornment>
                        ),
                      }}
                    />{" "}
                  </form>
                  <RiSendPlaneFill
                    style={{ width: "34px", height: "34px", cursor: "pointer" }}
                    onClick={messagehandel}
                  />
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          ) : (
            <h1
              style={{
                fontFamily: "serif",
                marginTop: "10px",
                alignItems: "center",
                display: "flex",
                marginLeft: "33%",
              }}
            >
              NoChat
            </h1>
          )}
        </MDBRow>
        {basicModal && (
          <GroupChat
            data={data1}
            allData={allData}
            setBasicModal={setBasicModal}
            basicModal={basicModal}
            setReload={setReload}
            reload={reload}
            setRemoveuser={setRemoveuser}
            removeuser={removeuser}
            action={action}
            setAction={setAction}
            id={id}
            chatId={chatId}
          />
        )}
      </div>
    </>
  );
};

export default Chat;
