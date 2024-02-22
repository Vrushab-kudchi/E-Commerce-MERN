import { useEffect } from "react";
import { BlogCard } from "../components/BlogCard";
import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";

export const Blog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const blogState = useSelector((state) => state.blog.blogs);

  return (
    <>
      <Meta title="Blogs" />
      <BreadCrumb title="Blogs" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filer-title">Find By Categories</h3>
                <ul className="ps-0">
                  <li>Laptop</li>
                  <li>Camera</li>
                  <li>Tv</li>
                  <li>Watch</li>
                </ul>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                {blogState?.map((data, index) => {
                  return (
                    <div className="col-6 mb-3" key={index}>
                      <BlogCard
                        id={data._id}
                        title={data.title}
                        updatedAt={data.updatedAt}
                        images={data.images[0].url}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
