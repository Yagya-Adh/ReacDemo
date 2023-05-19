import React, { useEffect, useState, useRef } from "react";
import MainLayout from "../Layouts/MainLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { ComponentToPrint } from "../components/ComponentToPrint";

import { useReactToPrint } from "react-to-print";

const POSPage = () => {
    const toastOptions = {
        position: "top-left",
        autoClose: 400,
        pauseOnHover: true,
        draggable: true,
    };

    const [products, setProducts] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const fetcProducts = async () => {
        setIsLoading(true);
        const result = await axios.get("products");
        setProducts(await result.data);
        setIsLoading(false);
    };

    const addProductCart = async (product) => {
        // console.log(product);
        //check if we can add adding is exists
        let findProducctInCart = await cart.find((i) => {
            return i.id === product.id;
        });

        if (findProducctInCart) {
            let newCart = [];
            let newItem;

            cart.forEach((cartItem) => {
                if (cartItem.id === product.id) {
                    newItem = {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity + 1),
                    };
                    newCart.push(newItem);
                } else {
                    newCart.push(cartItem);
                }
            });

            setCart(newCart);
            toast.success(`Added ${newItem.name} to cart`, toastOptions);
        } else {
            let addingproduct = {
                ...product,
                quantity: 1,
                totalAmount: product.price,
            };

            setCart([...cart, addingproduct]);
            toast.success(`Added ${product.name} to cart`, toastOptions);
        }
    };

    const removeProduct = async (product) => {
        const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
        setCart(newCart);
    };

    const componentRef = useRef();

    const handleReactToPrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handlePrint = () => {
        handleReactToPrint();
    };

    useEffect(() => {
        fetcProducts();
    }, []);

    useEffect(() => {
        let newTotalAmount = 0;
        cart.forEach((icart) => {
            newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
        });
        setTotalAmount(newTotalAmount);
    }, [cart]);

    return (
        <div>
            <MainLayout>
                POS content
                <div className="row">
                    <div className="col-lg-8">
                        {isloading ? (
                            "Loading"
                        ) : (
                            <div className="row">
                                {products.map((product, key) => (
                                    <div key={key} className="col-lg-4 mb-4">
                                        <div
                                            className="pos-item px-3 text-center border"
                                            onClick={() => addProductCart(product)}
                                        >
                                            <p>{product.name}</p>
                                            <img
                                                src={product.image}
                                                className="img-fluid"
                                                alt={product.name}
                                            />
                                            <p>${product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="col-lg-4">
                        <div style={{ display: "none" }}>
                            <ComponentToPrint
                                cart={cart}
                                totalAmount={totalAmount}
                                ref={componentRef}
                            />
                        </div>

                        <div className="table-responsive bg-dark">
                            <table className="table table-responsive table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cart
                                        ? cart.map((cartProduct, key) => (
                                            <tr key={key}>
                                                <td>{cartProduct.id}</td>
                                                <td>{cartProduct.name}</td>
                                                <td>{cartProduct.price}</td>
                                                <td>{cartProduct.quantity}</td>
                                                <td>{cartProduct.totalAmount}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => removeProduct(cartProduct)}
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                        : "No item in Cart"}
                                </tbody>
                            </table>
                            <h2 className="px-2 text-white">Total Amount : ${totalAmount}</h2>
                        </div>

                        <div className="mt-3">
                            {totalAmount !== 0 ? (
                                <div>
                                    <button onClick={handlePrint} className="btn btn-primary">
                                        PAy Now
                                    </button>
                                </div>
                            ) : (
                                "Please add a product to the cart"
                            )}
                        </div>
                    </div>
                </div>
            </MainLayout>
        </div>
    );
};

export default POSPage;
