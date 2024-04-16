import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  deleteColor,
  getColor,
  resetState,
} from "../features/color/colorSlice";
import Custommodel from "../Components/Custommodel";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Color",
    dataIndex: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

export const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [deleteColorId, setDeleteColorId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setDeleteColorId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColor());
  }, [dispatch]);

  const colorState = useSelector((state) => state.color?.colors);

  const data1 = [];
  for (let i = 0; i < colorState?.length; i++) {
    data1.push({
      key: i + 1,
      name: (
        <div
          style={{
            height: "20px",
            width: "20px",
            borderRadius: "100%",
            backgroundColor: colorState[i].title,
          }}
        ></div>
      ),
      action: (
        <>
          <Link
            to={`/admin/color/${colorState[i]._id}`}
            className="fs-3 text-info"
          >
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger">
            <AiFillDelete onClick={() => showModal(colorState[i]._id)} />
          </Link>
        </>
      ),
    });
  }
  const handleDeleteColor = (id) => {
    dispatch(deleteColor(id)); // Dispatching the Redux action
    dispatch(resetState());
    setOpen(false);
    setTimeout(() => {
      dispatch(getColor()); // Refreshing brand list after deletion
      dispatch(resetState());
    }, 100);
  };
  return (
    <>
      <div>
        <h3 className="title">Color</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <Custommodel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            handleDeleteColor(deleteColorId);
          }}
          title="Are you sure you want to delete this Color?"
        />
      </div>
    </>
  );
};
