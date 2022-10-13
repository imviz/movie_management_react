import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from './LoginService'



const user = JSON.parse(localStorage.getItem('user'))

//Login user

export const login = createAsyncThunk('auth/login',
async(data, thunkAPI)=>{
    try{
        console.log(data,'iii');
        return await authService.login(data)
    }catch(error){
        const message = 
        (error.response && 
            error.response.data &&
            error.response.data.detail) || 
            error.message || 
            error.toString()
        console.log(error.response.data.detail)
        return thunkAPI.rejectWithValue(message)    
   
    }
  }
)



const loginSlice=createSlice({
    name:'auth',
    initialState:{
        user: user ? user : null,
        loading:false,
        error:''
    },
    reducers:{
        reset :(state) =>{
            state.loading = false
   
            state.error= false
            state.message = ''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state,action)=>{
            state.loading=true
        
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
            state.error=''            
        
        })
        .addCase(login.rejected,(state,action)=>{
            state.error=action.payload
        
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user=''
        })
    }

});


export const logout = createAsyncThunk('auth/logout',
async () =>{
    await authService.logout()
}
)

export const {reset} = loginSlice.actions
export default loginSlice.reducer;