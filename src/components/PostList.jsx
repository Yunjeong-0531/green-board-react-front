import PostItem from "./PostItem";

export default function PostList({posts, onSelect}){
    return (
    <ul id="post-list" className="post-list">
      {posts.map((post)=><PostItem key={post.id} post={post} onSelect={onSelect}/>)}
    </ul>
    );
}