import React, { useState } from 'react';

//Particular CSS
import './ItemDetail.css';

//Components
import ItemCount from '../ItemCount/ItemCount';
import FinishBuying from '../../FinishBuying/FinishBuying';
import TechInfo from '../../TechnInfo/TechInfo';


const ItemDetail = ({item}) => {


    const [ bigImg, setBigImg ] = useState('');
    const [ isAdded, setIsAdded ] = useState(false);


    return (
        <div className="item-detail">
            <div className="container-one">
                <div className="img-counter-container">
                    <div className="small-images-big-image-container">
                        <div className="small-images">
                            <div className="sm-img" 
                                style={{ 
                                    backgroundImage: `url(${item.imgUrl})` 
                                }}
                                onMouseOver={ () => setBigImg({backgroundImage: `url(${item.imgUrl })`})}
                            >
                            </div>
                            <div className="sm-img" 
                                style={{
                                    backgroundImage: `url(${ item.imgUrl[1] !== undefined ? item.imgUrl[1] : item.imgUrl[0] })` 
                                }}
                                onMouseOver={ () => setBigImg({backgroundImage: `url(${item.imgUrl[1] !== undefined ? item.imgUrl[1] : item.imgUrl[0] })`})}
                            >
                            </div>
                            <div className="sm-img" 
                                style={{
                                    backgroundImage: `url(${item.imgUrl[2] !== undefined ? item.imgUrl[2] : item.imgUrl[0] })`,
                                }}
                                onMouseOver={ () =>{
                                    setBigImg({backgroundImage: `url(${item.imgUrl[2] !== undefined ? item.imgUrl[2] : item.imgUrl[0] })`});
                                }}
                            >
                            </div>
                        </div>
                        <div className="big-image" 
                            style={bigImg !== '' ? bigImg : { backgroundImage: `url(${item?.imgUrl})`} }
                            >      
                        </div>
                    </div>
                     <ItemCount isAdded={isAdded} setIsAdded={setIsAdded} initial={1} stock={Number(item.stockHermosillo) + Number(item.stockSanCarlos)} item={item} /> 
                    {
                        isAdded 
                            && 
                        <FinishBuying/>
                    } 
                </div>
            </div>
            <div className="container-two">
                <div className="title-price">
 
                    <h4 className="item-name">{item.name}</h4>
                    <h4>${item.price}</h4>
                    <p>STOCK Hermosillo: {item.stockHermosillo}</p>
                    <p>STOCK San Carlos: {item.stockSanCarlos}</p>
                    <small>COD: { item.id}</small>
                    <h6>Description: {item.description}</h6>
                </div>
                {/* Solo renderizo el detalle tecnico si es que existe
                    Algunos productos no cuentan con detalle tecnico pero si con una descripción */}
                {
                    item.details !== undefined && <TechInfo item={item} />
                }
                
            </div>
        </div>
    ) 
        


}

export default ItemDetail
