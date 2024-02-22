import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteBlog, getBlog } from "../features/blog/blogSlice";
import Custommodel from "../Components/Custommodel";
import { deleteImage } from "../features/upload/uploadSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Views",
    dataIndex: "views",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

export const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState("");
  const [public_id, setPublicId] = useState("");

  const showModal = (id, public_id) => {
    setOpen(true);
    setDeleteBlogId(id);
    setPublicId(public_id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  const blogState = useSelector((state) => state.blog.blogs);

  const data1 = [];
  for (let i = 0; i < blogState?.length; i++) {
    data1.push({
      key: i + 1,
      name: blogState[i].title,
      category: blogState[i].category,
      views: blogState[i].numViews,
      action: (
        <>
          <Link
            to={`/admin/blog/${blogState[i]._id}`}
            className="fs-3 text-info"
          >
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger">
            <AiFillDelete
              onClick={() =>
                showModal(
                  blogState[i]._id,
                  blogState[i]?.images
                    ? blogState[i]?.images[0]?.public_id
                    : null
                )
              }
            />
          </Link>
        </>
      ),
    });
  }
  const handleDeleteBlog = (id, p_id) => {
    if (p_id != null) {
      dispatch(deleteImage(p_id));
    }
    dispatch(deleteBlog(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlog()); // Refreshing brand list after deletion
    }, 1000);
  };
  return (
    <>
      <div>
        <h3 className="title">Blog</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <Custommodel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            handleDeleteBlog(deleteBlogId, public_id);
          }}
          title="Are you sure you want to delete this Blog?"
        />
      </div>
    </>
  );
};
