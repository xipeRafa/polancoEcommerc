import React from 'react';

//Particular CSS
import './Item.css';

//Routing
import { Link } from 'react-router-dom';


const Item = ({ id, name, price, pictureUrl, description }) => {

    return (
        <Link to={`/item/${id}`} >
            <div className="card-container">
                <div className="img-container">
                    <img src={pictureUrl[0]} alt=""/>
                </div>

                <div className="info-container">
                    
                    <p className='title truncate'>{name}</p>
                    <p className='description'>{description.slice(0, 19)}</p>
                    <p className='price'>${price}</p>
                </div>
            </div>
        </Link>
    )
}

export default Item
