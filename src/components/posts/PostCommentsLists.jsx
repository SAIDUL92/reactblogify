import { actions } from "../../actions";
import { useState } from "react";
import { useAvatar } from "../../hooks/useAvatar";
import { postPublishedDay } from "../../utils";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";
import useAxios from "../../hooks/useAxios";
import threeDots from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
export default function PostsCommentsList({ posts, singleBlogId }) {
  const { api } = useAxios();
  const [showAction, setShowAction] = useState(false);
  // const { avatarURL } = useAvatar(posts);
  const { auth } = useAuth();
  const { state, dispatch } = usePost();
  const isMe = posts?.author?.id === auth?.user?.id;

  const actionToggle = () => {
    setShowAction(!showAction);
  };

  const handleDeletePost = async (id) => {
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.delete(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/blogs/${singleBlogId}/comment/${id}`
      );
      if (response.status === 200) {
        dispatch({
          type: actions.post.POST_COMMENT_DELETED,
          data: response.data,
        });
      }
    } catch (error) {
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: response.error });
    }
  };

  return (
    <>
      {state?.posts?.comments &&
        state?.posts?.comments.map((comment) => {
          return (
            <div key={comment.id} className="flex items-start space-x-4 my-8">
              {comment?.author?.avatar ? (
                <img
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                  src={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                  }/uploads/avatar/${comment?.author?.avatar}`}
                  alt="avatar"
                />
              ) : (
                <div className="avater-img bg-orange-600 text-white">
                  <span>{comment?.author?.firstName.slice(0, 1)}</span>
                </div>
              )}

              <div className="w-full relative">
                <div className="absolute right-0 top-0">
                  {isMe && (
                    <button onClick={actionToggle}>
                      <img src={threeDots} alt="3dots of Action" />
                    </button>
                  )}

                  {showAction && (
                    <>
                      {/* Action Menus Popup */}
                      <div className="action-modal-container">
                        <button
                          className="action-menu-item hover:text-red-500"
                          onClick={() => handleDeletePost(comment.id)}
                        >
                          <img src={DeleteIcon} alt="Delete" />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <h5 className="text-slate -500 font-bold">
                  {comment?.author?.firstName} {comment?.author?.lastName}
                </h5>
                <p className="text-slate-300">{comment?.content}</p>
              </div>
            </div>
          );
        })}
    </>
  );
}
