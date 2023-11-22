import { Link } from 'react-router-dom';
import React from 'react';

function NotFound() {
    return (
        <div className="container">
            <img className="circle responsive-img small" src="https://assets.hostinger.com/lang/pt-br/images/404-3a53e76ef1.png"></img>
            <h2>#404: Página não encontrada</h2>
            <p>A página que você está procurando não existe.</p>
            <br />
            <Link to={"/" }>Voltar a página inicial</Link>
        </div>
    );
}

export default NotFound;
