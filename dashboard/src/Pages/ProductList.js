import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { deleteProduct, getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import Custommodel from "../Components/Custommodel";
import { deleteImage } from "../features/upload/uploadSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.localeCompare(b.brand),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

export const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [deleteProductId, setDeProductBlogId] = useState("");
  const [public_id, setPublicId] = useState("");

  const showModal = (id, public_id) => {
    setOpen(true);
    setDeProductBlogId(id);
    setPublicId(public_id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);

  const data1 = [];
  for (let i = 0; i < productState?.length; i++) {
    data1.push({
      key: i + 1,
      name: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      quantity: productState[i].quantity,
      action: (
        <>
          <Link
            to={`/admin/product/${productState[i]._id}`}
            className="fs-3 text-info"
          >
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger">
            <AiFillDelete
              onClick={() =>
                showModal(
                  productState[i]._id,
                  productState[i]?.images
                    ? productState[i]?.images[0]?.public_id
                    : null
                )
              }
            />
          </Link>
        </>
      ),
    });
  }

  const handleDeleteProduct = (id, p_id) => {
    console.log(id, p_id);
    if (p_id != null) {
      dispatch(deleteImage(p_id));
    }
    dispatch(deleteProduct(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts()); // Refreshing brand list after deletion
    }, 1000);
  };

  return (
    <>
      <div>
        <h3 className="title">Product</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <Custommodel
          hideModal={hideModal}
          open={open}
          performAction={() => {
            handleDeleteProduct(deleteProductId, public_id);
          }}
          title="Are you sure you want to delete this Product?"
        />
      </div>
    </>
  );
};
