import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const storePoducts = createAsyncThunk('products/getStoreProducts', () => {
    return axios.get("https://fakestoreapi.com/products")
        .then(res => res.data)
})