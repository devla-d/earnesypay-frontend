import React from "react";
import { uSeR, initialUserState } from "../../auth/helper";

export const changeMobileNavicon = (e: React.MouseEvent) => {
  e.preventDefault();

  var mobilenavToggler = document.getElementById(
    "mobilenavToggler"
  ) as HTMLElement;
  var mobileNav = document.getElementById("mobile-nav") as HTMLDivElement;
  var is_active = document
    .getElementById("mobile-nav")
    ?.classList.contains("active");

  if (is_active === false) {
    mobilenavToggler.classList.replace("fa-bars", "fa-angle-down");
    mobileNav.classList.add("active");
    is_active = true;
  } else {
    mobilenavToggler.classList.replace("fa-angle-down", "fa-bars");
    mobileNav.classList.remove("active");
    is_active = false;
  }
};

export const closeNavOnClick = () => {
  // const navLinks = document.querySelectorAll("#mobNavmenu li a");
  var mobilenavToggler = document.getElementById(
    "mobilenavToggler"
  ) as HTMLElement;
  var mobileNav = document.getElementById("mobile-nav") as HTMLDivElement;
  var is_active = document
    .getElementById("mobile-nav")
    ?.classList.contains("active");

  if (is_active === false) {
    mobilenavToggler.classList.replace("fa-bars", "fa-angle-down");
    mobileNav.classList.add("active");
    is_active = true;
  } else {
    mobilenavToggler.classList.replace("fa-angle-down", "fa-bars");
    mobileNav.classList.remove("active");
    is_active = false;
  }

  // navLinks.forEach((el) => {
  //   el.addEventListener("click", () => {
  //     mobileNav.classList.remove("active");
  //   });
  // });
  // console.log(navLinks);
};

export const FULL_DASH_ARRAY = 283;
export const WARNING_THRESHOLD = 10;
export const ALERT_THRESHOLD = 5;

export const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

export const formatTime = (time: number) => {
  var days = Math.floor(time / (1000 * 60 * 60 * 24));
  var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((time % (1000 * 60)) / 1000);

  return `${days}d:${hours}h:${minutes}m:${seconds}s`;
};

export const setRemainingPathColor = (timeLeft: number) => {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      ?.classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      ?.classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      ?.classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      ?.classList.add(warning.color);
  }
};

export type PackageResponse = {
  id: number;
  hours: number;
  name: string;
  percent: number;
  min_amount: number;
  max_amount: number;
  ref_percent: number;
};

export const initpackageS: PackageResponse = {
  id: 0,
  hours: 0,
  name: "",
  percent: 0,
  min_amount: 0,
  max_amount: 0,
  ref_percent: 0,
};

export type investmentType = {
  id: number;
  user: uSeR;
  package: PackageResponse;
  amount_invested: number;
  date: Date;
  end_date: Date;
  start_date: Date;
  status: string;
  amount_earn: number;
};

export const initInvestment: investmentType = {
  id: 0,
  user: initialUserState,
  package: initpackageS,
  amount_invested: 0,
  date: new Date(),
  end_date: new Date(),
  start_date: new Date(),
  status: "inactive",
  amount_earn: 0,
};
export type InvestmentResponse = {
  investment: investmentType;
};

export type endInvestmentResponse = {
  msg: string;
  investment: InvestmentResponse;
};
export type createInvestmentResponse = {
  msg: string;
  investment: investmentType;
  error: string;
};

export type WithdrawResponse = {
  msg: string;
  user: uSeR;
  error: string;
};

export type BankType = {
  /**
   * Describe the bank module data type
   */
  id: number;
  acc_name: string;
  acc_num: string;
  ty_pe: string;
};

export type TransactionsType = {
  /**
   * Describe the Transactin module data type
   */
  id: number;
  user: uSeR;
  amount: number;
  date: string;
  approved_date: string;
  status: string;
  mode: string;
  paymethod: string;
  ref: string;
  bank_details: BankType | null;
};

export const initBank: BankType = {
  id: 0,
  acc_name: "",
  acc_num: "",
  ty_pe: "",
};

export const initTransaction: TransactionsType = {
  id: 0,
  user: initialUserState,
  amount: 0,
  date: "",
  approved_date: "",
  status: "",
  mode: "",
  paymethod: "",
  ref: "",
  bank_details: null,
};

export type LogHistoryType = {
  id: number;
  user: uSeR;
  ip_add: string;
  date: string;
  device: string;
};
