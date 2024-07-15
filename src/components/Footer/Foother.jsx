import './Foother.css'

import pedidos from '../../imgs/polanco/pedidos.jpg'
import mujer from '../../imgs/polanco/mujer.png'
import entregas from '../../imgs/polanco/entregas.png'
import banner from '../../imgs/polanco/6.png'
import nueve from '../../imgs/polanco/9.png'

const Foother = () => {
      return (
      <div className="foother">
        {/* Connect */}
        <section className="connect">
          <div className="connect-text">
            <span>Let's Talk</span>
            <h2>Contactanos Ahora</h2>
          </div>
          <div>
            <a className="btn-f btn">Contacto</a>
          </div>
        </section>
        {/* Service */}
        <section className="services" id="services">
          <div className="heading-foother">
            <span>Servicios</span>
            <h2>Brindamos los Mejores Servicios</h2>
          </div>
          <div className="services-container">
            {/* Box 1 */}
            <div className="s-box">
              <img className='mujer' src={pedidos} alt="banca" />
              <h3>Pedidos</h3>
            </div>
            {/* Box 2 */}
            <div className="s-box">
              <img className='mujer' src={mujer} alt="bsn" /* style={{height: '100px', }} *//>
              <h3>Vestidos</h3>
            </div>
            {/* Box 3 */}
            <div className="s-box">
              <img className='mujer' src={entregas} alt="entregas" />
              <h3>Entregas</h3>
            </div>
          </div>
        </section>
        <section className="banner">
          <img src={banner} alt="" />
        </section>
        {/* Contact */}
        <section className="contact" id="contact">
          <div className="contact-box">
            <h3>POLANCO</h3>
            <span>Redes Sociales</span>
            <div className="social">
              <li><a href='https://www.facebook.com/PolancoGuayaberas/photos' target='_blank' ><i className="bx bxl-facebook" />facebook</a></li>
              <li><a><i className="bx bxl-twitter" /></a></li>
              <li><a><i className="bx bxl-instagram" /></a></li>
            </div>
          </div> 
          <div className="contact-box">
            <h3>Menu</h3>
            <li><a>Inicio</a></li>
            <li><a>Nosotros</a></li>
            <li><a>Productos</a></li>
            <li><a>Servicios</a></li>
          </div> 
          <div className="contact-box">
            <h3>Links</h3>
            <li><a>Contacto</a></li>
            <li><a>Privacy Policy</a></li>
            <li><a>Disclaimer</a></li>
            <li><a>Terms Of Use</a></li>
          </div>
          <div className="contact-box address">
            <h3>Contacto</h3>
            <span>Gustavo Hodgers #18</span>
            <span>Colonia Modelo 83150</span>
            <span>Hermosillo, Sonora</span> 
            <span>+52 662 210 1514</span>
            <span>polancoguayaberas@hotmail.com</span>
          </div>
        </section>
        {/* Copyright */}
        <div className="copyright">
          <p>© All Right Reserved.</p>
        </div>
        <img className='nueve' src={nueve} alt="" />
      </div>
    );
  }


export default Foother
