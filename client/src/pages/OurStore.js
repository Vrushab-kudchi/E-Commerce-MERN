import React, { useEffect, useState } from "react";
import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import { ProductCard } from "../components/ProductCard";
import { Color } from "../components/Color";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../features/products/productSlice";

export const OurStore = () => {
  const dispatch = useDispatch();

  const [brands, setBrands] = useState([]);
  const [categorys, setCategorys] = useState([]);

  const [tags, setTags] = useState([]);

  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [color, setColor] = useState(null);
  const [tag, setTag] = useState(null);

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  const productState = useSelector((state) => state.product.products);

  useEffect(() => {
    let newbrand = [];
    let newcategory = [];
    let newtag = [];
    productState?.forEach((item) => {
      newbrand.push(item.brand);
      newcategory.push(item.category);
      item.tags.map((item) => {
        newtag.push(item);
      });
      setTags(newtag);
      setBrands(newbrand);
      setCategorys(newcategory);
    });
  }, [productState]);
  useEffect(() => {
    dispatch(
      getAllProduct({ sort, brand, category, color, maxPrice, minPrice, tag })
    );
  }, [dispatch, sort, brand, category, color, maxPrice, minPrice, tag]);

  const [grid, setGrid] = useState(3);
  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filer-title">Shop By Categories</h3>
                <ul className="ps-0">
                  {categorys &&
                    [...new Set(categorys)].map((item, index) => {
                      return (
                        <li key={index} onClick={() => setCategory(item)}>
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filer-title">Filter By</h3>
                <div>
                  {/* <h5 className="sub-title">Availability</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        In Stock (10)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckChecked"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        Out of Stock (0)
                      </label>
                    </div>
                  </div> */}
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-align-items-center gap-10">
                    <form className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInputValue"
                        placeholder="From"
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <label htmlFor="floatingInputValue">From</label>
                    </form>
                    <form className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInputValue1"
                        placeholder="To"
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <label htmlFor="floatingInputValue1">To</label>
                    </form>
                  </div>
                  <h5 className="sub-title">Colors</h5>
                  <div>
                    <div className="d-flex flex-wrap">
                      {productState &&
                        productState?.map((items, index) => {
                          return items?.color.map((item, index) => {
                            return (
                              <ul className="colors ps-2">
                                <li
                                  onClick={() => setColor(item?._id)}
                                  className="m"
                                  key={index}
                                  style={{
                                    backgroundColor: item?.title,
                                  }}
                                ></li>
                              </ul>
                            );
                          });
                        })}
                    </div>
                  </div>
                  {/* <h5 className="sub-title">Size</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue
                        id="color-1"
                      />
                      <label className="form-check-label" htmlFor="color-1">
                        S (2)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue
                        id="color-2"
                      />
                      <label className="form-check-label" htmlFor="color-2">
                        M (2)
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filer-title">Product Brands</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    {brands &&
                      [...new Set(brands)].map((item, index) => {
                        return (
                          <span
                            key={index}
                            onClick={() => setBrand(item)}
                            className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filer-title">Product Tags</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    {tags &&
                      [...new Set(tags)].map((item, index) => {
                        return (
                          <span
                            onClick={() => setTag(item)}
                            key={index}
                            className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* <div className="filter-card mb-3">
                <h3 className="filer-title">Random Product</h3>
                <div className="random-products mb-3 d-flex">
                  <div className="w-50">
                    <img className="w-100" src="images/watch.jpg" alt="watch" />
                  </div>
                  <div className="w-50">
                    <h5>Apple Watch Pro</h5>
                    <ReactStars
                      count={5}
                      value={3}
                      size={24}
                      activeColor="#ffd700"
                      edit={false}
                    />
                    <b>INR 30000</b>
                  </div>
                </div>
                <div className="random-products d-flex">
                  <div className="w-50">
                    <img className="w-100" src="images/watch.jpg" alt="watch" />
                  </div>
                  <div className="w-50">
                    <h5>Apple Watch Pro</h5>
                    <ReactStars
                      count={5}
                      value={3}
                      size={24}
                      activeColor="#ffd700"
                      edit={false}
                    />
                    <b>INR 30000</b>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-9">
              <div className="filter-sort-gri mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sort By:
                    </p>
                    <select
                      onChange={(e) => setSort(e.target.value)}
                      className="form-control form-select"
                    >
                      <option value="none">Please Select Sort Method</option>
                      <option value="title">Alphabetically, A-Z</option>
                      <option value="-title">Alphabetically, Z-A</option>
                      <option value="price">Price ,Low to High Price</option>
                      <option value="-price">Price ,High to Low Price</option>
                      <option value="createdAt">Date, old to new</option>
                      <option value="-createdAt">Date, new to old</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="totalproduct mb-0">
                      {productState.length} Products
                    </p>
                    <div className="d-flex gap-10 align-items-center grid">
                      <img
                        src="images/gr4.svg"
                        alt="grid"
                        onClick={() => setGrid(3)}
                        className="d-block img-fluid"
                      />
                      <img
                        src="images/gr3.svg"
                        alt="grid"
                        onClick={() => setGrid(4)}
                        className="d-block img-fluid"
                      />
                      <img
                        src="images/gr2.svg"
                        alt="grid"
                        onClick={() => setGrid(6)}
                        className="d-block img-fluid"
                      />

                      <img
                        src="images/gr.svg"
                        alt="grid"
                        onClick={() => setGrid(12)}
                        className="d-block img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list pb-5">
                <div className="d-flex gap-10 flex-wrap">
                  <ProductCard
                    data={productState ? productState : []}
                    grid={grid}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
