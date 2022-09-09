import { string } from "yup";

export const togglePassword = () => {
  const passwordEye = document.getElementById("togglePassword") as HTMLElement;
  const passordInput = document.getElementById("password") as HTMLInputElement;
  if (passordInput.type == "password") {
    passordInput.setAttribute("type", "text");
    passwordEye.classList.replace("fa-eye-slash", "fa-eye");
  } else if (passordInput.type == "text") {
    passordInput.setAttribute("type", "password");
    passwordEye.classList.replace("fa-eye", "fa-eye-slash");
  }
};

export interface loginFormData {
  email: string;
  password: string;
}

export interface LoginRes {
  success: string;
  user: {
    full_name: string;
    username: string;
    email: string;
    phone: string;
    btc_id: string;
    usdt_id: string;
    perfect_money_id: string;
    balance: string;
    deposit_balance: string;
    total_withdraw: string;
    last_login: string;
    date_joined: string;
    referral_balance: string;
    referral: string;
  };
  token: string;
}
export interface initUserState {
  user: {
    full_name: string;
    username: string;
    email: string;
    phone: string;
    btc_id: string;
    usdt_id: string;
    perfect_money_id: string;
    balance: string;
    deposit_balance: string;
    total_withdraw: string;
    last_login: string;
    date_joined: string;
    referral_balance: string;
    referral: string;
  };
  token: string;
  loading: boolean;
  error: unknown;
  isLoggedin: boolean;
  existingEmails: string[];
  existingUserName: string[];
}
export interface uSeR {
  full_name: string;
  username: string;
  email: string;
  phone: string;
  btc_id: string;
  usdt_id: string;
  perfect_money_id: string;
  balance: string;
  deposit_balance: string;
  total_withdraw: string;
  last_login: string;
  date_joined: string;
  referral_balance: string;
  referral: string;
}

export const initialUserState: uSeR = {
  full_name: "",
  username: "",
  email: "",
  phone: "",
  btc_id: "",
  usdt_id: "",
  perfect_money_id: "",
  balance: "",
  deposit_balance: "",
  total_withdraw: "",
  last_login: "",
  date_joined: "",
  referral_balance: "",
  referral: "",
};

export type ExUserData = {
  existingEmails: string[];
  existingUserName: string[];
};
