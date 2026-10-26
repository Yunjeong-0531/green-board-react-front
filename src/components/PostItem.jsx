import {Link} from "react-router-dom";

export default function PostItem({post}){
    return(
    <li>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
        <div className="meta">{post.authorNickName}|{post.createdDateTime}</div>
    
    </li>
)
}