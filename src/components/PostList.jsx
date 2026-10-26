import {useSearchParams} from "react-router-dom";
import PostItem from "./PostItem";
import { useEffect } from "react";
import { useState } from "react";


export default function PostList({token}){
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] =useState("게시글 목록");

  const requestedPage = Number(searchParams.get("page"));
  let page = 1;
  if( Number.isSafeInteger(requestedPage) && requestedPage>0 ){
    page= requestedPage;
    //새로고침 문제 예방
  }
  
  useEffect(()=>{
    fetch(`http://127.0.0.1:8080/api/board?page=${page-1}&size=10`,
      {headers : {Authorization:`Bearer ${token}`}}
    )
    .then((response)=>response.json())
    .then((result)=>{
       if(!result.success){
        throw new Error(result.message);
       }
       setPosts(result.data.content);
       setTotalPages(result.data.totalPages);
       setMessage(`전체 ${result.data.totalElements}개`);
       console.log(result)
    }) 
    .catch(()=>setMessage("게시글 불러올 수 없습니다."));
  },[page, token]);//


  return <main>
     <h1>게시판</h1>
          <p id="list-message" role="status">{message}</p>
          <button id="retry-list" type="button" hidden>목록 다시 시도</button>

          <PostListItem posts={posts}/>

          <div className="pagination" aria-label="페이지 이동">
            <button id="previous-page" type="button" disabled={page===1} onClick={()=>setSearchParams({page:String(page-1)})}>이전</button>
            <span id="page-number">{totalPages===0?"0페이지":`${page}페이지`}</span>
            <button id="next-page" type="button" disabled={page>=totalPages} onClick={()=>setSearchParams({page:String(page+1)})}>다음</button>
          </div>
  </main>
} 


function PostListItem({posts}){
    return (
    <ul id="post-list" className="post-list">
      { posts.length===0? "아직 게시글이 없습니다.": posts.map((post)=><PostItem key={post.id} post={post} />)}
    </ul>
    );
}