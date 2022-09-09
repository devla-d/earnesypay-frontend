import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { reQuest } from "../../../services";
import {
  ExUserData,
  initialUserState,
  initUserState,
  loginFormData,
  LoginRes,
  uSeR,
} from "../helper";
const authtoken = sessionStorage.getItem("userToken") ? true : false;

const rUser = JSON.parse(sessionStorage.getItem("user") || "{}") as uSeR;
const seUser = sessionStorage.getItem("user") ? rUser : initialUserState;
const initialState: initUserState = {
  user: seUser,
  token: sessionStorage.getItem("userToken")
    ? sessionStorage.getItem("userToken")!.toString()
    : "",
  loading: false,
  error: "",
  isLoggedin: sessionStorage.getItem("userToken") ? true : false,
  existingEmails: [],
  existingUserName: [],
};

export const getExistingdata = createAsyncThunk(
  "user/getExistingdata",
  async (wk: boolean, { rejectWithValue }) => {
    try {
      const { data } = await reQuest.get<ExUserData>(
        "/available-user-details/"
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formdata: loginFormData, { rejectWithValue }) => {
    try {
      const res = await reQuest.post("/login/", formdata);
      if (res.data.success) {
        // console.log(res.data);
        return res.data;
      } else if (res.data.error) {
        toast.error(res.data.error);
        return rejectWithValue(res.data.error);
      }
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);

const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    upDateUser: (state, action: PayloadAction<uSeR>) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.error = "";
      state.isLoggedin = false;
      state.user = initialState.user;
      state.token = "";
      sessionStorage.removeItem("userToken");
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<LoginRes>) => {
        // console.log(action);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        // localStorage.setItem('userToken',state.token)
        state.isLoggedin = true;
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("userToken", state.token);
        state.error = "";
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.isLoggedin = false;
      state.error = action.payload;
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("userToken");
    });
    builder.addCase(
      getExistingdata.fulfilled,
      (state, action: PayloadAction<ExUserData>) => {
        state.existingEmails = action.payload.existingEmails;
        state.existingUserName = action.payload.existingUserName;
      }
    );
    builder.addCase(getExistingdata.rejected, (state, action) => {
      state.existingEmails = [];
      state.existingUserName = [];
    });
  },
});

export const { logout, upDateUser } = userSlicer.actions;
export default userSlicer.reducer;
