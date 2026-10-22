import {useState} from "react";
import "./style.css";
import PostList from "./components/PostList";
import BoardFooter from "./components/BoardFooter";
import BoardHeader from "./components/BoardHeader";
import PostForm from "./components/PostForm";

export default function App() {
const boardName="Green 게시판";
const [posts, setPosts] = useState([
  {id:1, title:"게시글임시1", authorNickname:"학생", createdDatetime:"2026-10-21", content:"내용입니다"},
  {id:2, title:"게시글임시2", authorNickname:"학생", createdDatetime:"2026-10-21", content:"내용입니다"},
  {id:3, title:"게시글임시3", authorNickname:"학생", createdDatetime:"2026-10-21", content:"내용입니다"},
  {id:4, title:"게시글임시4", authorNickname:"학생", createdDatetime:"2026-10-21", content:"내용입니다"}
]);

const [page, setPage] = useState("list");


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

  setPage("list");
}



return(
  <>
    <BoardHeader onWrite={()=>setPage("write")} boardName={boardName}/>


    {page==="list" && <main>
      <h1>게시판</h1>
      <p id="list-message" role="status">게시글 목록</p>
      <button id="retry-list" type="button">목록 다시 시도</button>
      <PostList posts={posts} onSelect={(post)=>window.alert(post.title)}/>
      <button type="button" onClick={addPracticePost}>게시글 추가 버튼</button>
      <div className="pagination" aria-label="페이지 이동">
        <button id="previous-page" type="button" disabled>이전</button>
        <span id="page-number">1페이지</span>
        <button id="next-page" type="button" disabled>다음</button>
      </div>
    </main>}


    {page ==="write"&&
    
    <main>
      <h1>글쓰기</h1>
      <PostForm onSave={savePost} onCancel={()=>setPage("list")}/>
      
      </main>}

    <BoardFooter boardName={boardName}/>
  </>
)

}
