import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../../api-services/userService";


const userSlide = createSlice({
    name: "user",
    initialState: {
        isLoading: true, 
        data: null,
        isError: false,
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchUsers.pending, (state, action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading =false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) =>{
            console.log("ERR", action.payload);
            state.isError = true;
        });
    },
});

export default userSlide.reducer;