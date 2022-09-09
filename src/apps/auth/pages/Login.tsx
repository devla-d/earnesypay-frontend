import { useEffect } from "react";
import Logo from "../assets/images/logo.png";
import { changePage } from "../slicers/PagesSlicer";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import ForgotPassword from "../components/ForgotPassword";
import { togglePassword } from "../helper";
import { useFormik } from "formik";
import { LoginSchema } from "../../../services";
import { loginUser } from "../slicers/Userslicer";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);
  const isLoggin = useAppSelector((state) => state.user.isLoggedin);
  const navigate = useNavigate();

  // const loginUser =async (params:type) => {

  // }

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit(values, formikHelpers) {
        // console.log(values);
        dispatch(loginUser(values))
          .unwrap()
          .then(() => {
            navigate("/");
          })
          .catch((e) => console.log(e));
      },
    });

  useEffect(() => {
    dispatch(changePage("Login"));
    document.title = "Login in your account";

    return () => {};
  }, []);

  if (isLoggin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="form-container login">
        <form action="" onSubmit={handleSubmit}>
          <div className="dis-m">
            <a href="#">
              <img className="authlogo" src={Logo} alt="logo" />
            </a>
            <h2 className="font-weight-normal mb-5 mt-4">
              Login into
              <br />
              your
              <span>account</span>
            </h2>
          </div>
          {/* <!---row satrt--> */}
          <div className="row">
            <div className="col-md-12">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={
                    "form-control form-control-lg " +
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

            <div className="col-md-12">
              <div className="mb-3" id="passwordBox">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  style={{ paddingLeft: "31px" }}
                  type="password"
                  className={
                    "form-control form-control-lg " +
                    (errors.password && touched.password ? "is-invalid" : null)
                  }
                  id="password"
                  placeholder="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <i
                  onClick={() => togglePassword()}
                  style={{ marginTop: "-31px" }}
                  className="fas fa-eye-slash togglePassword"
                  id="togglePassword"
                ></i>
                {errors.password && touched ? (
                  <p className="invalid-feedback">{errors.password}</p>
                ) : null}
              </div>
            </div>
            <div className="col-md-12">
              <p className="text-right">
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  forgot Password ?
                </a>
              </p>
            </div>

            <div className="btm">
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary custom mt-3"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <i className="fa fa-spinner fa-spin fa-1x formLoader"></i>
                  ) : null}
                  sign In
                </button>
              </div>
            </div>
          </div>
          {/* <!--row end--> */}
        </form>
      </div>
      <ForgotPassword />
    </>
  );
};

export default Login;
