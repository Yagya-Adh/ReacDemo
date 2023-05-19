import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {

    const { cart, totalAmount } = props;

    return (

        <div ref={ref} className="p-5">

            <div className="table-responsive bg-light">
                <table className="table table-border">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            cart ? cart.map((cartProduct, key) =>
                                <tr key={key}>

                                    <td>{cartProduct.id}</td>
                                    <td>{cartProduct.name}</td>
                                    <td>{cartProduct.price}</td>
                                    <td>{cartProduct.quantity}</td>
                                    <td>{cartProduct.totalamount}</td>

                                </tr>
                            ) : " "
                        }
                    </tbody>
                </table>
                <h2 className="px-2">Total Amount : ${totalAmount}</h2>
            </div>

        </div>
    );
});