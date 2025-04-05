let baseUrl = "https://chatappranjith-1.onrender.com/api/";
// let baseUrl = "http://localhost:7373/api/";
/***************************************************************************************USER API ********************************************************/
export const userLogin = async (body) => {
  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}user/login`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const userReg = async (body) => {
  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}user/reg`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const profile = async() => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
       token:gettoken
    },
 
  };
  const response = await fetch(`${baseUrl}user/profile`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const Editprofile = async(body) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
    body: JSON.stringify(body)
  };
  
  const response = await fetch(`${baseUrl}user/updateprofile`,requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const allUser = async() => {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${baseUrl}user/alluser`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};
/***************************************************************************************VIDEO API ********************************************************/

export const videos = async() => {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
 
  };
  const response = await fetch(`${baseUrl}video/all`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const UserVideos = async() => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
  };
  const response = await fetch(`${baseUrl}video/getvideo/user`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const UserByIdVideos = async(id) => {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${baseUrl}video/user/byid/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};
export const DeleteVideo = async(id) => {
  const requestOptions = {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${baseUrl}video/delete/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};
/***************************************************************************************LIKE && FOLLOW API ********************************************************/

export const likes = async(id) => {
  console.log(id)
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
 
  };
  const response = await fetch(`${baseUrl}video/like/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
}
export const unlikes = async(id) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
 
  };
  const response = await fetch(`${baseUrl}video/unlike/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
}

export const Comment = async(id,body) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}video/comment/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
}

export const deleteComment = async(id,body) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}video/deletecomment/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
}
export const editComment = async(id,commentId,body) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}video//updatecomment/${id}/${commentId}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
}

export const Follow = async (id) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
  };
  const response = await fetch(`${baseUrl}user/follow/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};
export const unFollow = async (id) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
  };
  const response = await fetch(`${baseUrl}user/unfollow/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const getFollow = async (id) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
  };
  const response = await fetch(`${baseUrl}user/following/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
}

/***************************************************************************************CHAT API ********************************************************/

export const UserChat = async (body) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}chat/createsinglechat`,requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const getchat = async (id) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
  };
  const response = await fetch(`${baseUrl}chat/getchatbyid/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const userGetChat = async () => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
  };
  const response = await fetch(`${baseUrl}chat/getchatbyuser`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};
/*************************************************************************************** write  CHAT API ********************************************************/
export const WriteChat = async (id,body) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions ={
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}message/createmessage/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const getByIdChat = async (id ) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions ={
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    }, 
  };
  const response = await fetch(`${baseUrl}chat/getchat/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const getchatId = async (id ) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions ={
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    }, 
  };
  const response = await fetch(`${baseUrl}chat/getchatbyid/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};
export const deleteMessage = async (id,messageId) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions ={
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    }, 
  };
  const response = await fetch(`${baseUrl}message/deletemessage/${id}?messageId=${messageId}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};
/*************************************************************************************** Group  CHAT API ********************************************************/

export const groupchatCreate = async (body) => {
  let token = localStorage.getItem("token")
  let gettoken=JSON.parse(token)
  const requestOptions ={
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    }, 
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}chat/creategroupchat`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const getgroupchatId = async (id) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions ={
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    }, 
  };
  const response = await fetch(`${baseUrl}chat/getgroupchatbyid/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
};

export const removeGroupUser = async (id,body) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions ={
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    }, 
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}chat/removeuser/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
}

export const addGroupUser = async (id,body) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions ={
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    }, 
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}chat/adduser/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
}
export const Addadmin = async (id,body) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions ={
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    }, 
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}chat/addadmin/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
}

export const Removeadmin = async (id,body) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions ={
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    }, 
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}chat/removeadmin/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
}
export const readby = async (id) => {
  let token = localStorage.getItem("token");
  let gettoken=JSON.parse(token)
  const requestOptions ={
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      token:gettoken
    }, 
  };
  const response = await fetch(`${baseUrl}message/readby/${id}`, requestOptions);
  if (!response.ok) {
    let data = await response.json();
    return { data: data, ok: false };
  }
  let data = await response?.json();
  return { data: data, ok: true };
}