
import {useState} from 'react';


import './accesorios.css';



const Accesorios = () => {


        return(<>
        			<div className='accesorios'>
        				{
        					JSON.parse(localStorage.arrItems).map((el, i)=>{

        						if(el.name === 'Accesorio' || el.name === 'accesorio'){
        							return  <div key={i} className='accesorioItem'>
        										<img src={el.imgUrl} />
        										{/*<p>{el.name}</p>*/}
        										<p>{el.description}</p>
        										<p>{el.marca}</p>
        										<p>$ { el.price}</p>
        									</div>	
        						}
        						
        					})
        				}
        			</div>
        	</>)


};




export default Accesorios;












































