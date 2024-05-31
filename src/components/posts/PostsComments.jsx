import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";
import { actions } from "../../actions";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";

export default function PostsComments({ post }) {
  const { dispatch: userProfileDispatch } = useProfile();
  const { auth } = useAuth();
  const { state, dispatch } = usePost();
  const { api } = useAxios();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const addComment = async (e) => {
    if (e.keyCode === 13) {
      try {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${post.id}/comment`,
          { content: comment }
        );

        console.log(response, "response.data comment");
        if (response.status === 200) {
          dispatch({
            type: actions.post.POST_COMMENTED,
            data: response.data,
          });
          // userProfileDispatch({
          //   type: actions.post.POST_COMMENTED,
          //   data: post.id,
          // });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="flex space-x-4">
        <div className="avater-img bg-indigo-600 text-white">
          {/* <img
                        className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
                        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`}
                        alt="avatar"
                    /> */}
          <span className="">
            {state?.posts?.author?.firstName.slice(0, 1)}
          </span>
        </div>
        <div className="w-full">
          <textarea
            className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyUp={addComment}
            onClick={() => (!auth?.authToken ? navigate("/login") : "")}
          />
          <div className="flex justify-end mt-4">
            <button
              disabled={auth?.authToken ? false : true}
              className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
