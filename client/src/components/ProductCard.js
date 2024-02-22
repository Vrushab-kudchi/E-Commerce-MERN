import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import productCompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import filledheart from "../images/filledheart.svg";
// import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch1.jpeg";
import { useDispatch, useSelector } from "react-redux";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addToWishList } from "../features/products/productSlice";
import { getUserData } from "../features/users/userSlice";

export const ProductCard = (props) => {
  const dispatch = useDispatch();

  const wishListState = useSelector((state) =>
    state.auth.userData ? state.auth.userData.wishlist : []
  );
  const userState = useSelector((state) => (state.auth ? state.auth.user : []));

  const { grid, data } = props;
  // let location = useLocation();
  return (
    <>
      {data?.map((item) => {
        return (
          <div key={item?._id} className={grid ? `gr-${grid}` : "col-3"}>
            <div
              // to={
              //   location.pathname !== "/product"
              //     ? `/product/${item._id}`
              //     : item._id
              // }
              className="product-card position-relative"
            >
              <div className="wishlist-icon position-absolute">
                <Link
                  onClick={() => {
                    dispatch(addToWishList(item?._id));
                    dispatch(getUserData());
                  }}
                >
                  {userState ? (
                    wishListState.includes(item?._id) ? (
                      <img
                        src={filledheart}
                        style={{ width: "16px" }}
                        alt="wishlist"
                      />
                    ) : (
                      <img src={wish} alt="wishlist" />
                    )
                  ) : (
                    <Link to="/login">
                      <img src={wish} alt="wishlist" />
                    </Link>
                  )}
                </Link>
              </div>
              <div className="product-image">
                {item.images.map((data, index) => {
                  return (
                    <>
                      <img
                        key={index}
                        src={data.url ? data.url : watch}
                        className="img-fluid"
                        alt="watch"
                      />
                      <img
                        src={data.url ? data.url : watch2}
                        className="img-fluid"
                        alt="watch"
                      />
                    </>
                  );
                })}
              </div>
              <div className="products-details">
                <h6 className="brand ">{item.brand}</h6>
                <h5 className="product-title">{item.title}</h5>
                <ReactStars
                  count={5}
                  value={parseInt(item.totalrating)}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></p>
                <p className="price">INR {item.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <Link>
                    <img src={productCompare} alt="Add Cart" />
                  </Link>
                  <Link to={`/product/${item?._id}`}>
                    <img src={view} alt="view" />
                  </Link>
                  <Link>
                    <img src={addcart} alt="Add Cart" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
