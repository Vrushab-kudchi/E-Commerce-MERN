import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

export const SpecialProduct = (props) => {
  const { id, title, brand, rating, price, quatity, sold, image } = props;
  return (
    <>
      <div className="col-6 mb-0 mt-4">
        <div className="special-product-card">
          <div className="d-flex">
            <div>
              <img src={image} className="img-fluid" alt="Watch" />
            </div>
            <div className="special-product-content p-2 col-8">
              <h5 className="brand">{brand}</h5>
              <h6 className="title">{title}</h6>
              <ReactStars
                count={5}
                value={parseInt(rating)}
                size={24}
                activeColor="#ffd700"
                edit={false}
              />
              <p className="price">
                <span className="red-p">
                  <b>INR</b> {price} &nbsp;
                </span>
                {/* <strike>40,000</strike> */}
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
                <p>Products: {quatity}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: (sold / quatity) * 100 + "%" }}
                    aria-valuenow={sold}
                    aria-valuemin={0}
                    aria-valuemax={quatity}
                  />
                </div>
              </div>
              <Link to={`/product/${id}`} className="button">
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
