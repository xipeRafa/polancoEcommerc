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

        const [sucursalState, setSucursalState]=useState('Hermosillo')


console.log(categoryId)

        return(

            (items.length > 0) ? 



                    (categoryId !== undefined) ?

                        <>
                            <div className="btn-sucursal">
                                <button className={sucursalState === 'Hermosillo' ? 'Active' : 'no-Active'} onClick={()=>setSucursalState('Hermosillo')}>Hermosillo</button>
                                <button className={sucursalState === 'San Carlos' ? 'Active' : 'no-Active'} onClick={()=>setSucursalState('San Carlos')}>San Carlos</button>
                            </div>
                            <div className="item-list-container">  
                                <ItemList items={ items.sort((a, b) => b.duration - a.duration)
                                    .filter(product => product.category === `${categoryId}`)
                                    .filter(product => product.sucursal === sucursalState) } />  
                            </div>
                        </>

                    :    
                         <>
                            <div className="btn-sucursal">
                                <button className={sucursalState === 'Hermosillo' ? 'Active' : 'no-Active'} onClick={()=>setSucursalState('Hermosillo')}>Hermosillo</button>
                                <button className={sucursalState === 'San Carlos' ? 'Active' : 'no-Active'} onClick={()=>setSucursalState('San Carlos')}>San Carlos</button>
                            </div>
                            <div className="item-list-container">    
                                <ItemList items={items.filter(product => product.sucursal === sucursalState)} />
                            </div>
                        </>


            :(<Loader/>)

        )

}

export default ItemListContainer;