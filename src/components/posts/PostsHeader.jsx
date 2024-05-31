import { actions } from "../../actions";
import { useState } from "react";
import { useAvatar } from "../../hooks/useAvatar";
import { postPublishedDay } from "../../utils";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";
import useAxios from "../../hooks/useAxios";


export default function PostsHeader({ post }) {
    const { api } = useAxios()

    const [showAction, setShowAction] = useState(false);
    const { avatarURL } = useAvatar(post);
    const { auth } = useAuth()

    const { dispatch } = usePost()

    const isMe = post?.author?.id === auth?.user?.id;

    const actionToggle = () => {
        setShowAction(!showAction)
    }


    const handleDeletePost = async () => {
        dispatch({ type: actions.post.DATA_FETCHING })

        try {

            const response = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`);

            if (response.status === 200) {
                dispatch({ type: actions.post.POST_DELETED, data: post.id })


            }

        }

        catch (error) {

            dispatch({ type: actions.post.DATA_FETCH_ERROR, error: response.error })
        }

    }
    return (

        <>

            <header className="flex items-center justify-between gap-4">
                {/* author info */}
                <div className="flex items-center gap-3">
                    <img
                        className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                        src={avatarURL}
                        alt="avatar"
                    />
                    <div>
                        <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
                        <div className="flex items-center gap-1.5">
                            {/* <img src="./assets/icons/time.svg" alt="time" /> */}
                            <span className="text-sm text-gray-400 lg:text-base">{postPublishedDay(post?.createAt)} ago</span>
                        </div>
                    </div>
                </div>
                {/* author info ends */}
                {/* action dot */}

                <div className="relative">


                    {isMe && <button onClick={actionToggle}>
                        {/* <img src="./assets/icons/3dots.svg" alt="3dots of Action" /> */}
                        ...
                    </button>}


                    {showAction && (


                        <>
                            {/* Action Menus Popup */}
                            <div className="action-modal-container">
                                <button className="action-menu-item hover:text-lwsGreen">
                                    {/* <img src="./assets/icons/edit.svg" alt="Edit" /> */}
                                    Edit
                                </button>
                                <button className="action-menu-item hover:text-red-500"
                                    onClick={handleDeletePost}
                                >
                                    {/* <img src="./assets/icons/delete.svg" alt="Delete" /> */}
                                    Delete
                                </button>
                            </div>
                        </>

                    )}
                </div>


                {/* action dot ends */}
            </header>


        </>
    )
}