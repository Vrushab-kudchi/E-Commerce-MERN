import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../features/auth/authSlice";
import { useParams } from "react-router-dom";
import moment from "moment";

const columns = [
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Time",
    dataIndex: "time",
  },
];

export const ViewOrder = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  const data1 = [];
  const orderState = useSelector((state) => state.auth);

  data1.push({
    name: orderState?.orderData?.orderItems.map((item) => {
      return item?.product?.title;
    }),
    count: orderState?.orderData?.orderItems.map((item) => {
      return item?.quantity;
    }),
    amount: orderState?.orderData?.totalPrice,
    color: orderState?.orderData?.orderItems.map((item) => {
      return (
        <div
          style={{
            height: "20px",
            width: "20px",
            borderRadius: "100%",
            backgroundColor: item?.color?.title,
          }}
        ></div>
      );
    }),
    time: moment(orderState?.orderData?.createdAt).fromNow(),
  });

  return (
    <>
      <div>
        <h3 className="title"> View User Order</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </>
  );
};
