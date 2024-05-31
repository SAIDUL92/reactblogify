// import { useAvatar } from "../../hooks/useAvatar";
import { actions } from "../../actions";
import { useState } from "react";
import { postPublishedDay } from "../../utils";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";
import useAxios from "../../hooks/useAxios";
import DotsIcon from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import { Link } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import { useNavigate } from "react-router-dom";

const PostContents = ({ post }) => {
  const navigation = useNavigate();
  const { api } = useAxios();
  // const { avatarURL } = useAvatar(post);
  const [showAction, setShowAction] = useState(false);
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { dispatch: userProfileDispatch } = useProfile();
  const isMe = post?.author?.id === auth?.user?.id;

  const actionToggle = (e) => {
    e.stopPropagation();
    setShowAction(!showAction);
  };

  const handleDeletePost = async (event) => {
    event.stopPropagation();
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${post.id}`
      );

      if (response.status === 200) {
        dispatch({ type: actions.post.POST_DELETED, data: post.id });
        userProfileDispatch({ type: actions.post.POST_DELETED, data: post.id });
      }
    } catch (error) {
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error });
    }
  };

  const gotoDetailPage = (event) => {
    event.stopPropagation();
    navigation(`/profile/${post?.author?.id}`);
  };

  return (
    <>
      <div className="mt-2 relative">
        <h3 className="text-slate-300 text-xl lg:text-2xl">{post?.title}</h3>

        <p className="mb-6 text-base text-slate-500 mt-1">{post?.content}</p>
        {/* Meta Informations */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-indigo-600 text-white">
              <span className="">{post?.author?.firstName.slice(0, 1)}</span>
            </div>
            <div>
              <h5 className="text-slate-500 text-sm">
                <Link
                  onClick={gotoDetailPage}
                  className="child-element"
                  to={`/profile/${post?.author?.id}`}
                >
                  {post.author?.firstName} {post?.author?.lastName}
                </Link>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{postPublishedDay(post?.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{post.likes ? post.likes.length : '0'} Likes</span>
          </div>
        </div>
        {/* action dot */}
        <div className="absolute right-0 top-0">
          {isMe && (
            <button onClick={actionToggle}>
              <img src={DotsIcon} alt="3dots of Action" />
            </button>
          )}
          {/* Action Menus Popup */}

          {showAction && (
            <>
              {/* Action Menus Popup */}
              <div className="action-modal-container">
                <button className="action-menu-item hover:text-lwsGreen">
                  <img src={EditIcon} alt="Edit" />
                  Edit
                </button>
                <button
                  className="action-menu-item hover:text-red-500"
                  onClick={handleDeletePost}
                >
                  <img src={DeleteIcon} alt="Delete" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
        {/* action dot ends */}
      </div>
    </>
  );
};

export default PostContents;
