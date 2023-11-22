import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from './../../services/api';
import './style.css'

function UpdateMotocicleta() {

    const [status, setStatus] = useState({});
    const { id } = useParams();
    const [dados, setDados] = useState({ estado: "", kilometragem: 0 });
    const navigate = useNavigate();

    // Código colocado no UseEffect é execucato após montagem deste componente
    useEffect(() => {

        async function consultar() {
            //Realiza consulta na API
            const resposta = await axiosInstance.get(`/motocicletas/${id}`)
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
                Estado: <input value={dados.nome} type="text" required onChange={(e) => setDados({ ...dados, estado: e.target.value })} />
                Km: <input value={dados.cpf} type="number" step="0.01" required onChange={(e) => setDados({ ...dados, kilometragem: e.target.value })} />
                <button type='submit' className="waves-effect waves-light btn">Salvar</button>
            </form>
            <div className="action"><Link to='/motocicletas' className="waves-effect red darken-4 btn">Cancelar</Link></div>
        </div>
    )

    // Chamada a função da API
    async function gravar(e) {
        e.preventDefault(); // cancela o submit
        try {
            // Chama função da API enviando o json com os dados do novo objeto
            const resposta = await axiosInstance.put(`motocicletas/${id}`, dados);
            setStatus(resposta.data);
            console.log(resposta); // pressione F12 e no console veja o que veio da API no backend
            M.toast({ html: 'Registro Alterado com sucesso!', classes: 'rounded amber lighten-2' });

            // Volta para a lista de computadores
            navigate('/motocicletas');
        } catch (erro) {
            setStatus(`Falha: ${erro}`);
        }
    }

}
export default UpdateMotocicleta;