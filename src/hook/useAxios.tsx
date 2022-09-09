import axios from "axios";
import React from "react";
import { useAppSelector } from "../hooks";

const useAxios = () => {
  const token = useAppSelector((state) => state.user.token);
  //   console.log(token);

  const authRequest = axios.create({
    baseURL: "https://earneasymoney.net/",
    headers: {
      Authorization: token ? `Token ${token}` : false,
    },
  });

  return [authRequest];
};

export default useAxios;
