import {Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../useAuthContext";

export default function PostDetail(){

    const {postId} = useParams();
    //const post = posts.find((post)=>post.id ===Number(postId));

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [postMessage, setPostMessage] = useState("");
    const [commentMessage, setCommentMessage] = useState("");
      const {token} = useAuthContext();

    const [commentContent, setCommentContent] = useState("");
    
    useEffect(()=>{
        if(Number(postId)<1) {
            console.log("잘못된 게시글 번호입니다");
            return;
        }
        setPost(null);

        async function loadPost(){
            try{
                const response = await fetch(
                    `http://127.0.0.1:8080/api/board/${postId}`,
                    {headers :{Authorization:`Bearer ${token}`}}
                );
                const result = await response.json();
                if(!response.ok||!result.success){
                    throw new Error(result.message||"게시글을 불러올 수 없습니다.");

                }
                setPost(result.data);
                setPostMessage("");
            } catch(error){
                setPostMessage(error.message);
                return;
            }}

            async function loadComment(){
            try{
                const response = await fetch(
                    `http://127.0.0.1:8080/api/board/${postId}/comment`,
                     {headers :{Authorization:`Bearer ${token}`}}
                );
                const result = await response.json();
                if(!response.ok||!result.success){
                    throw new Error(result.message||"댓글을 불러올 수 없습니다.");    
                }
                setComments(result.data);
                setCommentMessage("");
                console.log(result)
            }catch(error){
                setCommentMessage(error.message);
                
            }
        }
        
        loadPost();
        loadComment();
    }, [postId, token])

    async function addComment(event){
        event.preventDefault();

        const content = commentContent.trim();
        if(!content||content.length>255){
            setCommentMessage("댓글은1~255자로 입력하세요.");
            return;
        }

        try{
            const response = await fetch(
                `http://127.0.0.1:8080/api/board/${postId}/comment`,
                { method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    },
                    body:JSON.stringify({content})
                }
            );

            const result = await response.json();
            if(!response.ok||!result.success){
                throw new Error(result.message||"댓글 작성에 실패했습니다.");
            }
            setCommentContent("");


             const commentResponse = await fetch(
                    `http://127.0.0.1:8080/api/board/${postId}/comment`,
                     {headers :{Authorization:`Bearer ${token}`}}
                );

                const commentResult = await commentResponse.json();
                if(!commentResponse.ok||!commentResult.success){
                    throw new Error(result.message||"댓글을 불러올 수 없습니다.");    
                }
                setComments(commentResult.data);
                setCommentMessage("");
                console.log(result)
          
          
        }catch(error){
            setCommentMessage(error.message)
        }
       
    }




    return <main>
        
        <article>
            <h1 id="post-title">{post?.title ||"게시글을 불러올 수 없습니다."}</h1>
            <p id="post-meta">{post&& `${post.authorNickName}| ${post.createdDateTime||""}`}</p>
            <p id="post-content">{post?.content}</p>
            <p id="post-message" role="status">{postMessage}</p>
        </article>
        <Link to="/posts">목록으로</Link>
        {post&& <section id="comments-section" aria-label="comments-title">
            <h2 id="comments-title">댓글</h2>
            <p id="comments-message" role="status">{commentMessage}</p>
            <ul id="comments-list">
                { comments.length===0?"등록된 댓글이 없습니다.":comments.map(
                    (comment)=> <li key={comment.commentId}><strong>{comment.nickname}</strong><p>{comment.content}</p></li>)}
            </ul>
            <form id="comment-form" onSubmit={addComment} >
                <label htmlFor="comment-content">댓글 내용</label>
                <textarea id="comment-content" name="content" required maxLength="255" 
                value={commentContent} onChange={(e)=>setCommentContent(e.target.value)}></textarea>
                <button type="submit">댓글 등록</button>
            </form>
        </section>}
    </main>
}