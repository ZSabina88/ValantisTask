import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";

const store = configureStore({
    reducer: {
        fetchProducts: productsSlice.reducer,

    }
});

export default store;