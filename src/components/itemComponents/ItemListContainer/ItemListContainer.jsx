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
                //console.log(documents)
               
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

          const [paginationState, setPaginationState]=useState(0)

        const handleSucursalState=(sucursal)=>{
            setPaginationState(0)
            setSucursalState(sucursal)
        }



      
                                      





        // let pages = []
                                      

        // for (let i = 0; i <= Math.ceil(items.length/9); i++) {
        //         pages.push(i);
        // }

         let c = items.sort((a, b) => b.duration - a.duration)
                                    .filter(product => product.sucursal === sucursalState)


        let b = items.sort((a, b) => b.duration - a.duration)
                                    .filter(product => product.sucursal === sucursalState)
                                    .slice(paginationState, paginationState+8)



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
                                                window.scrollTo(0,250)
                                            }

                                        }}> ← ANTERIOR

                                </button>


                                
                                        
                                            <button
                                                className={paginationState < 9 ? 'd-none' : 'siguiente'}
                                                onClick={()=>{setPaginationState(0), window.scrollTo(0,250)}}>
                                                {0}
                                            </button>
                                        
                                

                                <button className={c.length < paginationState + 8  ? 'd-none' : 'siguiente'}

                                        onClick={()=>{

                                            if(items.length -7 > paginationState){
                                                setPaginationState(paginationState + 8)
                                                window.scrollTo(0,250)
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
                                                window.scrollTo(0,250)
                                            }

                                        }}> ← ANTERIOR

                                </button>


                               

                                            <button
                                                className={paginationState < 9 ? 'd-none' : 'siguiente'}
                                                onClick={()=>{setPaginationState(0), window.scrollTo(0,250)}}>
                                                {0}
                                            </button>
                               

                                <button className={c.length < paginationState + 8 ? 'd-none' : 'siguiente'}

                                        onClick={()=>{

                                            if(items.length -7 > paginationState){
                                                setPaginationState(paginationState + 8)
                                                window.scrollTo(0,250)
                                            }

                                        }}> SIGUIENTE → 

                                </button>

                            </div>




                        </>


            :(<Loader/>)

        )

}

export default ItemListContainer;