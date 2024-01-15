import { Link } from "react-router-dom";
import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import { HiOutlineArrowLeft } from "react-icons/hi";
import blog from "../images/blog-1.jpg";

export const SingleBlog = () => {
  return (
    <>
      <Meta title="Dynamic Blog" />
      <BreadCrumb title="Dynamic Blog" />

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
                <h3 className="title">The Beautiful Sunday</h3>
                <img src={blog} className="img-fluid w-100 my-4" alt="blog" />
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt quod rerum deleniti ipsum, quisquam aliquid corrupti
                  possimus fuga! Commodi minima unde animi alias adipisci
                  aliquam exercitationem. Repellat quos ratione ut.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
