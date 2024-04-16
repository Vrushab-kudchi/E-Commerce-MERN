import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  deleteCategory,
  getCategory,
} from "../features/pCategory/pCategorySlice";
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

export const CategoryList = () => {
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
    dispatch(getCategory());
  }, [dispatch]);

  const brandState = useSelector((state) => state.pCategory.category);

  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].title,
      action: (
        <>
          <Link
            to={`/admin/category/${brandState[i]._id}`}
            className="fs-3 text-info"
          >
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger">
            <AiFillDelete onClick={() => showModal(brandState[i]._id)} />
          </Link>
        </>
      ),
    });
  }

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id)); // Dispatching the Redux action
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategory()); // Refreshing brand list after deletion
    }, 100);
  };

  return (
    <>
      <div>
        <h3 className="title">Category</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <Custommodel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            handleDeleteCategory(deleteCategoryId);
          }}
          title="Are you sure you want to delete this Product Category?"
        />
      </div>
    </>
  );
};
