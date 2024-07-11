import React from 'react';

//Css particular
import './CartItem.css'

const CartItem = ({name, quantity, price, imgUrl , deleteItem }) => {

    return (
        <>
            <div className="cart-item ">
                <i onClick={ ()=> deleteItem(name) } className="material-icons delete-item item" >cancel</i>
                <div  className="item-img item" style={{backgroundImage: `url(${imgUrl})`}}>
                </div>
                <div className="item-name item">
                    {name}
                </div>
                <div className="item-quantity item">
                    {quantity}
                </div>
                <div className="item-value item">
                    $ {price}
                </div>
                <div className="item-totalValue item">
                    $ {Number(quantity) * Number(price)}
                </div> 
            </div>
            <hr/> 
        </>
    )
}

export default CartItem
