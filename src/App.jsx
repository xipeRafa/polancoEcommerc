
import {useEffect, useState} from 'react';

// Libreria de Materialize
import M from 'materialize-css';

//CSS core de Materialize
import 'materialize-css/dist/css/materialize.min.css';

//Componentes
import NavBar from  './components/NavBar/NavBar.jsx';
import ItemListContainer from './components/itemComponents/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/itemComponents/ItemDetailContainer/ItemDetailContainer.jsx';
import Cart from './components/Cart/Cart';
import BuyingForm from './components/BuyingForm/BuyingForm.jsx';
import MyOrders from './components/MyOrders/MyOrders.jsx';
import Heading from './components/Heading/Heading.jsx';
//import Accesorios from './components/Accesorios/Accesorios.jsx';

//Librerias
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//Context
import {CartProvider} from './context/cartContext';

//Router 
import {useLocation, Routes, Route, Navigate} from 'react-router-dom'

//Css particular
import './assets/styles/app.css'
import './assets/styles/colors.css'
import Foother from './components/Footer/Foother';


  

  


const App = () => {


    const { pathname } = useLocation();
  
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [pathname]);




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

    const toasti = () => {toast('Bienvenido a Polanco Guayaberas', {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })};
    toast.configure();


    return(
        <>
            <Heading /> 

            <CartProvider>

                <NavBar/>

                <Routes>
                    <Route path="/polancoEcommerc" element={<ItemListContainer />}/>
                    <Route path="/polancoEcommerc/categories/:categoryId" element={<ItemListContainer/>}/>
                    <Route path="/polancoEcommerc/item/:id" element={<ItemDetailContainer/>}/>

                    <Route path="/polancoEcommerc/cart" element={<Cart/>}/>
                    <Route path="/polancoEcommerc/order" element={<BuyingForm/>}/>
                    <Route path="/polancoEcommerc/my-orders" element={<MyOrders/>}/>

                    {/*<Route path="/polancoEcommerc/accesorios" element={<Accesorios />}/>*/}

                    <Route path="*"  element={<Navigate to="/polancoEcommerc" />}/> 
                </Routes>
                
            </CartProvider>

            <Foother />
        </>
    ) 

}

export default App;