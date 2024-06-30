import React from 'react';

//Components
import CartWidget from "../CartWidget/CartWidget";

//Particular Css
import './NavBar.css';
import logo from '../../imgs/polanco/0.png'
//Routing
import {NavLink} from 'react-router-dom'


const NavBar = () => {

    return (
        <>  
            <nav id='nav'>
                <div className="nav-wrapper">
                    {/* El atributo exact hace que el router busque exactamente la ruta / y no todas las q empiezen con / */}
                    <NavLink to="/polancoEcommerc" className="brand-logo" >
                        <img src={logo} alt="NextGym" />
                    </NavLink>
                    <a data-target="mobile-demo" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <NavLink to="/polancoEcommerc" className="navlink inicio"> INICIO </NavLink>
                        </li>
                        <li>
                            <NavLink to="/polancoEcommerc/categories/suplementos" className="navlink">BLANCAS</NavLink>
                        </li>
                        <li>
                            <NavLink to="/polancoEcommerc/categories/articulos" className="navlink"> DE COLOR </NavLink>
                        </li>
                        <li>
                            <NavLink to="/polancoEcommerc/my-orders" className="navlink " > PEDIDOS </NavLink>
                        </li>
                    </ul>
                    {/* Icono de carrito de compras */}
                    <CartWidget />
                </div>
            </nav>
            {/* Mismo menu pero cuando esta colapsado para mobile */}
            <ul className="sidenav sidenav-close" id="mobile-demo" >
                <li>
                    <NavLink to="/polancoEcommerc" className="navlink">INICIO</NavLink>
                </li>
                <li>
                    <NavLink to="/polancoEcommerc/categories/suplementos" className="navlink"> BLANCAS </NavLink>
                </li>
                <li>
                    <NavLink to="/polancoEcommerc/categories/articulos" className="navlink"> DE COLOR </NavLink>
                </li>
                <li>
                    <NavLink to="/polancoEcommerc/my-orders" className="navlink" > PEDIDOS </NavLink>
                </li>
            </ul>
        </>
    )
};

export default NavBar;
