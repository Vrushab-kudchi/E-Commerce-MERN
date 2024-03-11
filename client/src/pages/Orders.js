import { useDispatch, useSelector } from "react-redux";
import { BreadCrumb } from "../components/BreadCrumb";
import { useEffect } from "react";
import { getUserOrders } from "../features/users/userSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth.getOrderedProducts);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <>
      <BreadCrumb title="my Orders" />
      <div className="container cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Order Id</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount After Discount</h5>
              </div>
              <div className="col-3">
                <h5>Status</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          {orderState &&
            orderState
              .slice()
              .reverse()
              .map((item, index) => {
                return (
                  <div
                    className="row my-5 pt-3"
                    style={{ backgroundColor: "#febd69" }}
                    key={index}
                  >
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3">
                          <p>{item?._id}</p>
                        </div>
                        <div className="col-3">
                          <p>{item?.totalPrice}</p>
                        </div>
                        <div className="col-3">
                          <p>{item?.totalPriceAfterDiscount}</p>
                        </div>
                        <div className="col-3">
                          <p>{item?.orderStatus}</p>
                        </div>
                        <div
                          className="col-12"
                          style={{ backgroundColor: "#232f3e" }}
                        >
                          <div className="row py-3">
                            <div className="col-3">
                              <h6 className="text-white">Product Name</h6>
                            </div>
                            <div className="col-3">
                              <h5 className="text-white">Quantity</h5>
                            </div>
                            <div className="col-3">
                              <h5 className="text-white">Price</h5>
                            </div>
                            <div className="col-3">
                              <h5 className="text-white">Color</h5>
                            </div>
                          </div>
                        </div>
                        {item.orderItems?.map((data, index) => {
                          return (
                            <div
                              className="col-12"
                              style={{ backgroundColor: "#232f3e" }}
                            >
                              <div className="row py-3">
                                <div className="col-3">
                                  <p className="text-white">
                                    {data?.product?.title}
                                  </p>
                                </div>
                                <div className="col-3">
                                  <p className="text-white">{data?.quantity}</p>
                                </div>
                                <div className="col-3">
                                  <p className="text-white">
                                    {data?.product?.price}
                                  </p>
                                </div>
                                <div className="col-3">
                                  <ul className="colors ps-0">
                                    <li
                                      className="m"
                                      style={{
                                        backgroundColor: data?.color?.title,
                                      }}
                                    ></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
}
