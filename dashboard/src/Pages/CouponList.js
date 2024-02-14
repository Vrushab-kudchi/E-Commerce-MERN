import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteCoupon, getCoupon } from "../features/coupon/couponSlice";
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
    title: "Expiry",
    dataIndex: "expiry",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

export const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [deleteCouponId, setDeleteCouponId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupon());
  }, [dispatch]);

  const couponState = useSelector((state) => state.coupon?.coupons);

  const data1 = [];
  for (let i = 0; i < couponState?.length; i++) {
    const formattedExpiry = new Date(couponState[i].expiry).toLocaleString();
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      expiry: formattedExpiry,
      discount: couponState[i].discount + " %",
      action: (
        <>
          <Link
            to={`/admin/coupon/${couponState[i]._id}`}
            className="fs-3 text-info"
          >
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger">
            <AiFillDelete onClick={() => showModal(couponState[i]._id)} />
          </Link>
        </>
      ),
    });
  }

  const showModal = (id) => {
    setOpen(true);
    setDeleteCouponId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleDeleteCoupon = (id) => {
    dispatch(deleteCoupon(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupon());
    }, 100);
  };

  return (
    <>
      <div>
        <h3 className="title">Coupon</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <Custommodel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            handleDeleteCoupon(deleteCouponId);
          }}
          title="Are you sure you want to delete this Coupon?"
        />
      </div>
    </>
  );
};
