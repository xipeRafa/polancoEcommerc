import React,{useContext,useState, useEffect} from 'react';


//Librerias
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//Components
import NotExists from '../NotExists/NotExists';

//Firestore
/* import { getFirestore } from '../../firebase/firebaseConfig'; */
import db from '../../firebase/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore'

//Context
import {CartContext} from '../../context/cartContext';


//Hook-Form
import { useForm } from 'react-hook-form';

//Css particular
import './BuyingForm.css';
//CSS core de Materialize
import 'materialize-css/dist/css/materialize.min.css';

import { useNavigate } from "react-router-dom";



const BuyingForm = () => {

    const { cart, setCart, total, orderIds, setOrderIds, itemsInLocal,stateLastOrderInLS,
      setStateLastOrderInLS, orderF } = useContext(CartContext);


    const { register, handleSubmit, watch, errors } = useForm();

    const email = watch("email");
    const confirmEmail = watch("confirmEmail");


    const [passErr, setPassErr] = useState(false);
 
    const [ error, setError ] = useState(false);
    
    const [loading, setLoading] = useState(false);


    const[noDeliver, setNoDeliver]=useState(false)

 

    useEffect(() =>{
        if (cart.length !== 0){
            motivationNotif()
        } 
          
    }, [cart]);



    const navigate = useNavigate();

    /* ===================================== selects ======================= */

   

    const [selectCity, setSelectCity] = useState('');

    const handleSelectCity = (e) => {
      setSelectCity(e.target.value);
    }

    const motivationNotif = () => {toast('Estas a solo un paso!!  Completa los datos por favor', {
        position: "bottom-left",
        autoClose: 7500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })};
    const purchaseNotif = () => {toast('Compra Realizada con exito!! ', {
        position: "bottom-left",
        autoClose: 7500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })};
    toast.configure();
    
    //Funcion para actualizr los stocks en firestore de los productos recien comprados
  /*   const updateStocks = () => {

        cart.forEach( item => {
            bache.update(itemCollection.doc(item.id),{stock: item.stock - item.quantity})
            if(selectState !== ''){
                bache.update(itemCollection.doc(item.id),{[selectState]: item[selectState] - item.quantity})
            }  
        })
        console.log(cart)

        bache
        .commit()
        .then(()=> {
            console.log("Bache ok")
        })
        .catch(e => console.log(e))

    } */

    const handleOrder = (data)=> { //==========================================================//
console.log(data)
        if (data) {

            const order = 
            {
                buyer: {
                    name:  data.name,
                    phone: data.telephone,
                    email: data.email,
                    adress: data.adress
                },
                items: cart.map(item => ({
                    id: item.id,
                    item: item.item,
                    price: item.price,
                    qty: item.quantity,
                    cseri:item.cseri,
                    quiroga:item.quiroga,
                    perisur:item.perisur,
                    progreso:item.progreso,
                    navojoa:item.navojoa,
                    stock:item.stock
                })),
                date: String(new Date()),
                total: total,
                entregado: false,
                deliver:'',
                noDeliver:noDeliver,
                city:selectCity,
               /*  sucursal:selectState, */
                taken:false
            }


            orderF(order)

      
         
         
          

           localStorage.setItem('cart','[]');
          }

          
    
          /*   const db = getFirestore(); */
            const itemCollection = collection(db, "orders");
    
            getDocs(itemCollection).then(( querySnapshot ) => {
    
             /*    if(isMounted){
    
                    if(querySnapshot.size === 0 ) {
                        console.log('No results!')
                    } */
        
                    const documents = querySnapshot.docs.map( doc => ( {id: doc.id, ...doc.data()} ) )
                    console.log(documents)
                  /*   setItems( documents ) ; */
               /*  } */
            })
            .catch(err => {
                console.log('Error searching items', err );
            });
    

            
            navigate('/polancoEcommerc/my-orders')
           

            setCart([])

           
    

 /*
            setLoading(true);
            
                 updateStocks(); 
                purchaseNotif();
         */
    };


    return (

        cart.length === 0  && loading === false ? (

            <NotExists title={"Sigue mirando nuestro productos!!"}/>
        ): (
            
                <div className="buy-form-container">

                <form onSubmit={handleSubmit(handleOrder)} className="form-container" >

                    <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <input 
                            name="name" 
                            id="name" 
                            type="text" 
                            className="validate" 
                            autoComplete="none" 
                            ref={register({
                                required: "Ingresar nombre", minLength: {value:2, message:"Minimo 2 caracteres"}, maxLength: {value:60, message:"Maximo 60 caracteres"}
                            })}
                            />
                        <label htmlFor="name">Nombre</label>
                        { errors.name && <small>{ errors.name.message }</small> }
                    </div>

               {/*      <div className="input-field">
                        <i className="material-icons prefix">directions</i>
                        <input 
                            name="adress" 
                            id="adress" 
                            type="text" 
                            className="validate" 
                            autoComplete="none" 
                            ref={register({
                                required: "Ingresar direccion", minLength: {value:3, message:"Minimo 3 caracteres"}, maxLength: {value:60, message:"Maximo 60 caracteres"}
                            })}
                        />
                        <label htmlFor="adress">Direccion</label>
                        { errors.lastname && <small>{ errors.lastname.message }</small> }
                    </div> */}

                    <div className='input-field'>
                        <i className="material-icons prefix">directions</i>
                        <select className="browser-default city" onChange={handleSelectCity} value={selectCity}>
                            <option value="" disabled >Elija su Ciudad</option>
                            <option value="hermosillo">Hermosillo</option>
                            <option value="san carlos">San Carlos</option>
                        </select>
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">phone</i>
                        <input 
                            name="telephone" 
                            id="telephone" 
                            type="tel" 
                            className="validate"
                            autoComplete="none" 
                            ref={register({
                                required: "Ingrese su numero", pattern: {
                                    value: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/, message:"Ingrese un numero valido"
                                } 
                            })}
                        />
                        <label htmlFor="telephone">Telefono/Celular</label>
                        { errors.telephone && <small>{ errors.telephone.message }</small> }
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <input 
                            name="email" 
                            id="email" 
                            type="email" 
                            className="validate" 
                            autoComplete="none"
                            ref={register({
                                required: "Ingrese un email", pattern:{ 
                                    value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ , message: "Ingrese un email valido"
                                } 
                            })} 
                        />
                        <label htmlFor="email">Email</label>
                        { errors.email && <small>{ errors.email.message }</small> }
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <input 
                            name="confirmEmail" 
                            id="confirmEmail" 
                            type="email" 
                            className="validate" 
                            autoComplete="none"
                            ref={register({
                                required: "Ingrese un email", pattern:{ 
                                    value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ , message: "Ingrese un email valido"
                                } 
                            })} 
                            onBlur = { ()=> confirmEmail !== email ? setPassErr(true) : setPassErr(false)}
                            onChange = { ()=> confirmEmail === email && setPassErr(false) }
                        />
                        <label htmlFor="confirmEmail">Confirmar Email</label>
                        { passErr && <small>{ "Sus emails son diferentes"}</small> }
                    </div>

                    {/* Unica forma de que los autocomplete "none" funcionen fue agregando autoComplete = "none" a todos los inputs
                    y crear un ultimo input innecesario (display: none) con autoComplete='on' */}

                    <div className="input-field" style={{display: 'none'}}>
                        <i className="material-icons prefix">email</i>
                        <input id="asd" type="email" className="validate" autoComplete="on"/>
                        <label htmlFor="asd">Email</label>
                    </div>

                    {/* Fin de input innecesario :D */}

                 

                    <h5 className="total-amount">
                        Subtotal &nbsp; ${ total }
                    </h5>
                    <span></span>
                    {error && <p>{error}</p>}

                    {
                        loading ? (
                            <button className="waves-effect btn btn-getOrder ">
                                <div className="loop">
                                    <i className="material-icons">loop</i>
                                </div>
                            </button>
                        ) : (
                            <button disabled={ confirmEmail !== email } type="submit" 
                                    className= "waves-effect btn btn-buy ">
                                { passErr ? <small>{ "Sus emails son diferentes"}</small> : 'finalizar compra' }
                            </button>
                        )
                    }

                </form>
               
            </div>
        )


    )
}

export default BuyingForm