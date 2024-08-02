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

        const handleSucursalState=(sucursal)=>{
            setPaginationState(0)
            setSucursalState(sucursal)
        }



        const [paginationState, setPaginationState]=useState(0)
                                      
        console.log('paginationState:', paginationState, paginationState+8)





        let pages = []
                                      

        for (let i = 0; i <= Math.ceil(items.length/9); i++) {
                pages.push(i);
        }


        let b = items.sort((a, b) => b.duration - a.duration)
                                    .filter(product => product.sucursal === sucursalState)
                                    .slice(paginationState, paginationState+8)


        let pagesB = []
                       
                       console.log('b.length:', b.length)               

        for (let i = 0; i <= b.length/4; i++) {
                pagesB.push(i);
        }
       


        return(

            (items.length > 0) ? 



                    (categoryId !== undefined) ?

                        <>

                            <div className="btn-sucursal">
                                <button className={sucursalState === 'Hermosillo' ? 'Active' : 'no-Active'} onClick={()=>handleSucursalState('Hermosillo')}>Hermosillo</button>
                                <button className={sucursalState === 'San Carlos' ? 'Active' : 'no-Active'} onClick={()=>handleSucursalState('San Carlos')}>San Carlos</button>
                            </div>

                            <div className="item-list-container">  
                                <ItemList items={items.sort((a, b) => b.duration - a.duration)
                                    .filter(product => product.category === `${categoryId}`)
                                    .filter(product => product.sucursal === sucursalState)
                                    .slice(paginationState, paginationState+8)} />  
                            </div>



                            <div className="btn-pagination">

                                <button className={paginationState < 1 ? 'd-none': 'koko'}

                                        onClick={()=>{

                                            if(paginationState > 0){
                                                setPaginationState(paginationState - 8)
                                            }

                                        }}> ← ANTERIOR

                                </button>


                                {
                                        pages.map((page, index) => (
                                            <button
                                                key={index}
                                                className={items.length -7 < paginationState ? 'd-none' : 'siguiente'}
                                                onClick={()=>{setPaginationState(page*8)}}>
                                                {page}
                                            </button>
                                        ))
                                }

                                <button className={items.length -7 < paginationState ? 'd-none' : 'siguiente'}

                                        onClick={()=>{

                                            if(items.length -7 > paginationState){
                                                setPaginationState(paginationState + 8)
                                            }

                                        }}> SIGUIENTE → 

                                </button>

                            </div>



                        </>

                    :    
                         <>

                            <div className="btn-sucursal">
                                <button className={sucursalState === 'Hermosillo' ? 'Active' : 'no-Active'} onClick={()=>handleSucursalState('Hermosillo')}>Hermosillo</button>
                                <button className={sucursalState === 'San Carlos' ? 'Active' : 'no-Active'} onClick={()=>handleSucursalState('San Carlos')}>San Carlos</button>
                            </div>

                            <div className="item-list-container">    
                                <ItemList items={b} />
                            </div>




                            <div className="btn-pagination">

                                <button className={paginationState < 1 ? 'd-none': 'siguiente' }

                                        onClick={()=>{

                                            if(paginationState > 0){ 
                                                setPaginationState(paginationState - 8)
                                            }

                                        }}> ← ANTERIOR

                                </button>


                                {
                                        pagesB.map((page, index) => (

                                            <button
                                                key={index}
                                                className={b.length < 7  ? 'd-none' : 'siguiente'}
                                                onClick={()=>{setPaginationState(page*8)}}>
                                                {page}
                                            </button>
                                        ))
                                }

                                <button className={b.length < 7  ? 'd-none' : 'siguiente'}

                                        onClick={()=>{

                                            if(items.length -7 > paginationState){
                                                setPaginationState(paginationState + 8)
                                            }

                                        }}> SIGUIENTE → 

                                </button>

                            </div>




                        </>


            :(<Loader/>)

        )

}

export default ItemListContainer;