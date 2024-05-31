import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";


export default function PostsActions({ post, commentCount }) {
    const { auth } = useAuth()
    const { api } = useAxios()

    const [liked, setLiked] = useState(post?.likes?.includes(auth?.user?.id));

    const handleLike = async () => {

        try {

            const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/like`);


            if (response.status === 200) {
                setLiked(true)

            }

        } catch (error) {
            setLiked(false)
        }
    }

    return (
        <>

            <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
                {/*  Like Button */}
                <button
                    className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
                    onClick={handleLike}
                >
                    <img className="w-6" src={liked ? 'liked' : "./assets/icons/like.svg"} alt="Like" />
                    {


                        !liked && (<span>Like</span>)

                    }
                </button>

                {/*  Comment Button */}
                <button
                    className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm"
                >
                    {/* <img src="./assets/icons/comment.svg" alt="Comment" /> */}
                    <span>Comment({commentCount ?? 0})</span>
                </button>
                {/*  Share Button */}

                {/*  Like Button */}
                <button
                    className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
                >
                    {/* <img src="./assets/icons/share.svg" alt="Share" /> */}
                    <span>Share</span>
                </button>
            </div>
        </>)
}

