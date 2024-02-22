import { Link, useParams } from "react-router-dom";
import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getABlog } from "../features/blogs/blogSlice";

export const SingleBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getABlog(id));
  }, [dispatch, id]);

  const SingleBlogState = useSelector((state) => state.blog?.blogData);

  return (
    <>
      <Meta title={SingleBlogState?.title} />
      <BreadCrumb title={SingleBlogState?.title} />

      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link
                  to={"/blogs"}
                  className="d-flex align-items-center gap-10"
                >
                  <HiOutlineArrowLeft className="fs-4" />
                  Go Back To Blogs
                </Link>
                <h3 className="title fs-1">{SingleBlogState?.title}</h3>
                <img
                  src={SingleBlogState?.images[0].url}
                  className="img-fluid w-100 my-4"
                  alt="blog"
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: SingleBlogState?.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
