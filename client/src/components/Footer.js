import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsLetter from "../images/newsletter.png";

export const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsLetter} alt="NewsLetter Logo" />
                <h2 className="text-white mb-0">Sign Up for News Letters</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email"
                  aria-label="Your Email"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Address: 599/2, T.S. Nagar Hunchanhatti Road Macche <br />
                  Belagavi <br />
                  590014
                </address>
                <a href="tel:+918310374677" className="mt-1 text-white">
                  8310374677
                </a>
                <a
                  href="mailto:kudchivrushab@gmail.com"
                  className="mt-1 d-block mb-2 text-white mb-0"
                >
                  kudchivrushab@gmail.com
                </a>
                <div className="social-icons d-flex align-items-center gap-30 mt-4 mb-4">
                  <a href="/">
                    <BsLinkedin className="text-white fs-4" />
                  </a>
                  <a href="/">
                    <BsGithub className="text-white fs-4" />
                  </a>
                  <a href="/">
                    <BsYoutube className="text-white fs-4" />
                  </a>
                  <a href="/">
                    <BsInstagram className="text-white fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-4">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-links d-flex flex-column">
                <Link to={"/privacy-policy"} className="text-white py-2 mb-1">
                  Privacy Policy
                </Link>
                <Link to={"/refund-policy"} className="text-white py-2 mb-1">
                  Refund Policy
                </Link>
                <Link to={"/shipping-policy"} className="text-white py-2 mb-1">
                  Shipping Policy
                </Link>
                <Link to={"/terms-conditions"} className="text-white py-2 mb-1">
                  Terms & Condition
                </Link>
                <Link to={"/blogs"} className="text-white py-2 mb-1">
                  Blogs
                </Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">About us</Link>
                <Link className="text-white py-2 mb-1">Faq</Link>
                <Link className="text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Laptops</Link>
                <Link className="text-white py-2 mb-1">Headphone</Link>
                <Link className="text-white py-2 mb-1">Tablets</Link>
                <Link className="text-white py-2 mb-1">Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Powered by Dev
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
