import axiosInstance from '../../services/api';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import './style.css';

function StoreMotocicleta() {
    // Para apresentar ao usuáro o resultado da operação
    const [status, setStatus] = useState('');
    const [concessionariaId, setConcessionariaId] = useState('');

    // Para armazenar dados digitados pelo usuário
    const renavam = useRef(""); const kilometragem = useRef(0);
    const placa = useRef(""); const marca = useRef("");
    const modelo = useRef(""); const anoFabricacao = useRef(0);
    const anoModelo = useRef(0); const potencia = useRef(0);
    const cor = useRef(""); const estado = useRef("");

    // Instancia objeto de navegacao para redirecionamento
    const navigate = useNavigate();

    // Formulário para coleta dos dados do novo objeto
    return (
        <div className='container'>
            <h4>Nova Motocicleta</h4>
            <div>
                <br /><h6>Etapa 1 &gt; DADOS DA MOTOCICLETA</h6>
                <form onSubmit={gravarMotocicleta} className='corpo'>
                    Renavam: <input ref={renavam} type="text" maxLength="11" required />
                    <label htmlFor="categoriaSelect">Estado:</label>
                    <select id="categoriaSelect" ref={estado} required style={{ display: 'block', marginBottom: '10px' }}>
                        <option value="">Selecione</option>
                        <option value="NOVO">Novo</option>
                        <option value="USADO">Usado</option>
                    </select>
                    <br />
                    Kilometragem: <input ref={kilometragem} type="number" maxLength="10" required />
                    Placa: <input ref={placa} type="text" maxLength="8" />
                    Marca: <input ref={marca} type="text" maxLength="16" required />
                    Modelo: <input ref={modelo} type="text" maxLength="16" required />
                    Ano de Fabricação: <input ref={anoFabricacao} type="number" maxLength="5" required />
                    Ano/Modelo: <input ref={anoModelo} type="number" maxLength="5" required />
                    Potencia: <input ref={potencia} type="number" maxLength="5" required />
                    Cor: <input ref={cor} type="text" maxLength="20" required />
                    <button type='submit' className='waves-effect waves-light btn'>Cadastrar</button>
                </form>
            </div>
            <div className="action"><Link to='/clientes' className="waves-effect red darken-4 btn">Cancelar</Link></div>
            <br />
        </div>
    )

    // Chamada a função da API

    async function gravarMotocicleta(e) {
        e.preventDefault(); // cancela o submit

        try {
            const motocicletaData = {
                renavam: renavam.current.value,
                kilometragem: kilometragem.current.value,
                placa: placa.current.value,
                marca: marca.current.value,
                modelo: modelo.current.value,
                anoFabricacao: anoFabricacao.current.value,
                anoModelo: anoModelo.current.value,
                potencia: potencia.current.value,
                cor: cor.current.value,
                estado: estado.current.value,
                id_concessionaria: concessionariaId // Usando o ID do endereço obtido
            };
            // Chamar a função da API para criar a concessionária usando concessionariaData
            const resposta = await axiosInstance.post('/motocicletas', motocicletaData);
            setStatus(resposta);
            console.log(resposta);

            M.toast({ html: 'Motocicleta cadastrada com sucesso!', classes: 'rounded teal lighten-2' });
            navigate('/motocicletas');
        } catch (erro) {
            setStatus(`Falha: ${erro}`);
        }
    }
}
export default StoreMotocicleta;