import { useEffect, useState } from "react";
import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import { ProductCard } from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import { Color } from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAProduct,
  getAllProduct,
} from "../features/products/productSlice";
import { toast } from "sonner";
import { addToCart, getUserCart } from "../features/users/userSlice";

export const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    dispatch(getAProduct(id));
    dispatch(getUserCart());
  }, [id, dispatch]);

  const productState = useSelector((state) => state.product.productData);
  const productsState = useSelector((state) => state.product.products);
  const userState = useSelector((state) => state.auth.userData);
  const isLogin = useSelector((state) => state.auth.user);
  const cartState = useSelector((state) => state.auth.cartData);

  useEffect(() => {
    // Check if any item in cartState has the same productId as productState
    const existingProduct = cartState?.find(
      (item) => item?.productId?._id === productState?._id
    );
    setAlreadyAdded(!!existingProduct); // Convert to boolean
  }, [cartState, productState]);

  useEffect(() => {
    if (productsState.length == 0) {
      dispatch(getAllProduct());
    }
  }, [dispatch]);

  const props = {
    width: 400,
    height: 600,
    zoomWidth: 600,
    img: productState?.images[0]?.url
      ? productState?.images[0]?.url
      : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  };
  const [orderedProduct, setOrderedProduct] = useState(true);

  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const Cart = (id) => {
    if (isLogin) {
      if (color === null) {
        toast.error("Please select a color!");
      } else {
        dispatch(
          addToCart({
            userId: userState?._id,
            productId: productState?._id,
            price: productState?.price,
            quantity,
            color,
          })
        );
        dispatch(getUserCart());
      }
    } else {
      navigate("/login");
    }
  };

  const handleRating = (event) => {
    event.preventDefault();
    if (star === null) {
      toast.error("Please provide a rating.");
    } else if (!comment) {
      toast.error("Please provide a comment.");
    } else {
      dispatch(
        addRating({
          star: star,
          productId: id,
          comment: comment,
        })
      );
      setTimeout(() => {
        dispatch(getAProduct(id));
      }, 100);
    }
  };

  return (
    <>
      <Meta title={productState?.title} />
      <BreadCrumb title={productState?.title} />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl p-3 bg-white">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  <ReactImageZoom {...props} />
                </div>
              </div>
              <div className="other-product-image d-flex flex-wrap gap-15">
                {productState?.images.map((item, index) => {
                  return (
                    <div>
                      <img src={item.url} className="img-fluid" alt="Product" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">{productState?.title}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">INR {productState?.price}</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      value={parseInt(productState?.totalrating)}
                      size={24}
                      activeColor="#ffd700"
                      edit={false}
                    />
                    <p className="mb-0 t-review">(2 Reviews)</p>
                  </div>
                  <Link className="review-btn" to="#review">
                    Write a Review
                  </Link>
                </div>
                <div className="py-3">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">type :</h3>
                    <p className="product-data">{productState?.category}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Brand :</h3>
                    <p className="product-data">{productState?.brand}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Category :</h3>
                    <p className="product-data">{productState?.category}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center ">
                    <h3 className="product-heading">Tags :</h3>
                    <p className="product-data">
                      {productState?.tags.map((item, index) => (
                        <span key={index}>
                          {index > 0 ? ", " : ""}
                          {item}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Avaibility :</h3>
                    <p className="product-data">
                      {productState?.sold === productState?.quality
                        ? "Out of Stock"
                        : "In stock"}
                    </p>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    {/* <h3 className="product-heading">Size :</h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        S
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        M
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XL
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XXL
                      </span>
                    </div> */}
                  </div>
                  {alreadyAdded ? (
                    <></>
                  ) : (
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading">Color :</h3>
                      <Color
                        setColor={setColor}
                        color={color}
                        colorData={productState?.color}
                      />
                    </div>
                  )}

                  <div className="d-flex gap-15 flex-row align-items-center mt-2 mb-3">
                    {alreadyAdded ? (
                      <></>
                    ) : (
                      <>
                        <h3 className="product-heading">Quantity :</h3>
                        <div>
                          <input
                            type="number"
                            className="form-control"
                            style={{ width: "70px" }}
                            min={1}
                            max={10}
                            value={quantity}
                            onChange={(e) => {
                              setQuantity(parseInt(e.target.value));
                            }}
                          />
                        </div>
                      </>
                    )}
                    {alreadyAdded ? (
                      <Link to={"/cart"} className="mt-5 mb-3">
                        <button className="button border-0" type="submit">
                          View Cart
                        </button>
                      </Link>
                    ) : (
                      <div className="d-flex align-items-center gap-15 ms-5">
                        <button
                          className="button border-0"
                          type="submit"
                          onClick={() => {
                            Cart();
                          }}
                        >
                          Add to Cart
                        </button>
                        {/* <button className="button signup" to={"/signup"}>
                          Buy it Now
                        </button> */}
                      </div>
                    )}
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div>
                      {/* <Link to="">
                        <TbGitCompare className="fs-5 me-2" />
                        Add to Compare
                      </Link> */}
                    </div>
                    <div>
                      {/* <Link to="">
                        <AiOutlineHeart className="fs-5 me-2" />
                        Add to Wishlist
                      </Link> */}
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column my-3">
                    <h3 className="product-heading">Shipping & Returns :</h3>
                    <p className="product-data">
                      Free Shipping and Returns are Avaible In &nbsp;
                      <b>India Up-to 5 to 10 Working Days !</b>
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-3">
                    <h3 className="product-heading">Share Product :</h3>
                    <p className="product-data">
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => copyToClipboard(window.location.href)}
                      >
                        Copy Product Link
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p
                  dangerouslySetInnerHTML={{
                    __html: productState?.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="reviews-wrapper home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 id="review">Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        value={3}
                        size={24}
                        activeColor="#ffd700"
                        edit={false}
                      />
                      <p className="mb-0">Based on 2 Reviews</p>
                    </div>
                  </div>
                  {orderedProduct && (
                    <div>
                      <Link
                        className="text-dark text-decoration-underline"
                        to=""
                      >
                        Write a Review
                      </Link>
                    </div>
                  )}
                </div>
                <div className="review-form py-4">
                  <h4>Write a Review</h4>
                  <form
                    onSubmit={handleRating}
                    className="d-flex flex-column gap-15"
                  >
                    <div>
                      <ReactStars
                        count={5}
                        value={0}
                        size={24}
                        activeColor="#ffd700"
                        onChange={(e) => setStar(e)}
                      />
                    </div>
                    <div>
                      <textarea
                        type="text"
                        className="w-100 form-control"
                        cols={30}
                        rows={4}
                        placeholder="Comment"
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="button border-0  ">
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
                <div className="reviws mt-4">
                  {productState &&
                    productState.ratings
                      .slice()
                      .reverse()
                      .map((item, index) => {
                        return (
                          <div className="review ">
                            <div className="d-flex gap-10 align-items-center">
                              <h6 className="mb-0">
                                {item?.postedby?.firstname +
                                  " " +
                                  item?.postedby?.lastname}
                              </h6>

                              <ReactStars
                                count={5}
                                value={parseFloat(item?.star)}
                                size={24}
                                activeColor="#ffd700"
                                edit={false}
                              />
                            </div>
                            <p className="mt-3">{item?.comment}</p>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
            <div className="row">
              <ProductCard
                data={productsState?.filter((item) =>
                  item.tags.includes("popular")
                )}
                grid={3}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
