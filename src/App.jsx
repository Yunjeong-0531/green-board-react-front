import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PostList from "./components/PostList";
import BoardFooter from "./components/BoardFooter";
import BoardHeader from "./components/BoardHeader";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";
import PostItem from "./components/PostItem";
import Login from "./components/Login";
import "./style.css";


export default function App() {
  const navigate = useNavigate();
const [posts, setPosts] = useState([
  {id:1, title:"게시글임시1", authorNickname:"학생", createdDatetime:"2026-10-21", content:"내용입니다"},
  {id:2, title:"게시글임시2", authorNickname:"학생", createdDatetime:"2026-10-21", content:"내용입니다"},
  {id:3, title:"게시글임시3", authorNickname:"학생", createdDatetime:"2026-10-21", content:"내용입니다"},
  {id:4, title:"게시글임시4", authorNickname:"학생", createdDatetime:"2026-10-21", content:"내용입니다"}
]);


function addPracticePost(){
  const id= Date.now();
  setPosts((currentPosts)=>[
    {id, title : `임시 게시글 ${currentPosts.length}`, authorNickname:"학생", createdDatetime:"2026-10-21"
  },
  ...currentPosts,
  ])
}

function savePost(post){
  setPosts((currentPosts)=>[
    {id:Date.now(), ...post, authorNickname:"학생", createdDatetime:"2026-10-22"}
    , ...currentPosts,
  ]);

  navigate("/posts");
}



return(
  <>
  <BoardHeader/>
  <Routes>
    <Route path="/" element={<PostList posts={posts} onAddPracticePost={addPracticePost}/>} />
    <Route path="/posts" element={<PostList posts={posts} onAddPracticePost={addPracticePost}/>} />
    <Route path="/posts/new" element={<PostForm onSave={savePost}/>} />
    <Route path="/posts/:postId" element={<PostDetail posts={posts}/>} />
    <Route path="/login" element={<Login/>} />
    
  </Routes>
    <BoardFooter/>
  </>
)

}
