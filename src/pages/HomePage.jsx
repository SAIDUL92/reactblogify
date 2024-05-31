import Layout from "../layout/Layout";
import { useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import { usePost } from "../hooks/usePost";
import { actions } from "../actions";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PostsCard from "../components/posts/PostsCard";

export default function HomePage() {
  const { api } = useAxios();
  const { auth } = useAuth();
  const { state, dispatch } = usePost();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const [popularPosts, setPopularPosts] = useState([]);

  const [favouritesPosts, setFavouritesPosts] = useState([]);

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchPosts = async () => {

      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/?page=${page}`
        );



        if (response.status === 200) {
          if (response.data.blogs.length === 0) {
            setHasMore(false);
          } else {
            setPage((prevPage) => prevPage + 1);
            dispatch({
              type: actions.post.DATA_FETCHED,
              data: response.data.blogs,
            });
          }

        }


      } catch (error) { }

    };

    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchPosts();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // cleanup
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, page]);


  useEffect(() => {
    const fetchPopularPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
        );

        if (response.status === 200) {
          setPopularPosts([...response.data.blogs]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPopularPost();
  }, []);

  useEffect(() => {
    const fetchFavouritesPosts = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
        );
        if (response.status === 200) {
          setFavouritesPosts([...response.data.blogs]);
        }
      } catch (error) { }
    };

    {
      auth?.authToken && fetchFavouritesPosts();
    }
  }, []);

  if (state?.loading) {
    return <div>We are working...</div>;
  }
  if (state?.error) {
    return <div>Error in fetching posts {state?.error?.message}</div>;
  }

  return (
    <Layout>
      <main>
        <section>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              <div className="space-y-3 md:col-span-5">
                {state?.posts.map((post) => {
                  return <PostsCard key={post.id} post={post} />;
                })}

                {hasMore && <div ref={loaderRef}>Loading more posts...</div>}
                {!hasMore && <p className="bg-green-500 p-3 mt-5">All posts has been loaded</p>}
              </div>

              <div className="md:col-span-2 h-full w-full space-y-5">
                <div className="sidebar-card">
                  <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                    Most Popular 👍️
                  </h3>
                  <ul className="space-y-5 my-5">
                    {popularPosts.length > 0 ? (
                      popularPosts.map((post) => (
                        <li key={post.id}>
                          <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                            <Link to={`/single-blog/${post?.id}`}>
                              {post?.title}
                            </Link>
                          </h3>
                          <p className="text-slate-600 text-sm">
                            by{" "}
                            <Link to={`/profile/${post?.author?.id}`}>
                              {post?.author?.firstName} {post?.author?.lastName}
                            </Link>
                            <span>·</span> {post?.likes.length ?? 0} Likes
                          </p>
                        </li>
                      ))
                    ) : (
                      <p>No popular post found</p>
                    )}
                  </ul>
                </div>

                {auth?.authToken && (
                  <div className="sidebar-card">
                    <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                      Your Favourites ❤️
                    </h3>
                    <ul className="space-y-5 my-5">
                      {favouritesPosts.length > 0 ? (
                        favouritesPosts.map((post) => (
                          <li key={post.id}>
                            <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                              <Link to={`/single-blog/${post?.id}`}>
                                {post?.title}
                              </Link>
                            </h3>
                            <p className="text-slate-600 text-sm">
                              #tailwindcss, #server, #ubuntu
                            </p>
                          </li>
                        ))
                      ) : (
                        <p>No Favourites found</p>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
