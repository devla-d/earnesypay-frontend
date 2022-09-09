import React, { useEffect } from "react";
import { getExistingdata } from "../apps/auth/slicers/Userslicer";
import { useAppDispatch } from "../hooks";

const useUserData = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getExistingdata(true));

    return () => {};
  }, []);
};

export default useUserData;
