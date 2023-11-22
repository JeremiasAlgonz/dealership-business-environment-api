import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from './../../services/api';
import './style.css'

function UpdateCliente() {

    const [status, setStatus] = useState({});
    const { id } = useParams();
    const [dados, setDados] = useState({ nome: "", cpf: "" });
    const navigate = useNavigate();

    // Código colocado no UseEffect é execucato após montagem deste componente
    useEffect(() => {

        async function consultar() {
            //Realiza consulta na API
            const resposta = await axiosInstance.get(`/clientes/${id}`)
                // Armazena a resposta na variavel State
                .then(resposta => {
                    setDados(resposta.data);
                    console.log(resposta); //Pressione F12 e no console veja o que veio da API no backend
                })
                .catch(err => {
                    console.error('Falha na Consulta: ', err);
                });
        }

        consultar();

    }, [])

    return (
        <div className='container'>
            <h4>Alterar Registro:</h4>
            <form onSubmit={gravar} className='corpo'>
                Nome: <input value={dados.nome} type="text" required onChange={(e) => setDados({ ...dados, nome: e.target.value })} />
                CPF: <input value={dados.cpf} type="number" step="0.01" required onChange={(e) => setDados({ ...dados, cpf: e.target.value })} />
                <button type='submit' className="waves-effect waves-light btn">Salvar</button>
            </form>
            <div className="action"><Link to='/clientes' className="waves-effect red darken-4 btn">Cancelar</Link></div>
        </div>
    )

    // Chamada a função da API
    async function gravar(e) {
        e.preventDefault(); // cancela o submit
        try {
            // Chama função da API enviando o json com os dados do novo objeto
            const resposta = await axiosInstance.put(`concessionarias/${id}`, dados);
            setStatus(resposta.data);
            console.log(resposta); // pressione F12 e no console veja o que veio da API no backend
            M.toast({ html: 'Registro Alterado com sucesso!', classes: 'rounded amber lighten-2' });

            // Volta para a lista de computadores
            navigate('/clientes');
        } catch (erro) {
            setStatus(`Falha: ${erro}`);
        }
    }

}
export default UpdateCliente;