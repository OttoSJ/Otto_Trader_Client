import carService from './carService'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  cars: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createCar = createAsyncThunk(
  'cars/create',
  async (carData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      console.log(carData)
      return await carService.createCar(carData, token)
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateCarDetails = createAsyncThunk(
  'cars/update',
  async (carData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      console.log(carData)
      return await carService.updateCarDetails(carData, token)
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getCars = createAsyncThunk('cars/getAll', async (_, thunkAPI) => {
  try {
    return await carService.getCars()
  } catch (error) {
    const message =
      (error.response && error.reponse.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteCar = createAsyncThunk(
  'cars/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token

      return await carService.deleteCar(id, token)
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cars.push(action.payload)
      })
      .addCase(createCar.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCars.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cars = action.payload
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateCarDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCarDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cars = action.payload
      })
      .addCase(updateCarDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cars = state.cars.filter((car) => car._id !== action.payload.id)
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = carSlice.actions
export default carSlice.reducer
