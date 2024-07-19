import React from 'react';

//Particular CSS
import './Item.css';

//Routing
import { Link } from 'react-router-dom';


const Item = ({ id, name, price, imgUrl, description, talla, sucursal, tela }) => {

    return (
        <Link to={`/polancoEcommerc/item/${id}`} >
            <div className="card-container">
                <div className="img-container">
                    <img src={imgUrl} alt=""/>
                </div>

                <div className="info-container">
                    
                    <p className='title truncate'>{name}</p>
                    <p className='description'>Sucursal {sucursal}</p>
                    <p className='description'>Tela {tela}</p>
                    <p className='price'>Talla {talla}</p>
                    <p className='price'>Precio ${price}</p>
                    
                </div>
            </div>
        </Link>
    )
}

export default Item
