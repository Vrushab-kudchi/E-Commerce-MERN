import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  deleteEnquiry,
  getEnquiry,
  resetState,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";
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
  // {
  //   title: "Email",
  //   dataIndex: "email",
  // },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  // {
  //   title: "Comment",
  //   dataIndex: "comment",
  // },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

export const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [deleteEnquiryId, setDeleteEnquiryId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setDeleteEnquiryId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiry());
  }, [dispatch]);

  const enquiryState = useSelector((state) => state.enquiry.enquires);

  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      // email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      // comment: enquiryState[i].comment,
      status: (
        <>
          <select
            name=""
            defaultValue={
              enquiryState[i].status ? enquiryState[i].status : "Submitted"
            }
            className="form-control form-select"
            id=""
            onChange={(e) =>
              setEnquiryStatus(e.target.value, enquiryState[i]._id)
            }
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-secondary"
            to={`/admin/enquiries/${enquiryState[i]._id}`}
          >
            <IoEyeSharp />
          </Link>
          <Link className="ms-3 fs-3 text-danger">
            <AiFillDelete onClick={() => showModal(enquiryState[i]._id)} />
          </Link>
        </>
      ),
    });
  }
  const handleDeleteEnquiry = (id) => {
    dispatch(deleteEnquiry(id)); // Dispatching the Redux action
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiry()); // Refreshing brand list after deletion
    }, 100);
  };

  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, status: e };
    dispatch(updateEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getEnquiry());
    }, 100);
  };
  return (
    <>
      <div>
        <h3 className="title">Enquiries</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <Custommodel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            handleDeleteEnquiry(deleteEnquiryId);
          }}
          title="Are you sure you want to delete this Enquiry?"
        />
      </div>
    </>
  );
};
