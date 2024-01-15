import { Link } from "react-router-dom";

export const BlogCard = () => {
  return (
    <>
      <div className="blog-card">
        <img src="images/blog-1.jpg" alt="Blog" className="w-100 img-fluid" />
        <div className="blog-content">
          <p className="date">10 Jan 2024</p>
          <h5 className="title">The First Blog Which Was Ever Created</h5>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            nemo voluptatem porro,
          </p>
          <Link to="/blog/:id" className="button">
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};
