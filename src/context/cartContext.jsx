import React, { useState, createContext, useEffect } from "react";

export const CartContext = createContext({});

export const CartProvider = (props) => {


  const itemsInLocal = () => {
    if (localStorage.getItem("cart") !== null) {
      return JSON.parse(localStorage.getItem("cart"));
    } else {
      return [];
    }
  };

  const itemsInLocal2 = () => {
    if (localStorage.getItem("lastOrder") !== null) {
      return JSON.parse(localStorage.getItem("lastOrder"));
    } else {
      return [];
    }
  };


  const ordersInLocal = () => {
    if (localStorage.getItem("my-orders-Ids") !== null) {
      return JSON.parse(localStorage.getItem("my-orders-Ids"));
    } else {
      return [];
    }
  };

 



  const [cart, setCart] = useState(itemsInLocal);
  const [items, setItems] = useState(0);
  const [total, setTotal] = useState(0);
  const [orderIds, setOrderIds] = useState(ordersInLocal);

  const[stateLastOrderInLS,setStateLastOrderInLS]=useState(itemsInLocal2)


  
  const orderF=(order)=>{
      if (localStorage.getItem("lastOrder") !== null) {
        setStateLastOrderInLS([...stateLastOrderInLS, order])
        console.log('true')
      } else {
        setStateLastOrderInLS([])
        console.log('false')
      }
  }

  console.log(stateLastOrderInLS)


  useEffect(() => {
    updateItems();
    localStorage.setItem("my-orders-Ids", JSON.stringify(orderIds));
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("lastOrder", JSON.stringify(stateLastOrderInLS));
    getTotal();    
  });



  

  const addToCart = (obj) => {
    // Primero busco si ya existe dentro del array del state Cart un objeto que tenga
    // el mismo nombre que el que quiero agregar al carrito, si no existe ahi si lo agrego.
    const duplicate = cart.find((product) => product.item === obj.item);

    if (duplicate !== undefined) {
      const indexOfDuplicate = cart.findIndex(
        (product) => product.item === obj.item
      );

      cart.splice(indexOfDuplicate, 1, {
        item: obj.item,
        quantity: obj.quantity + duplicate.quantity,
        price: obj.price,
        img: obj.img,
        id: obj.id,
        stock: obj.stock,
        perisur: obj.perisur,
        quiroga: obj.quiroga,
        navojoa: obj.navojoa,
        cseri: obj.cseri,
        progreso: obj.progreso,
      });
    } else {
      setCart([
        ...cart,
        {
          item: obj.item,
          quantity: obj.quantity,
          price: obj.price,
          img: obj.img,
          id: obj.id,
          stock: obj.stock,
          perisur: obj.perisur,
          quiroga: obj.quiroga,
          navojoa: obj.navojoa,
          cseri: obj.cseri,
          progreso: obj.progreso,
        }
      ]);
    }
   // localStorage.setItem("cart", JSON.stringify(cart));
  };

  const isInCart = (itemName) => {
    const isIn = cart.find((product) => product.item === itemName);

    return isIn;
  };

  const updateItems = () => {
    let total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setItems(total);
  };

  const getTotal = () => {
    const sumalize = cart.reduce(
      (acc, prod) => acc + prod.price * prod.quantity,
      0
    );
    setTotal(sumalize);
  };

  const deleteItem = (itemName) => {
    const editedItems = cart.filter((product) => product.item !== itemName);
    setCart(editedItems);
    localStorage.setItem("cart", JSON.stringify(editedItems));
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        isInCart,
        setCart,
        cart,
        items,
        updateItems,
        total,
        deleteItem,
        orderIds,
        setOrderIds,
        itemsInLocal,
        ordersInLocal,
        stateLastOrderInLS,
        setStateLastOrderInLS,
        orderF
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
