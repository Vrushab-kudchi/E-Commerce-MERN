import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  deleteBlogCategory,
  getBlogCategory,
} from "../features/bCategory/bCategorySlice";
import Custommodel from "../Components/Custommodel";

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
    title: "Action",
    dataIndex: "action",
  },
];

export const BlogCatList = () => {
  const [open, setOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setDeleteCategoryId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogCategory());
  }, [dispatch]);

  const blogState = useSelector((state) => state.bCategory.category);

  const data1 = [];
  for (let i = 0; i < blogState?.length; i++) {
    data1.push({
      key: i + 1,
      name: blogState[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${blogState[i]._id}`}
            className="fs-3 text-info"
          >
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger">
            <AiFillDelete onClick={() => showModal(blogState[i]._id)} />
          </Link>
        </>
      ),
    });
  }
  const handleDeleteCategory = (id) => {
    dispatch(deleteBlogCategory(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCategory());
    }, 100);
  };
  return (
    <>
      <div>
        <h3 className="title">Blog Category</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <Custommodel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            handleDeleteCategory(deleteCategoryId);
          }}
          title="Are you sure you want to delete this Category?"
        />
      </div>
    </>
  );
};
