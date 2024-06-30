import React, { useEffect, useState} from 'react'

//Components
import ItemDetail from '../ItemDetail/ItemDetail';
import Loader from '../../Loader/Loader';
import NotExists from '../../NotExists/NotExists';

//Hooks
import {useParams} from 'react-router-dom';

//Firestore
import  /* getFirestore */ db from '../../../firebase/firebaseConfig';

import { getDocs, collection } from 'firebase/firestore'

const ItemDetailContainer = () => {

    const [item, setItem ] = useState();
    console.log('====>>>>',item)
    const [loading, setLoading ] = useState(true);

    const {id} = useParams();//Utilizo el id de la ruta actual para saber que componente buscar y mostrar su detalle





    useEffect(() => {

        const itemCollection = collection(db, "items");

        getDocs(itemCollection).then(( querySnapshot ) => {
           /*   if(!querySnapshot.docs.exists){
                setItem("not exist")
                return;
            }  */

    
                const documents = querySnapshot.docs.map( doc => ( {id: doc.id, ...doc.data()} ) )
                setItem( documents.find(el=>el.id===id) ) ;
        })
        .catch(err => {
            console.log('Error searching items', err );
        }) .finally(()=> {
            setLoading(false)
        })

    },[id]);



    if(loading) {

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
