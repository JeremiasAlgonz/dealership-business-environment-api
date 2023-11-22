import 'materialize-css/dist/css/materialize.min.css';
import { Link } from "react-router-dom";
import './style.css';

function Home() {
    return (
        <div className="container">
            <h2>Jeremias A. Gonçalez</h2>
            <p>Este modelo consulta uma API-REST desenvolvida em NodeJS com os conhecimentos adquiridos durante o bimestre.</p>
            <Link to='/concessionarias' className="waves-effect grey darken-4 btn">Atalho - Concessionarias</Link>
            <Link to='/clientes' className="waves-effect grey darken-4 btn">Atalho - Clientes</Link>
            <Link to='/motocicletas' className="waves-effect grey darken-4 btn">Atalho - Motos</Link>

        </div>
    );
}
export default Home;