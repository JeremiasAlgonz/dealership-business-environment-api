import { Link } from "react-router-dom";
import './style.css';

function Menu() {
    return (
        <>
            <nav className="nav-extended">
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">TP-2BI Tópicos Especiais</a>
                </div>
                <div className="nav-content">
                    <ul className="tabs tabs-transparent">
                        <li className="tab selected"><Link to="/">Início</Link></li>
                        <li className="tab selected"><Link to="/concessionarias">Concessionarias</Link></li>
                        <li className="tab selected"><Link to="/motocicletas">Motocicletas</Link></li>
                        <li className="tab selected"><Link to="/clientes">Clientes</Link></li>
                        {/*}<li className="tab"><Link to="/computador">CRUD</Link></li>{*/}
                    </ul>
                </div>
            </nav>

        </>
    )
}
export default Menu;