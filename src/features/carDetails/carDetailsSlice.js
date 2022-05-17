import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import carDetailsService from "../carDetails/carDetailsService";

const initialState = {
  carDetails: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getOneCarById = createAsyncThunk(
  "cars/getOneCar",
  async (carId, thunkAPI) => {
    try {
      return await carDetailsService.getOneCarById(carId);
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const carDetailsSlice = createSlice({
  name: "carDetails",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneCarById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.carDetails = action.payload;
      })
      .addCase(getOneCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = carDetailsSlice.actions;
export default carDetailsSlice.reducer;
