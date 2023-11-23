import axiosInstance from '../../services/api';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

//import './style.css';

function StoreMotocicleta() {
    // Instancia objeto de navegacao para redirecionamento
    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const [idConcessionaria, setIdConcessionaria] = useState(0);
    const [concessionarias, setConcessionarias] = useState([]);

    // Para armazenar dados digitados pelo usuário
    const renavam = useRef(""); const kilometragem = useRef(0);
    const placa = useRef(""); const marca = useRef("");
    const modelo = useRef(""); const anoFabricacao = useRef(0);
    const anoModelo = useRef(0); const potencia = useRef(0);
    const cor = useRef(""); const estado = useRef("");
    const conce = useRef("");

    useEffect(() => {
        async function obterConcessionarias() {
            try {
                // Realize a consulta na API com base na baseUrl configurada
                const resposta = await axiosInstance.get("/concessionarias");
                // Armazene a resposta na variável de estado
                setConcessionarias(resposta.data);
                console.log(resposta); // Use F12 para verificar a saída da consulta à API no console
            } catch (err) {
                console.error('Erro ao buscar os dados: ', err);
            };
        }
        obterConcessionarias();
    }, []);


    // Formulário para coleta dos dados do novo objeto
    return (
        <div className='container'>
            <h4>Nova Motocicleta</h4>
            <div>
                <br /><h6>Etapa 1 &gt; DADOS DA MOTOCICLETA</h6>
                <form onSubmit={gravarMotocicleta} >
                    <div className='corpo'>
                        <label htmlFor="categoriaSelect">Concessionaria:</label>
                        <select
                            id="categoriaSelect"
                            ref={conce}
                            required
                            style={{ display: 'block', marginBottom: '10px' }}
                            onChange={(event) => {
                                const selectedIndex = event.target.selectedIndex;
                                const selectedConcessionaria = concessionarias[selectedIndex - 1];
                                //Capturando o idConcessionaria aqui
                                const idTemp = selectedConcessionaria.id_concessionaria;
                                setIdConcessionaria(idTemp);
                                console.log('ID da concessionaria selecionada:', idTemp);
                            }}
                            defaultValue={concessionarias.length > 0 ? concessionarias[0].nomeFantasia : ''}
                        >
                            <option disabled value="">
                                Selecione uma Concessionaria
                            </option>
                            {
                                concessionarias.map((item, index) => {
                                    return <option key={index} value={item.nomeFantasia}>{item.nomeFantasia}</option>;
                                })
                            }
                        </select>
                        <br />
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
                        <br />
                    </div>
                    <br /><h6>Etapa 2 &gt; CARACTERISTICAS DA MOTOCICLETA</h6>
                    <br />
                    <div className='corpo'>

                        Fabricante: <input ref={marca} type="text" maxLength="16" required />
                        Modelo: <input ref={modelo} type="text" maxLength="16" required />
                        Ano de Fabricação: <input ref={anoFabricacao} type="number" maxLength="5" required />
                        Ano/Modelo: <input ref={anoModelo} type="number" maxLength="5" required />
                        Potencia: <input ref={potencia} type="number" maxLength="5" required />
                        Cor: <input ref={cor} type="text" maxLength="20" required />
                        <button type='submit' className='waves-effect waves-light btn'>Cadastrar</button>
                    </div>
                </form>


                <div className="action"><Link to='/motocicletas' className="waves-effect red darken-4 btn">Cancelar</Link></div>
                <br />
            </div >
        </div >
    )

    // Chamada a função da API

    async function gravarMotocicleta(e) {
        e.preventDefault(); // cancela o submit
        try {
            const parsedKilometragem = parseInt(kilometragem.current.value, 10);
            const parsedAnoFabricacao = parseInt(anoFabricacao.current.value, 10);
            const parsedAnoModelo = parseInt(anoModelo.current.value, 10);
            const parsedPotencia = parseInt(potencia.current.value, 10);

            const motocicletaData = {
                renavam: renavam.current.value,
                kilometragem: parsedKilometragem,
                placa: placa.current.value,
                marca: marca.current.value,
                modelo: modelo.current.value,
                anoFabricacao: parsedAnoFabricacao,
                anoModelo: parsedAnoModelo,
                potencia: parsedPotencia,
                cor: cor.current.value,
                estado: estado.current.value,
                id_concessionaria: idConcessionaria // Usando o ID do endereço obtido
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