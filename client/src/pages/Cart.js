import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export const Cart = () => {
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
              <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                <div className="cart-col-1 gap-15 d-flex align-items-center">
                  <div className="w-25">
                    <img src={watch} className="img-fluid" alt="watch" />
                  </div>
                  <div className="w-75">
                    <p>Apple Watch</p>
                    <p>Color: Color</p>
                    <p>Size: Size</p>
                  </div>
                </div>
                <div className="cart-col-2">
                  <h5 className="price">INR: 40,000</h5>
                </div>
                <div className="cart-col-3 d-flex align-items-center gap-15">
                  <div>
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      max={10}
                      name=""
                      id=""
                    />
                  </div>
                  <div>
                    <AiFillDelete className="text-danger fs-4" />
                  </div>
                </div>
                <div className="cart-col-4">
                  <h5 className="price">INR: 40,000</h5>
                </div>
              </div>
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to={"/product"} className="button">
                  Continue Shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: 50000</h4>
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
