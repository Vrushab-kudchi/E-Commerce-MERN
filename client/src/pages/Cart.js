import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteSingleCart,
  getUserCart,
  setTotalAmount,
  updateSingleCart,
} from "../features/users/userSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  const deleteCart = (cartItemId) => {
    dispatch(deleteSingleCart(cartItemId));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  const handleQuantity = (id, quantity) => {
    const data = {
      id,
      quantity,
    };
    dispatch(updateSingleCart(data));
    dispatch(getUserCart());
  };
  const userCartState = useSelector((state) => state?.auth?.cartData);
  const totalAmountState = useSelector((state) => state?.auth?.totalAmount);

  useEffect(() => {
    if (userCartState) {
      let totalAmount = 0;
      userCartState.forEach((item) => {
        totalAmount += (quantities[item._id] || item.quantity) * item.price;
      });
      dispatch(setTotalAmount(totalAmount));
    }
  }, [dispatch, quantities, userCartState]);

  return (
    <>
      <Meta title="Cart" />
      <BreadCrumb title="Cart" />
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>

              {userCartState &&
                userCartState?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                    >
                      <div className="cart-col-1 gap-15 d-flex align-items-center">
                        <div className="w-25">
                          <img
                            src={item?.productId?.images[0]?.url}
                            className="img-fluid"
                            alt="watch"
                          />
                        </div>
                        <div className="w-75">
                          <p>{item?.productId?.title}</p>
                          <p className="d-flex gap-10">
                            Color:
                            <ul className="colors ps-0">
                              <li
                                className="m"
                                style={{ backgroundColor: item?.color?.title }}
                              ></li>
                            </ul>
                          </p>
                        </div>
                      </div>
                      <div className="cart-col-2">
                        <h5 className="price">INR: {item?.price}</h5>
                      </div>
                      <div className="cart-col-3 d-flex align-items-center gap-15">
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            min={1}
                            max={10}
                            value={quantities[item._id] || item.quantity}
                            onChange={(e) => {
                              setQuantities({ [item?._id]: e.target.value });
                              handleQuantity(item?._id, e.target.value);
                            }}
                          />
                        </div>
                        <div>
                          <AiFillDelete
                            onClick={() => {
                              deleteCart(item?._id);
                            }}
                            className="text-danger fs-4"
                          />
                        </div>
                      </div>
                      <div className="cart-col-4">
                        <h5 className="price">
                          INR:
                          {quantities[item._id]
                            ? quantities[item._id] * item.price
                            : item.quantity * item.price}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to={"/product"} className="button">
                  Continue Shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: {totalAmountState}</h4>
                  <p>Taxes and Shipping calculated at Checkout</p>
                  <Link to={"/checkout"} className="button">
                    Check Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
