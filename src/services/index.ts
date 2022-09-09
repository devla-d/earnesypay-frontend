import axios from "axios";
import * as yup from "yup";

var token = sessionStorage.getItem("userToken")
  ? sessionStorage.getItem("userToken")
  : null;

export const reQuest = axios.create({
  baseURL: "https://earneasymoney.net/",
  headers: {
    Authorization: token ? `Token ${token}` : false,
  },
});

// const fetchExData =  () => {
//   // try {
//   //   const res = await reQuest.get("/available-user-details/");
//   //   return res;
//   // } catch (e) {
//   //   console.log(e);
//   // }
//   reQuest.get("/available-user-details/").then(res=>res.data)
// };
// const data = await fetchExData();
// console.log(data);

// const activeEmail: string[] = data?.data.existingEmails;
// const activeUsername = data?.data.existingUserName;
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;
//

export const RegisterSchema = (
  activeEmail: string[],
  activeUsername: string[]
) => {
  return yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .notOneOf(activeEmail, "Email is already taken")
      .required("Email is required"),
    full_name: yup
      .string()

      .required("Fullname is required"),
    phone: yup.string().required("Phone is required"),
    referral: yup
      .string()
      .notRequired()
      .oneOf(activeUsername, "Invalid referral code"),
    perfect_money_id: yup.string().notRequired(),
    btc_id: yup.string().notRequired(),
    usdt_id: yup.string().notRequired(),
    password: yup.string().min(8).max(12).required("Password is required"),
  });
};

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().min(6).max(12).required("Password is Required"),
});

// .matches(
//   passwordRules,
//   "Require at least one numeric digit and a special character."
// )
