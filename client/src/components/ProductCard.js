import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import productCompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
// import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch1.jpeg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";

export const ProductCard = (props) => {
  const { grid } = props;
  let location = useLocation();
  return (
    <>
      <div
        className={location.pathname === "/product" ? `gr-${grid}` : "col-3"}
      >
        <Link
          to={location.pathname !== "/product" ? "/product/:id" : ":id"}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <Link>
              <img src={wish} alt="wishlist" />
            </Link>
          </div>
          <div className="product-image">
            <img src={watch} className="img-fluid" alt="watch" />
            <img src={watch2} className="img-fluid" alt="watch" />
          </div>
          <div className="products-details">
            <h6 className="brand">Apple</h6>
            <h5 className="product-title">Apple Watch Pro</h5>
            <ReactStars
              count={5}
              value={3}
              size={24}
              activeColor="#ffd700"
              edit={false}
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consequatur reiciendis cumque, maiores culpa laudantium animi
              delectus! Illum placeat labore, blanditiis officiis optio
              consequatur expedita alias quisquam fugiat, rerum iusto eum.
            </p>
            <p className="price">INR 30,000</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <Link>
                <img src={productCompare} alt="Add Cart" />
              </Link>
              <Link>
                <img src={view} alt="view" />
              </Link>
              <Link>
                <img src={addcart} alt="Add Cart" />
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
