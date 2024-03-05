import classes from "./ProductItem.module.css";
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
// import CryptoJS from "crypto-js";

// const password = "Valantis";
// const timestamp = new Date().toISOString().slice(0, 10).split('-').join('');
// const auth = `${password}_${timestamp}`;
// const authToString = CryptoJS.MD5(auth).toString();

export default function ProductItem() {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    const navigation = useNavigation();
    const { id } = useParams();


    const isSubmitting = navigation.state === "submitting";

    function cancelHandler() {
        navigate('/products');
    }

    // useEffect(() => {
    //     async function productFetch(id) {
    //         const url = 'http://api.valantis.store:40000/';
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "X-Auth": authToString,
    //             },
    //             body: JSON.stringify({
    //                 action: 'get_items',
    //                 params: {'ids': id}
    //             })
    //         });
    //         const products = await response.json();
    //         const productId = products.find((item) => String(item.id) === id);
    //         setProduct(productId);
    //     }
    //     productFetch();
    // }, []);


    return (
        <article className={classes.product}>
            <h1>{product.brand}</h1>
            <p>{product.id}</p>
            <p>{product.price}</p>
            <p>{product.product}</p>
            <menu className={classes.actions}>
                <button type='button' onClick={cancelHandler} disabled={isSubmitting}>
                    Cancel
                </button>
                <button disabled={isSubmitting}>
                    {isSubmitting ? "Submitting" : "Add to cart"}
                </button>
            </menu>
        </article>
    );
}
