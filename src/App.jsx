import "./style.css";
import PostList from "./components/PostList";
import BoardFooter from "./components/BoardFooter";
import BoardHeader from "./components/BoardHeader";

export default function App() {
const boardName="Green 게시판";
const posts = [
  {id:1, title:"게시글임시1", authorNickname:"학생", createdDatetime:"2026-10-21", content:"내용입니다"},
  {id:2, title:"게시글임시2", authorNickname:"학생", createdDatetime:"2026-10-21", content:"내용입니다"},
  {id:3, title:"게시글임시3", authorNickname:"학생", createdDatetime:"2026-10-21", content:"내용입니다"},
  {id:4, title:"게시글임시4", authorNickname:"학생", createdDatetime:"2026-10-21", content:"내용입니다"}
];

return(
  <>
    <BoardHeader boardName={boardName}/>

    <main>
      <h1>게시판</h1>
      <p id="list-message" role="status">게시글 목록</p>
      <button id="retry-list" type="button">목록 다시 시도</button>
      <PostList posts={posts} onSelect={(post)=>window.alert(post.title)}/>

      <div className="pagination" aria-label="페이지 이동">
        <button id="previous-page" type="button" disabled>이전</button>
        <span id="page-number">1페이지</span>
        <button id="next-page" type="button" disabled>다음</button>
      </div>
    </main>

    <BoardFooter boardName={boardName}/>
  </>
)

}
