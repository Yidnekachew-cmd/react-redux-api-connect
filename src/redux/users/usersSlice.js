import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  error: '',
};

export const fetchUsers  = createAsyncThunk(
  'users/fetchUsers',
  async (ID, thunkAPI) => {
   try{
    const response = await fetch('https://randomuser.me/api/?results=4');
    return response.json();
   }catch(error){
    return thunkAPI.rejectWithValue(error);
   }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.results;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.error = "Error fetching users";});
  },
});
    
export default usersSlice.reducer;
