import axios from 'axios';
import {useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import './style.css';

function Store()
{
    // Para apresentar ao usuáro o resultado da operação
    const [status,setStatus] = useState('');
    // Para armazenar dados digitados pelo usuário
    const marca = useRef("");
    const preco = useRef("");
    // Instancia objeto de navegacao para redirecionamento
    const navigate = useNavigate();
    // Formulário para coleta dos dados do novo objeto
    return(
        <div className='container'>
            <h4>Inserir Novo Registro</h4>
            <form onSubmit={ gravar } className='corpo'>
                Marca: <input ref={marca} type="text" maxLength="100" required />
                Preço: <input ref={preco} type="number" step="0.01" maxLength="10, 2" required />
                <button type='submit' className='waves-effect waves-light btn'>Cadastrar</button>
            </form>
    
            <div className="action"><Link to='/computador' className="waves-effect red darken-4 btn">Cancelar</Link></div>
        </div>
    )

    // Chamada a função da API
    async function gravar(e){
        e.preventDefault(); // cancela o submit
        try{
            // monta json
            const json = {marca: marca.current.value, preco: preco.current.value}
            // Chama função da API enviando o json com os dados do novo objeto
            const resposta = await axios.post('http://localhost:4000/computadores',json);
            setStatus(resposta);
            console.log(resposta); // pressione F12 e no console veja o que veio da API no backend

            //Toast para sinalizar o sucesso da operação
            M.toast({html: 'Registro inserido com sucesso!', classes: 'rounded teal lighten-2'});
            //Redirecionamento sem Recarregar a página
            navigate('/computador');

        } catch(erro) {
            setStatus(`Falha: ${erro}`);
        }
    }
}
export default Store