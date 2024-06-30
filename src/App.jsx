
import React, { useEffect, useState} from 'react';

// Libreria de Materialize
import M from 'materialize-css';

//CSS core de Materialize
import 'materialize-css/dist/css/materialize.min.css';
import { useLocation } from "react-router-dom";

//Componentes
import NavBar from  './components/NavBar/NavBar.jsx';
import ItemListContainer from './components/itemComponents/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemComponents/ItemDetailContainer/ItemDetailContainer.jsx';
import Cart from './components/Cart/Cart';
import BuyingForm from './components/BuyingForm/BuyingForm.jsx';
import MyOrders from './components/MyOrders/MyOrders.jsx';
import Heading from './components/Heading/Heading.jsx';

//Librerias
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//Context
import {CartProvider} from './context/cartContext';

//Router 
import {  Routes,  Route } from 'react-router-dom';

//Css particular
import './assets/styles/app.css'
import './assets/styles/colors.css'
import Foother from './components/Footer/Foother';

function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [pathname]);
  
    return null;
  }


const App = () => {

    //State para controlar el toastify de bienvenida, una vez que entra el usuario no se mostrara si recarga la pagina
    const [ justEntered, setJustEntered ] = useState(localStorage.getItem('justEntered'));

    //Inicializo funcionalidades de materialize
    useEffect(() => {
        M.AutoInit();
    }, []);
    //Invoco el toast de bienvenida solo si es la primera vez que entra a la pagina
    useEffect(() => {

        if( justEntered === null ){

            toasti();
            localStorage.setItem('justEntered', true);
            setJustEntered(false);
        }

    }, [justEntered]);

    const toasti = () => {toast('Bienvenido a nexGym', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })};
/*     toast.configure(); */


    return(
        <>
            <ScrollToTop />
            <Heading /> 
            <CartProvider>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<ItemListContainer/>}/>
                    <Route path="/categories/:categoryId" element={<ItemListContainer/>}/>
                    <Route path="/item/:id" element={<ItemDetailContainer/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/order" element={<BuyingForm/>}/>
                    <Route path="/my-orders" element={<MyOrders/>}/>
                </Routes>
            </CartProvider>
            <Foother />
            </>
    ) 

}

export default App;