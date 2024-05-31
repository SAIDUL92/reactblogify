const PostThumbNail = ({ poster }) => {

    return (
        <>

            {poster && (<img
                className="max-w-full blog-thumb min-w-[382px] object-fill"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${poster}`}
                alt="poster"


            />)}

        </>
    )
}

export default PostThumbNail