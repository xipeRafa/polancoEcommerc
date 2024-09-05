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

 import {useLocation} from 'react-router-dom'




const ItemListContainer = () => {


    const { pathname } = useLocation();


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


        useEffect(() => {
            window.scrollTo(0,250);
        }, [paginationState]);


        useEffect(() => {
            setPaginationState(0)
        }, [pathname]);

      
                                      


        let cuantByPage = 20
       
        let pages = []
                           


        const [hmState, setHmState]=useState(true)
      

        let arrSucursal = items.sort((a, b) => b.duration - a.duration)
                    .filter(product => product.sucursal === sucursalState)
                    .filter(el => el.para === (hmState ? 'hombre' : 'mujer'))



        for (let i = 0; i <= Math.ceil(arrSucursal.length/cuantByPage); i++) {
                pages.push(i);
        }

        pages.shift()










        let pagesCategory = []
      

        let arrCategory = items.sort((a, b) => b.duration - a.duration)
                            .filter(product => product.sucursal === sucursalState)
                            .filter(product => product.category === `${categoryId}`)
                            .filter(el => el.para === (hmState ? 'hombre' : 'mujer'))



        for (let i = 0; i <= Math.ceil(arrCategory.length/cuantByPage); i++) {
                pagesCategory.push(i);
        }
        
        pagesCategory.shift()






        let b = items.sort((a, b) => b.duration - a.duration)
                                    .filter(product => product.sucursal === sucursalState)
                                    .filter(el => el.para === (hmState ? 'hombre' : 'mujer'))
                                    .slice(paginationState, paginationState+cuantByPage)
                                    


        localStorage.setItem('cuantByPage', JSON.stringify(pages))
        localStorage.setItem('cuantByPageCategory', JSON.stringify(pagesCategory))

console.log(b)

        return(

            (items.length > 0) ? 



                    (categoryId !== undefined) ?

                        <>

                            <div className="btn-sucursal">
                                <button className={sucursalState === 'Hermosillo' ? 'Active' : 'no-Active'} onClick={()=>handleSucursalState('Hermosillo')}>Hermosillo</button>
                                <button className={sucursalState === 'San Carlos' ? 'Active' : 'no-Active'} onClick={()=>handleSucursalState('San Carlos')}>San Carlos</button>
                                <button onClick={()=>setHmState(!hmState)}>{(hmState ? 'hombre' : 'mujer').toUpperCase()}</button>
                            </div>

                            <div className="item-list-container">  
                                <ItemList items={items.sort((a, b) => b.duration - a.duration)
                                    .filter(product => product.category === `${categoryId}`)
                                    .filter(product => product.sucursal === sucursalState)
                                    .filter(el => el.para === (hmState ? 'hombre' : 'mujer'))
                                    .slice(paginationState, paginationState+cuantByPage)} />  
                            </div>



                            <div className="btn-pagination">

                                <button className={paginationState < 1 ? 'd-none': 'koko'}

                                        onClick={()=>{

                                                setPaginationState(paginationState - cuantByPage)

                                        }}> ← ANTERIOR

                                </button>


                                
                                        
                                          
                                        {JSON.parse(localStorage.cuantByPageCategory).map((el, i)=>{
                                           
                                              return <button key={i}
                                                className={paginationState < cuantByPage + cuantByPage ? 'd-none' : 'siguiente'}
                                                onClick={()=>{setPaginationState(el * cuantByPage - cuantByPage)}}>
                                                    {el}
                                                </button>  
                                            
                                            
                                           
                                        })}
                                        
                                

                                <button className={arrCategory.length === cuantByPage || arrCategory.length < paginationState + cuantByPage  ? 'd-none' : 'siguiente'}

                                        onClick={()=>{

                                                setPaginationState(paginationState + cuantByPage)

                                        }}> SIGUIENTE → 

                                </button>

                            </div>



                        </>

                    :    
                         <>  

                            <div className="btn-sucursal">
                                <button className={sucursalState === 'Hermosillo' ? 'Active' : 'no-Active'} onClick={()=>handleSucursalState('Hermosillo')}>Hermosillo</button>
                                <button className={sucursalState === 'San Carlos' ? 'Active' : 'no-Active'} onClick={()=>handleSucursalState('San Carlos')}>San Carlos</button>
                                <button onClick={()=>setHmState(!hmState)}>{(hmState ? 'hombre' : 'mujer').toUpperCase()}</button>
                            </div>



                            <div className="item-list-container">    
                                <ItemList items={b} />
                            </div>




                            <div className="btn-pagination">

                                <button className={paginationState < 1 ? 'd-none': 'siguiente' }

                                        onClick={()=>{

                                                setPaginationState(paginationState - cuantByPage)

                                        }}> ← ANTERIOR

                                </button>



                                        {JSON.parse(localStorage.cuantByPage).map((el, i)=>{
                                           
                                              return <button key={i}
                                                className={paginationState < cuantByPage + cuantByPage ? 'd-none' : 'siguiente'}
                                                onClick={()=>{setPaginationState(el * cuantByPage - cuantByPage)}}>
                                                    {el}
                                                </button>  
                                            
                                            
                                           
                                        })}
                               

                                           
                               

                                <button className={arrSucursal.length === cuantByPage || arrSucursal.length < paginationState + cuantByPage ? 'd-none' : 'siguiente'}

                                        onClick={()=>{

                                                setPaginationState(paginationState + cuantByPage)

                                        }}> SIGUIENTE → 

                                </button>

                            </div>




                        </>


            :(<Loader/>)

        )

}

export default ItemListContainer;