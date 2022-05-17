import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import allUsersService from "./usersService";

const initialState = {
  allUsers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: " ",
};

export const getAllUsers = createAsyncThunk(
  "users/getAll",
  async (_, thunkAPI) => {
    try {
      return await allUsersService.getAllUsers();
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = allUsersSlice.actions;
export default allUsersSlice.reducer;
