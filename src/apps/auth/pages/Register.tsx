import { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import { changePage } from "../slicers/PagesSlicer";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { RegisterSchema, reQuest } from "../../../services";
import { FormikHelpers, FormikValues, useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { togglePassword } from "../helper";
import useUserData from "../../../hook/useUserData";

interface formValue {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  referral: string;
  perfect_money_id: string;
  btc_id: string;
  usdt_id: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useUserData();

  const existingEmails = useAppSelector((state) => state.user.existingEmails);
  const [loading, setLoading] = useState(false);
  const existingUserName = useAppSelector(
    (state) => state.user.existingUserName
  );

  // console.log(existingEmails, existingUserName);

  const registerUser = async (
    formData: FormikValues,
    action: FormikHelpers<formValue>
  ) => {
    await reQuest
      .post("/register/", formData)
      .then((res) => {
        if (res.data.success) {
          action.resetForm();
          toast.success("Registration successfull please login");
          navigate("/login");
        } else {
          setLoading(false);
          toast.error("Error");
          console.log(res.data);
        }
      })
      .catch((errors) => console.log(errors));
  };
  const regSchema = RegisterSchema(existingEmails, existingUserName);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        full_name: "",
        email: "",
        phone: "",
        password: "",
        referral: "",
        perfect_money_id: "",
        btc_id: "",
        usdt_id: "",
      },
      validationSchema: regSchema,
      onSubmit(values, formikHelpers) {
        setLoading(true);
        registerUser(values, formikHelpers);
        // console.log(formikHelpers);
      },
    });

  useEffect(() => {
    dispatch(changePage("Register"));
    document.title = "Create an  account";

    return () => {};
  }, []);

  return (
    <>
      <div className="form-container">
        <div className="dis-m">
          <a href="#">
            <img className="authlogo" src={Logo} alt="logo" />
          </a>
          <h2 className="font-weight-normal mb-5 mt-4">
            Create new
            <br />
            <span>account</span> with us
          </h2>
        </div>
        <form action="" onSubmit={handleSubmit}>
          {/* <!---row satrt--> */}
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="full_name" className="form-label">
                  Full name
                </label>
                <input
                  type="text"
                  className={
                    "form-control " +
                    (errors.full_name && touched.full_name
                      ? "is-invalid"
                      : null)
                  }
                  id="full_name"
                  placeholder="full name"
                  value={values.full_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.full_name && touched.full_name ? (
                  <p className="invalid-feedback">{errors.full_name}</p>
                ) : null}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={
                    "form-control " +
                    (errors.email && touched.email ? "is-invalid" : null)
                  }
                  id="email"
                  placeholder="name@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="invalid-feedback">{errors.email}</p>
                ) : null}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className={
                    "form-control " +
                    (errors.phone && touched.phone ? "is-invalid" : null)
                  }
                  id="phone"
                  placeholder="name@example.com"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {errors.phone && touched.phone ? (
                  <p className="invalid-feedback">{errors.phone}</p>
                ) : null}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3" id="passwordBox">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={
                    "form-control " +
                    (errors.password && touched.password ? "is-invalid" : null)
                  }
                  id="password"
                  placeholder="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <i
                  className="fas fa-eye-slash togglePassword"
                  id="togglePassword"
                  onClick={() => togglePassword()}
                ></i>
                {errors.password && touched.password ? (
                  <p className="invalid-feedback">{errors.password}</p>
                ) : null}
              </div>
            </div>

            <div className="col-md-12">
              <div className="mb-3 row">
                <label htmlFor="refcode" className="col-sm-2 col-form-label">
                  Ref Code
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className={
                      "form-control " +
                      (errors.referral && touched.referral
                        ? "is-invalid"
                        : null)
                    }
                    id="referral"
                    placeholder="Referral code(optional)"
                    value={values.referral}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.referral && touched.referral ? (
                    <p className="invalid-feedback">{errors.referral}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <h4 className="text-default">Payment methods</h4>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="perfect_money_id" className="form-label">
                  Perfect Money
                </label>
                <input
                  type="text"
                  className={
                    "form-control " +
                    (errors.perfect_money_id ? "is-invalid" : null)
                  }
                  id="perfect_money_id"
                  placeholder="Perfect Money"
                  value={values.perfect_money_id}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="btc-address" className="form-label">
                  Bitcoin address
                </label>
                <input
                  type="text"
                  className={
                    "form-control " + (errors.btc_id ? "is-invalid" : null)
                  }
                  id="btc_id"
                  placeholder="Bitcoin address"
                  value={values.btc_id}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="mb-3 row">
                <label
                  htmlFor="usdt-address"
                  className="col-sm-4 col-form-label"
                >
                  USDT address
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className={
                      "form-control " + (errors.usdt_id ? "is-invalid" : null)
                    }
                    id="usdt_id"
                    placeholder="USDT address"
                    value={values.usdt_id}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary custom mt-3"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <i className="fa fa-spinner fa-spin fa-1x formLoader"></i>
                  ) : null}
                  sign Up
                </button>
              </div>
            </div>
          </div>
          {/* <!--row end--> */}
        </form>
      </div>
    </>
  );
};

export default Register;
