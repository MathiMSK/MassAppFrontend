/* eslint-disable array-callback-return */
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { CiCircleRemove } from "react-icons/ci";
import { GrAddCircle } from "react-icons/gr";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import {
  Addadmin,
  Removeadmin,
  addGroupUser,
  getgroupchatId,
  groupchatCreate,
  removeGroupUser,
} from "../../api service/api";

import { toast } from "react-toastify";
import { Close, Verified } from "@mui/icons-material";

const animatedComponents = makeAnimated();
export default function GroupChat({
  data,
  allData,
  basicModal,
  setBasicModal,
  reload,
  setReload,
  action,
  chatId,
  id
}) {
  const [selectuser, setselectuser] = useState([]);
  const [add, setAdd] = useState([]);
  const [checkData, setCheckData] = useState([]);
  const [removeId, setRemoveId] = useState([]);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [editUsers, setEditUsers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const groupCreate = async () => {
    if (groupName === "") return toast.error("please enter GroupName");
    let res = await groupchatCreate({ groupName, users });
    if (res?.ok) {
      toast.success(res.data.message);
      setBasicModal(!basicModal);
      setReload(!reload);
    }
    if (!res?.ok) return toast.error(res.data.message);
  };

  const adduser = () => {
    let array = [];
    selectuser.map((i) => {
      array.push(i.id);
    });
    setUsers(array);
  };

  const getChat = async () => {
    let arr = [];
    let filterdata = [];
    let res = await getgroupchatId(chatId);
    res?.data?.map((i) => {
      setAdmin(i?.groupAdmin)
      i?.users?.map((j) => {
        if (j?._id !== id) return arr.push(j);
      });
    });
    console.log(admin);
    setEditUsers(arr);
    allData?.map((item) => {
      let found = arr.some((j) => item._id == j._id);
      if (!found && item._id !== id) {
        filterdata.push(item);
      }
    });
    setAdd(filterdata);
    setCheckData(arr);
    setRemoveId(filterdata);
    // setAdd(filterdata)
  };

  const remove = async () => {
  
    let userId = [];
    add.map((item) => {
      let found = removeId.some((j) => item._id == j._id);
      if (!found && item._id !== id) {
        userId.push(item._id);
      }
    });
    if (userId.length !== 0) {
      let res = await removeGroupUser(chatId, {
        userId: userId,
      });
      if (res?.ok) {
        toast.success(res.data.message);
      }
     
    }
  };

  const adduserdata = async () => {
    let userId = [];
    editUsers.map((item) => {
      let found = checkData.some((j) => item._id == j._id);
      if (!found && item._id !== id) {
        userId.push(item._id);
      }
    });

    if (userId.length !== 0) {
      let response = await addGroupUser(chatId, {
        userId: userId,
      });
      if (response.ok) {
        toast.success(response.data.message);
        // setReload(!reload)
        // setReloadData(!reloadData)
      }
      if (!response.ok) {
        toast.error(response.data.message);
        // setReload(!reload)
        // setReloadData(!reloadData)
      }
    }
  };

  const demohandel = (i, index) => {
    console.log(index);
    let a = [...editUsers, i];
    add.splice(index, 1);
    setEditUsers(a);
  };
  const removedemohandel = (i, index) => {
    let a = [...add, i];
    editUsers.splice(index, 1);
    setAdd(a);
  }; 
  useEffect(() => {
    getChat();
    adduser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectuser]);

  const removeAdmin=async(i)=>{ 
      let ad=admin.filter((item)=>item._id!=i._id)
      try {
        await Removeadmin(chatId,{userId:i._id})
      } catch (error) {
        console.log(error);
      }
      setAdmin(ad)  
  }

  const addAdmin=async(i)=>{
    let ad=[]
    admin.map((item)=>ad.push(item))
    ad.push(i)
    let res = await Addadmin(chatId,{userId:i._id}) 
    setAdmin(ad)
  }
  

  return (
    <div style={{ width: "100%" }}>
      <>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>GroupChat Create</MDBModalTitle>
              </MDBModalHeader>
              {action === "new" ? (
                <>
                  <MDBModalBody>
                    <div style={{ position: "inherit", zIndex: 50 }}>
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={data}
                        onChange={setselectuser}
                      />
                    </div>
                    <TextField
                      id="outlined-basic"
                      label="GroupName"
                      variant="outlined"
                      style={{ width: "100%", marginTop: "10px" }}
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <Button variant="contained" onClick={groupCreate}>
                      submit
                    </Button>
                  </MDBModalFooter>
                </>
              ) : (
                <>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}>
                    <MDBModalTitle>ADD User</MDBModalTitle>
                    <Button variant="contained" onClick={adduserdata}>
                      <GrAddCircle />
                    </Button>
                  </div>
                  <hr
                    style={{
                      margin: 0,
                      backgroundColor: "#1c1414",
                      width: "125px",
                      marginBottom: "10px",
                    }}
                  /> 
                  <div style={{display:"flex",flexWrap:"wrap"}} >
                    {editUsers?.map((i, index) => {
                      
                      return (
                      <Fragment key={index}>
                        <div  style={{width:"fit-content",margin:"0 10px"}}> 
                          <Box>
                            <div
                              style={{
                                maxWidth: "75%",
                                width: "fit-content",
                                minWidth: "fit-content",
                                background: "#13b1d799",
                                padding: "10px",
                                wordBreak: "break-word",
                                marginBottom: "1px",
                                borderRadius: "20px",
                                cursor: "pointer",
                              }}
                              
                            >
                         {/*{ admin.map((j)=>i._id===j._id ? (<center style={{color:"green"}}>admin</center>):null)} */}
                        
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Avatar src={i?.profilePicture} />
                                <Typography sx={{margin :"5px"}} >{i?.username}</Typography>
                                <div style={{display:"flex",flexDirection:"column",alignItems:"center",margin:"0 5px"}}>
                                  <p style={{margin:0,fontSize:"12px"}}>Admin</p>
                                  <div >
                                    {admin.some((j)=>j._id == i._id ) ?
                                      <Verified sx={{width:"20px",height:"20px",color:"green"}} onClick={()=>removeAdmin(i)} />:
                                      <Verified sx={{width:"20px",height:"20px",color:"white"}} onClick={()=>addAdmin(i)} /> 
                                    }
                                  </div>
                                </div>
                                <Close onClick={() => removedemohandel(i, index)} />
                              </div>
                            </div>
                          </Box>
                          <br />
                        </div>
                      </Fragment>
                    )})} 
                    </div>
                  <Card variant="outlined">
                    <Divider />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <MDBModalTitle>All User</MDBModalTitle>
                      <Button variant="contained" onClick={remove}>
                        <CiCircleRemove />
                      </Button>
                    </div>
                    <hr
                      style={{
                        margin: 0,
                        backgroundColor: "#1c1414",
                        width: "95px",
                        marginBottom: "10px",
                      }}
                    />
                    <div style={{display:"flex",flexWrap:"wrap"}}>
                      {add?.map((i, index) => (
                        <Fragment key={index}>
                          <div  style={{width:"fit-content",margin:"0 10px"}}>
                            <Box>
                              <div
                                style={{
                                  maxWidth: "75%",
                                  width: "fit-content",
                                  minWidth: "fit-content",
                                  background: "#13b1d799",
                                  padding: "10px",
                                  wordBreak: "break-word",
                                  marginBottom: "1px",
                                  borderRadius: "20px",
                                  cursor: "pointer",
                                }}
                                onClick={() => demohandel(i, index)}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Avatar src={i?.profilePicture} />
                                  <Typography sx={{margin :"5px"}}>{i?.username}</Typography>
                                  <GrAddCircle />
                                </div>
                              </div>
                            </Box>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                    <br />
                  </Card>
                </>
              )}
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
    </div>
  );
}
