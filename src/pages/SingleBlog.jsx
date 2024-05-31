import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { usePost } from "../hooks/usePost";
import { actions } from "../actions";
import { Link, useParams } from "react-router-dom";
import PostsComments from "../components/posts/PostsComments";
import PostsCommentsList from "../components/posts/PostCommentsLists";

import IconLike from "../assets/icons/like.svg";
import IconHeart from "../assets/icons/heart.svg";
import IconHeartFilled from "../assets/icons/heart-filled.svg";
import IconComment from "../assets/icons/comment.svg";
import DOMPurify from "dompurify";
import { useAuth } from "../hooks/useAuth";

export default function SingleBlogPage() {
  const { state, dispatch } = usePost();
  const [post, setPost] = useState([]);
  const { auth } = useAuth();
  const { singleBlogId } = useParams();
  const { api } = useAxios();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${singleBlogId}`
        );

        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) { }
    };

    fetchPost(singleBlogId);
  }, []);

  const handleFavorite = async () => {
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL
        }/blogs/${singleBlogId}/favourite`
      );

      if (response.status === 200) {
        dispatch({ type: actions.post.POST_LIKED, data: response.data });
      }
    } catch (error) {
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error });
    }
  };

  const handleLiked = async () => {
    alert();
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${singleBlogId}/like`
      );

      if (response.status === 200) {
        dispatch({ type: actions.post.POST_LIKED, data: response.data });
      }
    } catch (error) {
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error });
    }
  };

  return (
    <>
      <Layout>
        <main>
          {/* Begin Blogs */}
          <section>
            <div className="container text-center py-8">
              <h1 className="font-bold text-3xl md:text-5xl">{post.title}</h1>

              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.title),
                }}
              ></div>
              <div className="flex justify-center items-center my-4 gap-4">
                <div className="flex items-center capitalize space-x-2">
                  <div className="avater-img bg-indigo-600 text-white">
                    <span className="">
                      {post.author?.firstName.slice(0, 1)}
                    </span>
                  </div>
                  <h5 className="text-slate-500 text-sm">
                    <Link to={`/profile/${post.author?.id}`}>
                      {post.author?.firstName} {post.author?.lastName}
                    </Link>
                  </h5>
                </div>
                <span className="text-sm text-slate-700 dot">
                  June 28, 2018
                </span>
                <span className="text-sm text-slate-700 dot">
                  {post.likes?.length ?? 0} Likes
                </span>
              </div>
              <img
                className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${post.thumbnail
                  }`}
                alt={post.title}
              />
              {/* Tags */}
              <ul className="tags">
                {post.tags
                  ? post.tags
                    .split(",")
                    .map((tag) => <li key={crypto.randomUUID()}>{tag}</li>)
                  : null}
              </ul>
              {/* Content */}
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content),
                }}
                className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left"
              ></div>
            </div>
          </section>
          {/* End Blogs */}
          {/* Begin Comments */}
          <section id="comments">
            <div className="mx-auto w-full md:w-10/12 container">
              <h2 className="text-3xl font-bold my-8">
                Comments ( {post.comments ? post.comments.length ?? 0 : null})
              </h2>

              <PostsComments post={post} />
              <PostsCommentsList posts={post} singleBlogId={singleBlogId} />
            </div>
          </section>
        </main>
        {/* End main */}
        {/* Floating Actions*/}
        <div className="floating-action">
          <ul className="floating-action-menus">
            <li
              onClick={() =>
                auth?.authToken
                  ? handleLiked()
                  : alert("please login to add comments")
              }
            >
              <img src={IconLike} alt="like" />
              <span>
                {post.likes && post.likes.length > 0 ? post.likes.length : ""}
              </span>
            </li>
            <li>
              {/* There is heart-filled.svg in the icons folder */}
              <button
                onClick={() =>
                  auth?.authToken ? handleFavorite() : alert("Please login")
                }
              >
                <img
                  src={post.isFavourite ? IconHeartFilled : IconHeart}
                  alt="Favourite"
                />
              </button>
            </li>

            <li>
              <a href="#comments">
                <img src={IconComment} alt="Comments" />
                <span>
                  {post.comments && post.comments.length > 0
                    ? post.comments.length
                    : ""}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Layout>
    </>
  );
}
