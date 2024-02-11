import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getBlog } from "../features/blog/blogSlice";

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
          <Link to={"/"} className="fs-3 text-info">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to={"/"}>
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <>
      <div>
        <h3 className="title">Blog</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </>
  );
};
