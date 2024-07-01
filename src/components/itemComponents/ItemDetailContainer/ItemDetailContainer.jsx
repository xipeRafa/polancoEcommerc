import React, { useEffect, useState} from 'react'

//Components
import ItemDetail from '../ItemDetail/ItemDetail';
import Loader from '../../Loader/Loader';
import NotExists from '../../NotExists/NotExists';

//Hooks
import {useParams} from 'react-router-dom';


const ItemDetailContainer = () => {

    const [item, setItem ] = useState();


    const {id} = useParams();//Utilizo el id de la ruta actual para saber que componente buscar y mostrar su detalle

    useEffect(() => {
        const obj = JSON.parse(localStorage.getItem('arrItems')).find(el => el.id === id)
        setItem(obj)
    },[id]);


    if(!item) {

        return (
            <Loader/>
        )
    } else if(item === "not exist"){
        return(
            <NotExists title={"Ooops!!! La página o producto que estas buscando no existe."}/>
        )
    } else { 
        return(
            <ItemDetail item={item} /> 
        )
    } 
    
}

export default ItemDetailContainer;
