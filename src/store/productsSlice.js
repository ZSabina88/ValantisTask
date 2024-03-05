import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";


const password = "Valantis";
const timestamp = new Date().toISOString().slice(0, 10).split('-').join('');
const auth = `${password}_${timestamp}`;
const authToString = CryptoJS.MD5(auth).toString();

export const getProducts = createAsyncThunk('products/getproducts',
    async function (_, { rejectWithValue }) {
        try {
            const url = 'http://api.valantis.store:40000/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth": authToString,
                },
                body: JSON.stringify({
                    action: 'get_ids',
                })
            });

            if (response.status === 400) {
                throw new Error("Bad request.");
            }
            if (response.status === 401) {
                throw new Error("Access denied. You are not authorised.");
            }
            if (!response.ok) {
                throw new Error("Something went wrong.");
            }

            const fetchData = await response.json();
            return fetchData;

        } catch (error) {
            console.log(error.status);
            return rejectWithValue(error.message);
        }
    }
);

// export const getProducts = createAsyncThunk('products/getproducts',
//     async function (_, { rejectWithValue }) {
//         try {
//             const url = 'http://api.valantis.store:40000/';
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-Auth": authToString,
//                 },
//                 body: JSON.stringify({
//                     action: 'get_items',
//                     params: { "ids": ["1789ecf3-f81c-4f49-ada2-83804dcc74b0"] }
//                     // params: { "ids": id }
//                 })
//             });

//             if (response.status === 400) {
//                 throw new Error("Bad request.");
//             }
//             if (response.status === 401) {
//                 throw new Error("Access denied. You are not authorised.");
//             }
//             if (!response.ok) {
//                 throw new Error("Something went wrong.");
//             }

//             const fetchData = await response.json();
//             return fetchData;

//         } catch (error) {
//             console.log(error.status);
//             return rejectWithValue(error.message);
//         }
//     }
// );



const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error: "",
    },
    extraReducers:
        (builder) => {
            builder.addCase(getProducts.pending, (state) => {
                state.loading = true;
            })

            builder.addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.products = action.payload;
            })

            builder.addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.products = [];
                state.product = [];
                state.error = action.error.message;
            })
        }

});

export default productsSlice;

// const productsPerPage = 100;
// const totalPages = Math.ceil(products.length / productsPerPage);