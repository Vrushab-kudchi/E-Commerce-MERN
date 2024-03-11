import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
// import watch from "../images/watch.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createOrder, getUserCart } from "../features/users/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import config from "../utils/axiosConfig";

const shippingSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  other: Yup.string().required("Appartment/House No is required"),
  pincode: Yup.string().required("Pincode is required"),
  country: Yup.string().required("Country is required"),
});

export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingInfo, setshippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  const [cartProductState, setCartProductState] = useState([]);

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  const userCartState = useSelector((state) => state.auth.cartData);
  const userState = useSelector((state) => state.auth.user);

  useEffect(() => {
    let items = [];
    userCartState?.forEach((item) => {
      items.push({
        product: item?.productId?._id,
        quantity: item.quantity,
        color: item.color._id,
        price: item.price,
      });
    });
    setCartProductState(items);
  }, [userCartState]);

  useEffect(() => {
    // Calculate total amount whenever userCartState changes
    let newTotalAmount = 0;
    userCartState?.forEach((item) => {
      if (item?.productId) {
        newTotalAmount += item.productId.price * item.quantity;
      }
    });
    setTotalAmount(newTotalAmount);
  }, [userCartState, setTotalAmount]);

  const formik = useFormik({
    initialValues: {
      firstName: "Vrushab",
      lastName: "Kudchi",
      address: "kudchi Residence",
      city: "belgaum",
      state: "karnataka",
      other: "kudchi",
      pincode: "590001",
      country: "India",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setshippingInfo(values);
      setTimeout(() => {
        checkOutHandler();
      }, 300);
    },
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const checkOutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Please refresh the page and try");
      return;
    }
    const result = await axios.post(
      baseUrl + "user/order/checkout",
      { total: totalAmount },
      config
    );
    if (!result) {
      alert("Something Went Wrong");
      return;
    }
    const { amount, id, order_id, currency } = result.data.order;
    console.log(result.data);
    const options = {
      key: "rzp_test_EQ6ICWtMQ2KHuN", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency,
      name: "Vrushab Kudchi",
      description: "Test Transaction",
      // image: { logo },
      order_id: id,
      handler: async function (response) {
        const data = {
          orderCreationId: id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };
        const result = await axios.post(
          baseUrl + "user/order/paymentVerification",
          data,
          config
        );
        setPaymentInfo({
          data,
        });

        dispatch(
          createOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            paymentInfo: data,
            shippingInfo,
          })
        );
      },
      prefill: {
        name: "Vrushab Kudchi",
        email: "kudchivrushab@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "kudchi Residence",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="wbsite-name">Devtech</h3>
                <nav
                  style={{ "-bsBreadcrumbDivider": ">" }}
                  aria-label="breadcrumb total"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item total">
                      <Link to="/" className="text-dark total">
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item active total"
                      aria-current="page"
                    >
                      Product
                    </li>
                    <li
                      className="breadcrumb-item active total"
                      aria-current="page"
                    >
                      Cart
                    </li>
                    <li
                      className="breadcrumb-item active total "
                      aria-current="page"
                    >
                      Checkout
                    </li>
                  </ol>
                </nav>
                <h4 className="title total  ">Contact Information</h4>
                <p className="user-details total">
                  {userState?.firstname + " " + userState?.lastname} (
                  {" " + userState?.email + " "} )
                </p>
                <h4 className="mb-4">Shipping Address</h4>
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex gap-15 flex-wrap justify-content-between"
                >
                  <div className="w-100">
                    <select
                      name="country"
                      onChange={formik.handleChange}
                      value={formik.values.country}
                      className="form-control form-select"
                    >
                      <option value="" disabled>
                        Select Your Country
                      </option>
                      <option value="India">India</option>
                    </select>
                    <div className="error">
                      {formik.errors.country && formik.touched.country ? (
                        <>
                          <p>{formik.errors.country}</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      name="firstName"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                    />
                    <div className="error">
                      {formik.errors.firstName && formik.touched.firstName ? (
                        <>
                          <p>{formik.errors.firstName}</p>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      name="lastName"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                    />
                    <div className="error">
                      {formik.errors.lastName && formik.touched.lastName ? (
                        <>
                          <p>{formik.errors.lastName}</p>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control"
                      name="address"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                    />
                    <div className="error">
                      {formik.errors.address && formik.touched.address ? (
                        <>
                          <p>{formik.errors.address}</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Appartment, House"
                      className="form-control"
                      name="other"
                      onChange={formik.handleChange}
                      value={formik.values.other}
                    />
                    <div className="error">
                      {formik.errors.other && formik.touched.other ? (
                        <>
                          <p>{formik.errors.other}</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                      name="city"
                      onChange={formik.handleChange}
                      value={formik.values.city}
                    />
                    <div className="error">
                      {formik.errors.city && formik.touched.city ? (
                        <>
                          <p>{formik.errors.city}</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <select
                      name="state"
                      onChange={formik.handleChange}
                      value={formik.values.state}
                      className="form-control form-select"
                    >
                      <option value="" disabled>
                        Select Your State
                      </option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                    <div className="error">
                      {formik.errors.state && formik.touched.state ? (
                        <>
                          <p>{formik.errors.state}</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Pincode"
                      className="form-control"
                      name="pincode"
                      onChange={formik.handleChange}
                      value={formik.values.pincode}
                    />
                    <div className="error">
                      {formik.errors.pincode && formik.touched.pincode ? (
                        <>
                          <p>{formik.errors.pincode}</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to={"/cart"} className="text-dark">
                        <BiArrowBack /> &nbsp; Return to Cart
                      </Link>
                      <div>
                        <Link className="button me-3" to={"/cart"}>
                          Continue Shopping
                        </Link>
                        <button type="onSubmit" className="button">
                          Place Your Order
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4 ">
                {userCartState &&
                  userCartState?.map((item, index) => {
                    return (
                      <div className="d-flex gap-30 mb-2 align-items-center">
                        <div className="w-75 d-flex gap-10">
                          <div className="w-25 position-relative">
                            <span
                              style={{ top: "-10px", right: "2px" }}
                              className="badge bg-secondary text-white position-absolute rounded-circle p-2"
                            >
                              {item?.quantity}
                            </span>
                            <img
                              className=""
                              width={100}
                              height={100}
                              src={item?.productId?.images[0].url}
                              alt="watch"
                            />
                          </div>
                          <div>
                            <h5 className="total-price">
                              {item?.productId?.title}
                            </h5>
                            <p className="total-price">
                              {item?.productId?._id}
                            </p>
                          </div>
                          <div className="flex-grow-1 ms-4">
                            <h5 className="total">
                              र{item?.productId?.price * item?.quantity}
                            </h5>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="border-bottom py-4 ">
                <div className="d-flex justify-content-between align-align-items-center">
                  <p className="total">SubTotal</p>
                  <p className="total-price">INR {totalAmount}</p>
                </div>

                <div>
                  <div className="d-flex justify-content-between align-align-items-center">
                    <p className="mb-0 total">Shipping</p>
                    <p className="mb-0 total-price">INR : Free</p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-align-items-center border-bottom py-5">
                <h4 className="total">Total</h4>
                <h5 className="total-price">INR {totalAmount}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
