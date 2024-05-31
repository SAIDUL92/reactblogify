import { actions } from "../../actions";
import Field from "../common/Filed";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";


import EditIcon from "../../assets/icons/edit.svg";
import { useProfile } from "../../hooks/useProfile";
import { useRef, useState } from "react";

const CreatePost = () => {
  const { dispatch } = usePost();
  const navigate = useNavigate();
  const { api } = useAxios();
  const [file, setFile] = useState(null);
  const [previeImage, setPrevieImage] = useState(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { state, dispatch: profileDispatch } = useProfile();
  const fileUploaderRef = useRef();

  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = () => {
    for (const file of fileUploaderRef.current.files) {
      setPrevieImage(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const submitForm = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("tags", data.tags);
    formData.append("thumbnail", file);

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/`,
        formData
      );

      if (response.status === 201) {
        const blogId = response.data.blog.id;
        dispatch({ type: actions.post.DATA_CREATED, data: response.data.blog });

        setTimeout((et) => {

          navigate(`/single-blog/${blogId}`);

        }, 500)

        // Clear the FormData object
        setFile(null);
        setPrevieImage(null);
      }
    } catch (error) {
      setError(error)
      // console.log(error)
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
    }
  };


  return (
    <>
      <form
        action="#"
        method="POST"
        onSubmit={handleSubmit(submitForm)}
        className="createBlog"
        encType="multipart/form-data"
      >
        <Field label="Image" error={errors.file}>
          <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
            <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
              {
                previeImage && <img
                  className="w-[90px]"
                  src={previeImage}
                  alt={state?.user?.firstName}
                />
              }

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <button onClick={handleImageUpload}>Upload Your Image</button>
              <input
                {...register("thumbnail")}
                ref={fileUploaderRef}
                type="file"
                name="thumbnail"
                id="file"
                hidden
              />
            </div>
          </div>
        </Field>

        <Field label="Title" error={errors.title}>
          <input
            {...register("title", { required: "Title Id is required" })}
            type="text"
            id="title"
            name="title"
            className={`border rounded-md focus:outline-none focus:border-indigo-500 ${!!errors.text ? "border-red-500" : "border-white/20"
              }`}
            placeholder="Enter your blog title"
          />
        </Field>

        <Field label="tags" error={errors.tags}>
          <input
            {...register("tags", { required: "Tags is required" })}
            type="text"
            id="tags"
            name="tags"
            className={`border rounded-md focus:outline-none focus:border-indigo-500 ${!!errors.text ? "border-red-500" : "border-white/20"
              }`}
            placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
          />
        </Field>

        <Field label="content" error={errors.content}>
          <textarea
            {...register("content", { required: "Blog content is required" })}
            id="content"
            name="content"
            placeholder="Write your blog content"
            rows="8"
            className={`border rounded-md focus:outline-none focus:border-indigo-500 ${!!errors.text ? "border-red-500" : "border-white/20"
              }`}
          ></textarea>
        </Field>

        <Field>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
          >
            Create Blog
          </button>
        </Field>
      </form>
    </>
  );
};

export default CreatePost;
