import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { BlogCard } from "../components/BlogCard";
import { ProductCard } from "../components/ProductCard";
import { SpecialProduct } from "../components/SpecialProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { getAllProduct } from "../features/products/productSlice";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllProduct());
  }, [dispatch]);
  const blogState = useSelector((state) => state.blog.blogs);
  const productState = useSelector((state) => state.product.products);

  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img
                  src="images/main-banner.jpg"
                  className="img-fluid rounded-3"
                  alt="Main Banner"
                />
                <div className="main-banner-content position-absolute">
                  <h4>SUPER CHARGED FOR PROS.</h4>
                  <h5>iPad Pro</h5>
                  <p>
                    From Rs40,000 or Rs8,000/mo. <br />
                    for 24 mo. Footnote*
                  </p>
                  <Link className="button">Buy Now</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-content-center">
                <div className="small-banner position-relative">
                  <img
                    src="images/catbanner-02.jpg"
                    className="img-fluid rounded-3"
                    alt="Main Banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>BEST SALE</h4>
                    <h5>iPad Pro</h5>
                    <p>
                      From Rs40,000 or <br /> Rs8,000/mo.
                    </p>
                  </div>
                </div>

                <div className="small-banner position-relative ">
                  <img
                    src="images/catbanner-01.jpg"
                    className="img-fluid rounded-3"
                    alt="Main Banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>buy IPad Air</h5>
                    <p>
                      From Rs40,000 or <br /> Rs8,000/mo.
                    </p>
                  </div>
                </div>

                <div className="small-banner position-relative ">
                  <img
                    src="images/catbanner-03.jpg"
                    className="img-fluid rounded-3"
                    alt="Main Banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>buy IPad Air</h5>
                    <p>
                      From Rs40,000 or <br /> Rs8,000/mo.
                    </p>
                  </div>
                </div>

                <div className="small-banner position-relative ">
                  <img
                    src="images/catbanner-04.jpg"
                    className="img-fluid rounded-3"
                    alt="Main Banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>buy IPad Air</h5>
                    <p>
                      From Rs40,000 or <br /> Rs8,000/mo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service.png" alt="Services" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From All Order Over Rs 500</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-02.png" alt="Services" />
                  <div>
                    <h6>Daily Suprise Suprise Offers</h6>
                    <p className="mb-0">Save up to 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-03.png" alt="Services" />
                  <div>
                    <h6>Support 24/7</h6>
                    <p className="mb-0">Shop With An Expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-04.png" alt="Services" />
                  <div>
                    <h6>Affordable Price</h6>
                    <p className="mb-0">Get Factory Direct Price</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-05.png" alt="Services" />
                  <div>
                    <h6>Secure Payment</h6>
                    <p className="mb-0">100% Protected Payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex flex-wrap justify-content-between align-items-center">
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Camera</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="Camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="tv" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Headphone</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="Headphone" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="Camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Camera</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="Camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="tv" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Headphone</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="Headphone" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="Camera" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Featured Collection</h3>
            </div>
            <div className="row">
              {" "}
              <ProductCard
                data={productState.filter((item) =>
                  item.tags.includes("featured")
                )}
                grid={3}
              />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="famous-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="famous-card bg-dark">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>For INR 50000 or 8000/month</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Product</h3>
            </div>
          </div>
          <div className="row">
            {productState?.map((item, index) =>
              item.tags.includes("special") ? (
                <SpecialProduct
                  key={index}
                  id={item?._id}
                  title={item?.title}
                  brand={item?.brand}
                  rating={item?.totalrating}
                  price={item?.price}
                  quatity={item?.quantity}
                  sold={item?.sold}
                  image={item?.images[0]?.url}
                />
              ) : null
            )}
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
                data={productState.filter((item) =>
                  item.tags.includes("popular")
                )}
                grid={3}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="marquee-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" alt="brands" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-02.png" alt="brands" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" alt="brands" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" alt="brands" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" alt="brands" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" alt="brands" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" alt="brands" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-08.png" alt="brands" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <h3 className="section-heading">Latest Blogs</h3>
            {blogState
              .slice()
              .reverse()
              .slice(0, 4)
              .map((data, index) => (
                <div className="col-3" key={index}>
                  <BlogCard
                    id={data._id}
                    title={data.title}
                    updatedAt={data.updatedAt}
                    images={data.images[0].url}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
