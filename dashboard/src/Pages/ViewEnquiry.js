import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAEnquiry, resetState, updateEnquiry } from "../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";

export default function ViewEnquiry() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const enquiryState = useSelector((state) => state.enquiry.enquiryData);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(getAEnquiry(id));
  }, [dispatch, id]);

  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, status: e };
    dispatch(updateEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAEnquiry(id));
    }, 100);
  };
  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-4 title">View Enquiry</h3>
          <button
            className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
            onClick={goBack}
          >
            <BiArrowBack className="fs-5" /> Go Back
          </button>
        </div>
        <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0">Name:</h6>
            <p className="mb-0">{enquiryState?.name}</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0">Mobile:</h6>
            <p className="mb-0">
              <a href={`tel:+91${enquiryState?.mobile}`}>
                {enquiryState?.mobile}
              </a>
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0">Email:</h6>
            <p className="mb-0">
              <a href={`mailto:{enqEmail}`}>{enquiryState?.email}</a>
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0">Comment:</h6>
            <p className="mb-0">{enquiryState?.comment}</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0">Status:</h6>
            <p className="mb-0">{enquiryState?.status}</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0">Change Status:</h6>
            <div>
              <select
                name=""
                defaultValue={
                  enquiryState?.status ? enquiryState?.status : "Submitted"
                }
                className="form-control form-select"
                id=""
                onChange={(e) => setEnquiryStatus(e.target.value, id)}
              >
                <option value="Submitted">Submitted</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
