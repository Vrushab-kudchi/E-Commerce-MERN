import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

export const SpecialProduct = () => {
  return (
    <>
      <div className="col-6 mb-0 mt-4">
        <div className="special-product-card">
          <div className="d-flex">
            <div>
              <img src="images/watch.jpg" className="img-fluid" alt="Watch" />
            </div>
            <div className="special-product-content col-8">
              <h5 className="brand">Apple</h5>
              <h6 className="title">Apple Watch Pro+ With Mac</h6>
              <ReactStars
                count={5}
                value={3}
                size={24}
                activeColor="#ffd700"
                edit={false}
              />
              <p className="price">
                <span className="red-p">30000 &nbsp;</span>
                <strike>40,000</strike>
              </p>
              <div className="discount-till d-flex align-items-center gap-10">
                <p className="mb-0 ">
                  <b>5 </b>days
                </p>
                <div className="d-flex gap-10 align-items-center">
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>
                </div>
              </div>
              <div className="product-count my-3">
                <p>Products: 5</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "25%" }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <Link className="button">Add to Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
