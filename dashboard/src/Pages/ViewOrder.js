import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../features/auth/authSlice";
import { useParams } from "react-router-dom";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
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
    title: "Date",
    dataIndex: "date",
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

  console.log(orderState);

  orderState?.orderData?.products.map((item, index) =>
    data1.push({
      key: index + 1,
      name: item.product.title,
      brand: item.product.brand,
      count: item.count,
      amount: item.product.price,
      color: item.color,
      date: item.product.createdAt,
    })
  );

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
