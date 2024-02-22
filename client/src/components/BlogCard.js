import { Link } from "react-router-dom";

export const BlogCard = (props) => {
  const { id, title, updatedAt, images } = props;
  return (
    <>
      <div className="blog-card">
        <img src={images} alt="Blog" className="w-100 img-fluid" />
        <div className="blog-content">
          <p className="date">{new Date(updatedAt).toLocaleString()}</p>
          <h5 className="title">{title}</h5>
          <Link to={`/blog/${id}`} className="button">
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};
