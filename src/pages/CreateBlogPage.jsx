import Layout from "../layout/Layout";
import CreatePost from "../components/posts/CreatePost";
import UploadForm from "../components/posts";
export default function CreateBlogPage() {
  return (
    <>
      <Layout>
        <CreatePost />
        {/* <UploadForm /> */}
      </Layout>
    </>
  );
}
