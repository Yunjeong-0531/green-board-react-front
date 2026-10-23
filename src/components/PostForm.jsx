import {useState, useRef } from "react";
import {Link} from "react-router-dom";

export default function PostForm({onSave}){
    return <main>  
         <h1>글쓰기</h1>
          <PostFormField onSave={onSave} 
          /></main>
}
 function PostFormField({onSave}) {
    const [title, setTitle] =useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const titleRef = useRef(null);
    const contentRef = useRef(null);


    function handleSubmit(event){
        event.preventDefault();
        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();
        if(trimmedTitle.length<10||
            trimmedTitle.length>50||
            trimmedContent.length<10
        ){
            setMessage("제목은 10~50자, 본문은 10자 이상 입력해주세요");
            
            if(trimmedTitle.length<10|| trimmedTitle.length>50){
                titleRef.current.focus();
            }else{
                contentRef.current.focus();
            }

            return;
        }
        
        onSave({title: trimmedTitle, content:trimmedContent});
        setTitle("");
        setContent("");
        setMessage("");
        setMessage("저장합니다.")
      
    }
    return (
        <form id="post=form" onSubmit={handleSubmit}>
          
            <label htmlFor="title">제목</label>
            <input id="title" name="title" required minLength="10" maxLength="50" value={title} onChange={(event) => setTitle(event.target.value)} />
            <label ref={titleRef} htmlFor="content">내용</label>
            <textarea ref={contentRef} id="content" name="content" required minLength="10" rows="10" value={content} onChange={(event) => setContent(event.target.value)} />
            <p id="form-message" role="status">{message}</p>
            <button type="submit">게시글 등록</button>
            <Link to="/posts">목록으로</Link>
        </form>
    )
}