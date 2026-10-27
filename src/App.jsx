import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PostList from "./components/PostList";
import BoardFooter from "./components/BoardFooter";
import BoardHeader from "./components/BoardHeader";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";
import Login from "./components/Login";
import "./style.css";
import { useAuthContext } from "./useAuthContext";

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const {token} = useAuthContext();


function savePost(post){
  // setPosts((currentPosts)=>[
  //   {id:Date.now(), ...post, authorNickname:"학생", createdDatetime:"2026-10-22"}
  //   , ...currentPosts,
  // ]);

  // navigate("/posts");
}


return(
  <>
  <BoardHeader isLoggedIn={isLoggedIn} onLogout= {()=>setIsLoggedIn(false)}/>
  <Routes>
    <Route path="/" element={token? <PostList/> :<Login/>} />
    <Route path="/posts" element={token? <PostList/> :<Login/>} />
    <Route path="/posts/new" element={token? <PostForm/>:<Login/>} />
    <Route path="/posts/:postId" element={token? <PostDetail/> :<Login/>}/>
    <Route path="/login" element={<Login/>} />
  </Routes>
    <BoardFooter/>
  </>
)

}
