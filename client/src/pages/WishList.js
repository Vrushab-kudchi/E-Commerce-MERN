import { Meta } from "../components/Meta";
import { BreadCrumb } from "../components/BreadCrumb";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserData, getUserWishlist } from "../features/users/userSlice";
import { addToWishList } from "../features/products/productSlice";

export const WishList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWishlist());
  }, [dispatch]);
  const wishListState = useSelector((state) =>
    state.auth ? state.auth.userWishlist : []
  );

  return (
    <>
      <Meta title="WishList" />
      <BreadCrumb title="WishList" />
      <div className="wishlist-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            {wishListState?.length === 0 ? (
              <div className="p-5 h-100">
                <h1 style={{ height: "20vh" }}>Your Wish List is Empty!</h1>
              </div>
            ) : (
              <div></div>
            )}
            {wishListState?.map((item, index) => {
              return (
                <div className="col-2 " key={index}>
                  <div className="wishlist-card position-relative">
                    <img
                      src="images/cross.svg"
                      alt="cross icon"
                      onClick={() => {
                        dispatch(addToWishList(item._id));
                        setTimeout(() => {
                          dispatch(getUserWishlist());
                          dispatch(getUserData());
                        }, 500);
                      }}
                      className="position-absolute cross img-fluid bg-white rounded-circle p-1"
                    />
                    <div className="wishlist-card-image bg-white">
                      <img
                        src={item?.images[0]?.url}
                        className="img-fluid w-100 d-block mx-auto"
                        alt="watch"
                      />
                    </div>
                    <div className="products-details bg-white p-3 ps-2">
                      <h6 className="brand text-danger">{item?.brand}</h6>
                      <h5 className="product-title">{item?.title}</h5>
                      <ReactStars
                        count={5}
                        value={parseFloat(item?.totalrating)}
                        size={24}
                        activeColor="#ffd700"
                        edit={false}
                      />
                      <p
                        className={`description`}
                        // dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>
                      <p className="price fs-5">
                        <b>INR </b> {item?.price}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
