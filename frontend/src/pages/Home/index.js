import 'materialize-css/dist/css/materialize.min.css';
import { Link } from "react-router-dom";
import './style.css';

import logo from '../../resource/logo512.png';

function Home() {
    return (
        <>
        <div className="container">
            <div className="showArea">
                <img width="25%" src={logo} />
                <h3>Sistema de Gerenciamento</h3>
            </div>
            <h6>Concessionarias - Motocicletas - Clientes</h6>

        </div>
         <footer class="page-footer">
         <div class="container">
           <div class="row">
             <div class="col l6 s12">
               <h5 class="white-text">Jeremias A. Goncalez</h5>
               <p class="grey-text text-lighten-4">Este modelo consulta uma API-REST desenvolvida em NodeJS com os conhecimentos adquiridos durante o bimestre.</p>
             </div>
             <div class="col l4 offset-l2 s12">
               <h5 class="white-text">Links</h5>
               <ul>
                 <li><a class="grey-text text-lighten-3" href="https://github.com/Jeremiasgoncalez">Meu perfil no Github</a></li>
                 <li><a class="grey-text text-lighten-3" href="https://github.com/jeremiasgoncalez/dealership-business-environment-api">Repositorio do Projeto</a></li>
                 <li><a class="grey-text text-lighten-3" href="https://instagram.com/jeremiasgoncalez">Meu instagram</a></li>
                 <li><a class="grey-text text-lighten-3" href="https://www.linkedin.com/in/jeremias-goncalez/">Me encontre no Linked!n</a></li>
               </ul>
             </div>
           </div>
         </div>
         <div class="footer-copyright">
           <div class="container">
           © 2023 copyright
           <p className="grey-text text-lighten-4 right">FATEC PRAIA GRANDE</p>
           </div>
         </div>
       </footer>
       </>
    );
}
export default Home;