/* eslint-disable array-callback-return */
import * as React from "react";

import { RiSendPlaneFill } from "react-icons/ri";
import { BiMessageAdd } from "react-icons/bi";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import Header from "../../header";
import { toast } from "react-toastify";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./chat.css";
import { Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import io from "socket.io-client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useEffect } from "react";
import {
  UserChat,
  WriteChat,
  allUser,
  deleteMessage,
  getByIdChat,
  getchatId,
  profile,
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

let token = localStorage.getItem("token");
let decoded;
if(token){
   decoded = jwt_decode(token);
}

const ENDPOINT = "http://localhost:7373/";
var socket, selectedChatCompare;

const Chat = () => {
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
  const [chatpic, setChatpic] = useState("");
  const [send, setSend] = useState([]);
  const [demo, setDemo] = useState([]);
  const [searchinput, setSearchinput] = useState();
  const [deleteId, setDeleteId] = useState("");
  const [reload, setReload] = useState(false);
  const [group, setGroup] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const user = async () => {
    let data = [];
    let res = await allUser();
    setAllData(res?.data?.users);
    let pro = await profile();
    let reschat = await userGetChat();
    let sort = _.sortBy(reschat.data, (i) => {
      return new Date(i?.updatedAt);
    }).reverse();
    setDemo(sort);
    res?.data?.users?.map((i) => {
      console.log(pro?.data);
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
    setID(pro?.data?.data._id);
  };
  const handle = async (i, j) => {
    setChatData(j?.username);
    setChatpic(j?.profilePicture);
    setSend(i?.messages);
    setchatId(i?._id);
  };
  const grouphandle = async (i) => {
    setChatData(i?.groupName);
    setChatpic(i?.groupDp);
    setSend(i?.messages);
    setchatId(i?._id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", decoded);
    socket.on("connected", () =>setSocketConnected(true));
  }, []);

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
      console.log(res);
      let response = await getchatId(res?.data?.data?._id);
      // console.log(res);
      setchatId(res?.data?.data?._id);
      response?.data?.map((i) => {
        i.users.map((j) => {
          setChatData(j?.username);
          setChatpic(j?.profilePicture);
          setSend(i?.messages);
        });
      });
    }
    if (found === true) {
      let response = await getchatId(cid);
      setchatId(cid);
      response?.data?.map((i) => {
        i.users.map((j) => {
          setChatData(j?.username);
          setChatpic(j?.profilePicture);
          setSend(i?.messages);
        });
      });
    }
    setReload(!reload);
  };

  const messagehandel = async () => {
    if(sendMessage!=="") {
      await WriteChat(chatId, { message: sendMessage });
      const data = await getByIdChat(chatId);
      socket.emit("new message",data);
      setSendMessage("");
      setReload(!reload);
    }
  };

  const open = Boolean(anchorEl);
  const handleClick = (event,item) => {
    setDeleteId(item)
    setAnchorEl(event.currentTarget);
  };

const deletemessage=async()=>{ 
    await deleteMessage(chatId,deleteId._id)
    setAnchorEl(null)
    setReload(!reload)
}

  useEffect(() => { 
    let fetch = async () => {
      try {
        let res = await getByIdChat(chatId);
          setSend(res?.data?.messages);
          setGroup(res?.data?.isGroup)
          socket.emit("join chat", chatId);
          
        } catch (error) {
          console.log(error);
        }
      }
      if (chatId) fetch();
      selectedChatCompare = chatId;
  }, [chatId,reload]);
  
  useEffect(() => {
    socket.on("new message", (newMessageRecievd) => {
      if(!selectedChatCompare || selectedChatCompare._id === newMessageRecievd.chat._id){
        toast.success("New Message Recieved");
      }
      else {
        setSend([...send, newMessageRecievd]);
      }
    });
  }, []);
  
  useEffect(() => {
    user();
  }, [reload]);


  return (
    <>
      <Header />
      <div style={{ marginTop: "30px" }}>
        <MDBRow style={{ width: "100%" }}>
          <MDBCol md="3" style={{ marginLeft: "10px" }}>
            <MDBCard style={{ height: "835px" }}>
              <MDBCardHeader style={{ display: "flex", alignItems: "center" }}>
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
                                  primary={<b>{j.username}</b>}
                                  secondary="Jan 9, 2014"
                                />
                              </ListItem>
                              <hr
                                style={{ margin: 0, backgroundColor: "white" }}
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
                            secondary="Jan 9, 2014"
                          />
                        </ListItem>
                        <hr style={{ margin: 0, backgroundColor: "white" }} />
                      </>
                    )
                  )}
                </List>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          {chatData && chatpic !== "" ? (
            <MDBCol md="8" mt="2">
              <MDBCard style={{ height: "840px" }}>
                <MDBCardHeader
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    style={{ fontFamily: "serif", fontSize: "larger" }}
                  >
                    {chatData.toUpperCase()} 
                  </Typography>{" "}
                  <Avatar
                    src={chatpic}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if(group===true){
                        setAction("view");
                        setBasicModal(!basicModal);
                      }
                    }}
                  />{" "}
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
                        {i?.sendby._id !== id ? (
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
                              </div>
                            </Box>{" "}
                          </div>
                        ) : (
                          <Box
                            style={{ display: "flex", justifyContent: "end" }}
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
                              <div style={{display:"flex",alignItems:"center"}}>

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
                                aria-label="settings"
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={(e)=>handleClick(e,i)}
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
                                <MenuItem onClick={()=>deletemessage()}>Delete</MenuItem>
                              </Menu>
                              </div>
                              <div style={{fontSize: "11px",color:"#c9c0c0"}}>
                                {moment(i.createdAt).format('LT')}
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
                    <MDBInput
                      id="formControlLg"
                      type="text"
                      size="lg"
                      style={{ width: "100%" }}
                      value={sendMessage}
                      onChange={(e) => setSendMessage(e.target.value)}
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
            <h1 style={{ fontFamily: "serif", marginTop: "10px" }}>NoChat</h1>
          )}
        </MDBRow>
      </div>
    </>
  );
};

export default Chat;
