//Hooks
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { getDocs, collection } from 'firebase/firestore'
//Components
import ItemList from '../ItemList/ItemList'
import Loader from '../../Loader/Loader';

//Firestore
import db from '../../../firebase/firebaseConfig';

//Particular CSS
import './ItemListContainer.css'


const ItemListContainer = () => {


    const {categoryId} = useParams();//Categoria definida en ruta para saber que productos filtrar

    const [items, setItems] = useState([]);
    localStorage.setItem('arrItems', JSON.stringify(items))

    useEffect(() => {

        let isMounted = true;

      /*   const db = getFirestore(); */
        const itemCollection = collection(db, "inventario");

        getDocs(itemCollection).then(( querySnapshot ) => {

            if(isMounted){

                if(querySnapshot.size === 0 ) {
                    console.log('No results!')
                }
    
                const documents = querySnapshot.docs.map( doc => ( {id: doc.id, ...doc.data()} ) )
                setItems( documents ) ;
                console.log(documents)
            }
        })
        .catch(err => {
            console.log('Error searching items', err );
        });

        return () => {
            isMounted = false; 
        };

    },[]);


        return(

            (items.length > 0) ?  

                    (categoryId !== undefined) ?
                        <div className="item-list-container">  
                            <ItemList items={ items.filter(product => product.category === `${categoryId}`) } />  
                        </div>
                    :    
                        <div className="item-list-container ">    
                            <ItemList items={items} />
                        </div>

            :(<Loader/>)

        )

}

export default ItemListContainer;
