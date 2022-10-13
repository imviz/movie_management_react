import {configureStore} from '@reduxjs/toolkit'
import authreducer from '../Features/LoginSlice';

const store=configureStore({
    reducer:{
       'auth':authreducer,
    }
})
export default store;