import React from 'react'
import form from '../../imgs/polanco/form.png'
import './BuyingForm.css'


const BuyingForm = () => {

   

  return (<>

 {/*   {  JSON.parse(localStorage.getItem('cart')).map((el,i)=>(
        <p>{el.id}</p>
    ))}  */}
<div className='container'>
        <img className='imgForm' src={form} alt="formulario" />
        </div>


    </>
  )
}

export default BuyingForm