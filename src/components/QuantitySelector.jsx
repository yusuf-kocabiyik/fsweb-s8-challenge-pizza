import { useState } from "react";

export default function QuantitySelector({quantity,increaseQuantity,decreaseQuantity}){

    
    return(
        <div className="quantity-selector">

            <button type="button" onClick={decreaseQuantity}>-</button>
            <span className="quantity-value">{quantity}</span>
            <button type="button" onClick={increaseQuantity}>+</button>
        </div>

    );
}