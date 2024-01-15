import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";

export const Checkout = () => {
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
                  Vrushab Kudchi (kudchivrushab@gmail.com)
                </p>
                <h4 className="mb-4">Shipping Address</h4>
                <form
                  action=""
                  className="d-flex gap-15 flex-wrap justify-content-between"
                >
                  <div className="w-100">
                    <select name="" id="" className="form-control form-select">
                      <option value="Seleted" disabled>
                        Select Your Country
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div>

                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                    />
                  </div>

                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control"
                    />
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Appartment, House"
                      className="form-control"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <select name="" id="" className="form-control form-select">
                      <option value="Karnataka" disabled>
                        Select Your State
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="ZipCode"
                      className="form-control"
                    />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to={"/cart"} className="text-dark">
                        <BiArrowBack /> &nbsp; Return to Cart
                      </Link>
                      <Link to={"/cart"} className="btn btn-danger p-2">
                        Continue to Shipping
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4 ">
                <div className="d-flex gap-10 mb-2 align-items-center">
                  <div className="w-75 d-flex gap-10">
                    <div className="w-25 position-relative">
                      <span
                        style={{ top: "-10px", right: "2px" }}
                        className="badge bg-secondary text-white position-absolute rounded-circle p-2"
                      >
                        1
                      </span>
                      <img className="img-fluid" src={watch} alt="watch" />
                    </div>
                    <div>
                      <h5 className="total-price">Apple Watch </h5>
                      <p className="total-price">s# /23123</p>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">INR 40000</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-bottom py-4 ">
                <div className="d-flex justify-content-between align-align-items-center">
                  <p className="total">SubTotal</p>
                  <p className="total-price">INR 30000</p>
                </div>

                <div>
                  <div className="d-flex justify-content-between align-align-items-center">
                    <p className="mb-0 total">Shipping</p>
                    <p className="mb-0 total-price">INR 80</p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-align-items-center border-bottom py-5">
                <h4 className="total">Total</h4>
                <h5 className="total-price">INR 50000</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
