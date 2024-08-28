import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungService } from "../services/nguoiDung";

export const getValueUserApi = createAsyncThunk(
  "nguoiDung/getValueUserApi",
  async (_, ThunkApi) => {
    const res = await nguoiDungService.getAllUsers();
    //thứ tự chạy sẽ là chạy chờ rồi nếu thành công thì xuất cái dưới, còn thất bại thì vào rejected ở dưới extraReducer
    console.log(res);
    return res.data.content;
  }
);
const initialState = {
  listUsers: [],
};

const nguoiDungSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getValueUserApi.fulfilled, (state, action) => {
        console.log(action);
        state.listUsers = action.payload;
      })
      .addCase(getValueUserApi.pending, (state, action) => {
        console.log("toi dang cho xu ly");
      })
      .addCase(getValueUserApi.rejected, (state, action) => {
        console.log("toi dang bi loi");
      });
  },
});

export const {} = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
