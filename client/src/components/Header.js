import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useEffect, useState } from "react";

export const Header = () => {
  const navigate = useNavigate();

  const [paginate, setPaginate] = useState(true);
  const [productOpt, setProductOpt] = useState([]);

  const productState = useSelector((state) => state.product.products);
  const totalAmountState = useSelector((state) => state?.auth?.totalAmount);
  const authState = useSelector((state) => state?.auth);

  useEffect(() => {
    let data = [];
    productState?.forEach((item, index) => {
      data.push({ id: index, productId: item._id, name: item.title });
    });
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over Rs 120 & Free Return
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Call Support:{" "}
                <a className="text-white" href="tel:+918310374677">
                  +91 8310374677
                </a>
                ,
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to={"/"} className="text-white">
                  DevTech
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onChange={(select) => {
                    navigate(`/product/${select[0]?.productId}`);
                  }}
                  options={productOpt}
                  minLength={2}
                  paginate={paginate}
                  labelKey={"name"}
                  placeholder="Search Product Here..."
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-link d-flex align-items-center justify-content-between">
                <div>
                  {/* <Link
                    to={"compare-product"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="Compare" />
                    <p className="mb-0">
                      Compare <br />
                      Products
                    </p>
                  </Link> */}
                </div>

                <div>
                  <Link
                    to={"/wishlist"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="Wishlist" />
                    <p className="mb-0">
                      Favourite <br />
                      wishlist
                    </p>
                  </Link>
                </div>

                <div>
                  <Link
                    to={!authState?.user ? "/login" : "my-profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={user} alt="user" />
                    {!authState?.user ? (
                      <>
                        <p className="mb-0">
                          Login <br />
                          My Account
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="mb-0">
                          Welcome {authState.user.firstname}
                        </p>
                      </>
                    )}
                  </Link>
                </div>

                <div>
                  <Link
                    to={"/cart"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="Cart" />
                    <div className="d-flex flex-column gap-10">
                      {/* <span className="badge bg-white text-dark">0</span> */}
                      <p className="mb-0">
                        {totalAmountState ? totalAmountState : <></>}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="Menu Logo" />
                      <span className="me-5 d-line-block ">Show Category</span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="menu-links">
                    <div className="d-flex align-items-center gap-15">
                      <NavLink to={"/"}>Home</NavLink>
                      <NavLink to={"/product"}>Our Store</NavLink>
                      <NavLink to={"/my-orders"}>My Orders</NavLink>
                      <NavLink to={"/blogs"}>Blogs</NavLink>
                      <NavLink to={"/contact"}>Contact</NavLink>

                      {authState.user ? (
                        <button
                          type="button"
                          className="border border-0 bg-transparent text-white text-uppercase"
                          onClick={() => handleLogout()}
                        >
                          Logout
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
