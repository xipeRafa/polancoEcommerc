
import './Heading.css'
import logo from '../../imgs/polanco/7.png'
const Heading = () => {
      return (
           
                  <div className="heading">
                        <p>Diseño y Moda</p>
                        <h2>El Outfit Perfecto esta en</h2>
                        <div className='imgContainer'>
                        <img className='polanco' src={logo} alt="polanco" />

                        </div>
                  </div>
          
      )
}

export default Heading
