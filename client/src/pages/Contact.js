import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";
import {
  AiFillHome,
  AiFillInfoCircle,
  AiFillMail,
  AiFillPhone,
} from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createAEnquiry } from "../features/contact/contactSlice";

const EnquirySchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  mobile: Yup.string()
    .required("Mobile No is Required")
    .min(10, "Mobile number must be at least 10 characters")
    .max(10, "Mobile number must be at most 10 characters"),
  email: Yup.string()
    .required("Email is Required")
    .email("Email is not in proper format"),
  comment: Yup.string().required("Comment is Required"),
});

export const Contact = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      comment: "",
    },
    validationSchema: EnquirySchema,
    onSubmit: (values) => {
      dispatch(createAEnquiry(values));
      // alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                title="Main Branch"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15350.240179827835!2d74.48713274479965!3d15.879704157089966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf615152d0995d%3A0x424673f49b5d852e!2sAmbedkar%20Bhavan%2C%20Ambedkar%20Nagar%2C%20Sadashiv%20Nagar%2C%20Belagavi%2C%20Karnataka%20590019!5e0!3m2!1sen!2sin!4v1705088755130!5m2!1sen!2sin"
                width={600}
                height={450}
                className="border-0 w-100"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">Contact</h3>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex flex-column gap-15"
                  >
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                      <div className="error">
                        {formik.errors.name && formik.touched.name ? (
                          <div>{formik.errors.name}</div>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      <div className="error">
                        {formik.errors.email && formik.touched.email ? (
                          <div>{formik.errors.email}</div>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        className="form-control"
                        name="mobile"
                        onChange={formik.handleChange}
                        value={formik.values.mobile}
                      />
                      <div className="error">
                        {formik.errors.mobile && formik.touched.mobile ? (
                          <div>{formik.errors.mobile}</div>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <textarea
                        type="text"
                        className="w-100 form-control"
                        cols={30}
                        rows={4}
                        placeholder="Comment"
                        name="comment"
                        onChange={formik.handleChange}
                        value={formik.values.comment}
                      />
                      <div className="error">
                        {formik.errors.comment && formik.touched.comment ? (
                          <div>{formik.errors.comment}</div>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <button type="submit" className="button border-0  ">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title mb-4">Get in Touch With Us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-2 d-flex  gap-15 align-items-center">
                        <AiFillHome className="fs-5" />
                        <address className="mb-0">
                          Ambedkar Nagar, Sadashiv Nagar, Belagavi, Karnataka
                          590019
                        </address>
                      </li>
                      <li className="mb-2 d-flex gap-15 align-items-center">
                        <AiFillPhone className="fs-5" />
                        <a href="tel:+91 8310374677">+91 8310374677</a>
                      </li>
                      <li className="mb-2 d-flex gap-15 align-items-center">
                        <AiFillMail className="fs-5" />
                        <a href="mailto:kudchivrushab@gmail.com">
                          kudchivrushab@gmail.com
                        </a>
                      </li>
                      <li className="mb-2 d-flex gap-15 align-items-center">
                        <AiFillInfoCircle className="fs-5" />
                        <p className="mb-0">Monday - Friday - 10 AM - 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
