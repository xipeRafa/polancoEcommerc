import React, { useContext, useState, useEffect, useCallback } from 'react'

//Context
import { CartContext } from '../../../context/cartContext';
//Librerias
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//Particular CSS
import './ItemCount.css'

const ItemCount = ({ setIsAdded, initial, stock, item }) => {



    const { addToCart, isInCart, updateItems } = useContext(CartContext);

    // En caso que no haya stock cambio el valor inicial por "Sin stock"
    if (stock === 0) { initial = "Sin stock" }

    const [counter, setCounter] = useState(initial);
    const [isIn, setIsIn] = useState();// State que controla si el producto ya esta añadido al cart

    // State que controla la suma de los items ya agregados al cart y los items que se quieren volver a sumar =>
    // no superen el stock del item.
    const [limitToBuy, setLimitToBuy] = useState();

    const removeItem = () => setCounter(counter - 1);
    const addItem = () => setCounter(counter + 1);

    const toasti = () => {
        toast(`${counter} ${counter > 1 ? 'Productos Agregados' : 'Producto Agregado'} al Carrito `, {
            position: "top-left",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
        })
    };

    const isItemAlreadyInCart = useCallback(() => isInCart(item.name), [isInCart, item.name]);


    const limitQtyToBuy = useCallback(() => {

        const qty = isItemAlreadyInCart();

        if ((qty?.quantity + counter) === item.stock) {
            setLimitToBuy(true)
        } else {
            setLimitToBuy(false)
        }

    }, [counter, isItemAlreadyInCart, item.stock])


    useEffect(() => {

        setIsIn(isItemAlreadyInCart);
        limitQtyToBuy();

    }, [isItemAlreadyInCart, limitQtyToBuy])


    return (
        <>
            <div className="item-counter">

                <div className="counter-container" disabled={item?.stockSanCarlos < 1 || item?.stockHermosillo < 1 ? true : false}>

                    <button onClick={removeItem}
                            className="waves-effect waves-light btn counter-btn" 
                            disabled={counter <= initial}><p>-</p>
                    </button>

                    <p className="counter-value " onChange={isItemAlreadyInCart} >
                        {
                            (isIn !== undefined && isIn?.quantity === isIn?.stock) 
                                ? "No hay mas stock"
                                : counter
                        }
                    </p>
                    <button onClick={addItem} 
                            className="waves-effect waves-light btn counter-btn"
                            disabled={item?.stockSanCarlos <= counter || item?.stockHermosillo <= counter ? true : false}>
                        <p>+</p>
                    </button>

                </div>

                <button
                    onClick={() => {
                        item.quantity = counter
                        addToCart(item);
                        setCounter(initial);
                        setIsAdded(true);
                        updateItems();
                        toasti();
                    }}
                    className="waves-effect btn"
                    disabled={item?.stockSanCarlos < 1 || item?.stockHermosillo < 1 ? true : false} //Deshabilito la opcion de comprar mas si es que ya se llego al limite de stock 
                >
                    {
                        isIn !== undefined ? `Agregar ${counter} más` : item?.stockSanCarlos < 1 || item?.stockHermosillo < 1 ? 'Articulo Agotado' : 'Agregar al carrito'
                    }

                </button>

            </div>
        </>
    )
}


export default ItemCount
