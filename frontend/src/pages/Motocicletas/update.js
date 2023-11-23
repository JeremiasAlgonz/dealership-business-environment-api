import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import { Link, useParams, useNavigate, resolvePath } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../services/api';

function UpdateMotocicleta() {

    const [status, setStatus] = useState({});
    const { id } = useParams();
    const [concessionaria, setConcessionaria] = useState([]);
    const [dados, setDados] = useState([]);
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
                    setConcessionaria(resposta.data.concessionaria);
                })
                .catch(err => {
                    console.error('Falha na Consulta: ', err);
                });
        }

        /*async function obterConcessionarias() {
            try {
                // Realize a consulta na API com base na baseUrl configurada
                const resposta = await axiosInstance.get("/concessionarias");
                // Armazene a resposta na variável de estado
                setConcessionarias(resposta.data);
                console.log(resposta); // Use F12 para verificar a saída da consulta à API no console
            } catch (err) {
                console.error('Erro ao buscar os dados: ', err);
            };
        }*/

        consultar();

    }, [])

    return (
        <div className='container'>
            <h4>Alterar Registro:</h4>
            <form onSubmit={gravar} className='corpo'>
                <h5>Dados da Motocicleta:</h5>
                <br />
                Concessionaria: <input value={concessionaria.nomeFantasia} readOnly style={{ backgroundColor: "#f5f5f5" }} />
                Renavam: <input value={dados.renavam} readOnly style={{ backgroundColor: "#f5f5f5" }} />
                <label htmlFor="categoriaSelect">Estado:</label>
                <select id="categoriaSelect" required style={{ display: 'block', marginBottom: '10px' }}
                    onChange={(e) => setDados({ ...dados, estado: e.target.value })}>
                    <option value="">Selecione</option>
                    <option value="NOVO">Novo</option>
                    <option value="USADO">Usado</option>

                </select>
                Kilometragem: <input value={dados.kilometragem} type="number" required onChange={(e) => setDados({ ...dados, kilometragem: e.target.value })} />
                Placa: <input value={dados.placa} type="text" required onChange={(e) => setDados({ ...dados, placa: e.target.value })} />
                Fabricante: <input value={dados.marca} readOnly style={{ backgroundColor: "#f5f5f5" }} />
                Modelo: <input value={dados.modelo} readOnly style={{ backgroundColor: "#f5f5f5" }} />
                Ano de Fabricacao: <input value={dados.anoFabricacao} readOnly style={{ backgroundColor: "#f5f5f5" }} />
                Ano/Modelo: <input value={dados.anoModelo} readOnly style={{ backgroundColor: "#f5f5f5" }} />
                Potencia: <input value={dados.potencia} readOnly style={{ backgroundColor: "#f5f5f5" }} />
                Cor: <input value={dados.cor} type="text" required onChange={(e) => setDados({ ...dados, cor: e.target.value })} />
                <br /><br />
                <button type='submit' className="waves-effect waves-light btn">Salvar</button>
            </form>
            <div className="action"><Link to='/motocicletas' className="waves-effect red darken-4 btn">Cancelar</Link></div>
        </div>
    )

    // Chamada a função da API
    async function gravar(e) {
        e.preventDefault(); // cancela o submit
        try {
            // Atualizar dados da concessionária
            const putDataMotocicleta = {
                renavam: dados.renavam,
                kilometragem: dados.kilometragem,
                placa: dados.placa,
                marca: dados.marca,
                modelo: dados.modelo,
                anoFabricacao: dados.anoFabricacao,
                anoModelo: dados.anoModelo,
                potencia: dados.potencia,
                cor: dados.cor,
                estado: dados.estado,
                id_concessionaria: dados.id_concessionaria
            }
            const resMotocicleta = await axiosInstance.put(`/motocicletas/${id}`, putDataMotocicleta);
            setStatus(resMotocicleta.data);

            console.log(resMotocicleta);
            console.log(status);
            M.toast({ html: 'Registro Alterado com sucesso!', classes: 'rounded amber lighten-2' });

            // Retorna para a lista de concessionarias
            navigate('/motocicletas');
        } catch (erro) {
            setStatus(`Falha: ${erro}`);
        }
    }

}
export default UpdateMotocicleta;