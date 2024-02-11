import React, { useEffect, useState } from "react";
import { Table } from "antd";
import {
  getBrand,
  deleteBrand as deleteBrandAction,
} from "../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Custommodel from "../Components/Custommodel";

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
    title: "Action",
    dataIndex: "action",
  },
];

export const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [deleteBrandId, setDeleteBrandId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setDeleteBrandId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);

  const data1 = brandState?.map((brand, index) => ({
    key: index + 1,
    name: brand.title,
    action: (
      <>
        <Link to={`/admin/brand/${brand._id}`} className="fs-3 text-info">
          <BiEdit />
        </Link>
        <Link className="ms-3 fs-3 text-danger">
          <AiFillDelete onClick={() => showModal(brand._id)} />
        </Link>
      </>
    ),
  }));

  const handleDeleteBrand = (id) => {
    dispatch(deleteBrandAction(id)); // Dispatching the Redux action
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrand()); // Refreshing brand list after deletion
    }, 100);
  };

  return (
    <>
      <div>
        <h3 className="title">Brands</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <Custommodel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            handleDeleteBrand(deleteBrandId);
          }}
          title="Are you sure you want to delete this brand?"
        />
      </div>
    </>
  );
};
