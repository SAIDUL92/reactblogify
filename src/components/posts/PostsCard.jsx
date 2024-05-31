
import PostContents from "./PostContents";
import PostThumbNail from "./PostThumbNail";
import { useNavigate } from "react-router-dom";

export default function PostsCard({ post }) {
    const navigation = useNavigate();

    const gotoDetailPage = (event) => {
        event.stopPropagation();
        navigation(`/single-blog/${post?.id}`)
    }
    return (

        <>

            <div className="blog-card" onClick={gotoDetailPage}>
                <PostThumbNail poster={post?.thumbnail} />
                <PostContents post={post} />

            </div>
        </>
    )
}