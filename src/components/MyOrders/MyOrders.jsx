import React,{useContext} from 'react';

//Luxon
/* import { DateTime } from 'luxon'; */


import {CartContext} from '../../context/cartContext';

//Css particular
import './MyOrders.css';


const MyOrders = () => {

    const { stateLastOrderInLS, /* setStateLastOrderInLS  */} = useContext(CartContext);

    
  
        return (
               
        

                    
            <div className="orders-container">
                <div className="orders-organizer">
                    <h3 className="title">Mis Compras{' '}
    
                  {/*   <button 
                        className="waves-effect waves-light btn d-none"
                        onClick={()=> {
                         localStorage.setItem("lastOrder", '[]');
                         setStateLastOrderInLS([])
                        }}>
                        Borrar
                    </button>  */}
                    </h3>
                    <div className="orders-columns">
                        <p>Fecha</p>
                        <p>Productos</p>
                        <p>Correo</p>
                        <p>Total</p>
                    </div>
                    <div className="orders">

                   {
                     (stateLastOrderInLS).length === 0  ? <p> .- No hay pedidos</p>:
                        <div>
                            {  
                                stateLastOrderInLS.map(el =>(
                                    <div className="order-row" key={el.buyer.email}>
                                        <div className="order-info date" >
                                            {el.date.slice(0,16)}
                                                              
                                        </div>
                                        <div className="order-info items">
                                            <ul>
                                            {
                                                el.items && 
                                                el.items.map(item => <li className="truncate" key={item.id}> {item.quantity} x {item.name} </li> )
                                            }
                                            </ul>
                                        </div>
                                        <div className="order-info id "> { el.buyer.email } </div>
                                        <div className="order-info total"> ${ el.total } </div>
                                    </div> 
                                )) 
                            }    
                        </div>
                    }
                     
                    </div>
                </div>
            </div>
        
        )
    }



export default MyOrders

