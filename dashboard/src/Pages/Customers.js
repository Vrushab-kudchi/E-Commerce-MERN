import React, { useEffect } from "react";
import { Table } from "antd";
import { getUsers } from "../features/customer/customerSlice";
import { useDispatch, useSelector } from "react-redux";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

export const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const customerState = useSelector((state) => state.customer.customers);

  const data1 = [];
  for (let i = 0; i < customerState.length; i++) {
    if (customerState[i].role === "user") {
      data1.push({
        key: i + 1,
        name: customerState[i].firstname + " " + customerState[i].lastname,
        email: customerState[i].email,
        mobile: customerState[i].mobile,
      });
    }
  }

  return (
    <>
      <div>
        <h3 className="title">Customers</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </>
  );
};
