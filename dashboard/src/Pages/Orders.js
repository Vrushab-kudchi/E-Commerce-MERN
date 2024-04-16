import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrder } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
// import { BiEdit } from "react-icons/bi";
import moment from "moment";

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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

export const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const updateOrderStatus = (id, status) => {
    console.log(id, status);
    let data = {
      id: id,
      status: status,
    };
    dispatch(updateOrder(data));
  };

  const orderState = useSelector((state) => state.auth.orders);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name:
        orderState[i]?.user?.firstname + " " + orderState[i]?.user?.lastname,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>View Order</Link>
      ),
      amount: `${orderState[i]?.totalPrice} Rs`,
      date: moment(orderState[i]?.createdAt).format("DD-MM-YYYY"),
      action: (
        <>
          <select
            className="form-control form-select"
            defaultValue={orderState[i]?.orderStatus}
            onChange={(e) => {
              updateOrderStatus(orderState[i]?._id, e.target.value);
            }}
          >
            <option value={orderState[i]?.orderStatus}>
              {orderState[i]?.orderStatus}
            </option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }

  return (
    <>
      <div>
        <h3 className="title">Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </>
  );
};
