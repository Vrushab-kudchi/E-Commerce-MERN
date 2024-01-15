import { BreadCrumb } from "../components/BreadCrumb";
import { Meta } from "../components/Meta";

export const TermAndContition = () => {
  return (
    <>
      <Meta title="Terms And Conditions" />
      <BreadCrumb title="Terms And Conditions" />
      <div className="policy-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
