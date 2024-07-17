import React from 'react';

//Components
import Item from '../Item/Item';

//Particular CSS
import './ItemList.css';

const ItemList = ({ items }) => {

    return (
        
        <div className="ItemList">
            { items.map( p =>
                <Item
                    key={p.id}
                    id={p.id} 
                    name={p.name} 
                    price={p.price} 
                    imgUrl={p.imgUrl}  
                    description={p.description}
                    talla={p.talla}
                    sucursal={p.sucursal}
                />)
            }
        </div>
    )
}

export default ItemList
