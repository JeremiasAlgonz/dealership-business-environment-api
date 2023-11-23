import axiosInstance from '../../services/api';
import { useRef, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';


function StoreEndereco({ onEnderecoCreated }) {
    // Para apresentar ao usuáro o resultado da operação
    const [status, setStatus] = useState('');
    // Para armazenar dados digitados pelo usuário
    const logradouro = useRef("");
    const numero = useRef(0);
    const complemento = useRef("");
    const codigoPostal = useRef("");
    const cliente = null;
    const concessionaria = null;
    // Formulário para coleta dos dados do novo objeto
    return (
        <div>
            <form onSubmit={gravarEndereco} className='corpo'>
                Logradouro: <input ref={logradouro} type="text" maxLength="50" required />
                Numero: <input ref={numero} type="number" maxLength="6" required />
                Complemento: <input ref={complemento} type="text" maxLength="50" required />
                CEP: <input ref={codigoPostal} type="text" maxLength="9" required />
                <button type='submit' className='waves-effect waves-light btn'>Confirmar</button>
            </form>
        </div>
    )

    // Chamada a função da API

    async function gravarEndereco(e) {
        e.preventDefault(); // cancela o submit
        try {
            const numeroInt = parseInt(numero.current.value, 10);
            // monta json 
            const json = {
                logradouro: logradouro.current.value,
                numero: numeroInt,
                complemento: complemento.current.value,
                codigoPostal: codigoPostal.current.value,
                cliente: cliente,
                concessionaria: concessionaria
            }
            // Chama função da API enviando o json com os dados do novo objeto
            const response = await axiosInstance.post('/enderecos', json);
            setStatus(response);
            console.log(response); // pressione F12 e no console veja o que veio da API no backend


            if (onEnderecoCreated && typeof onEnderecoCreated === 'function') {
                onEnderecoCreated(response.data.id_endereco); // Envia o ID do endereço para o componente pai
            }

        } catch (error) {
            setStatus(`Falha: ${error}`);
            throw error; // Lança o erro para tratamento externo, se necessário
        }
    }

}
export default StoreEndereco;