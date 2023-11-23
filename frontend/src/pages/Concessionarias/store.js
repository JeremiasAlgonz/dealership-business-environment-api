import axiosInstance from '../../services/api';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import StoreEndereco from '../../pages/Enderecos/store';

function Store() {
    // Para apresentar ao usuáro o resultado da operação
    const [status, setStatus] = useState('');
    const [nextStep, setNextStep] = useState(false);
    // Para capturar o ID do endereco criado
    const [enderecoId, setEnderecoId] = useState(null);

    // Para armazenar dados digitados pelo usuário
    const cnpj = useRef(""); const nomeFantasia = useRef("");
    const telefone = useRef(""); const email = useRef("");

    // Instancia objeto de navegacao para redirecionamento
    const navigate = useNavigate();

    // Função para lidar com a conclusão da primeira etapa
    const handleEnderecoCreated = (id) => {
        setEnderecoId(id); // Atualiza o ID do endereço
        setNextStep(true); // Marca a etapa do endereço como concluída
    };

    // Formulário para coleta dos dados do novo objeto
    return (
        <div className='container'>
            <h4>Nova Concessionaria</h4>
            {!nextStep ? (
                <div>
                    <br /><h6>Etapa 1 &gt; ENDEREÇO</h6>
                    <StoreEndereco onEnderecoCreated={handleEnderecoCreated} />
                </div>
            ) : (
                <div>
                    <br /><h6>Etapa 2 &gt; DADOS DA CONCESSIONARIA</h6>
                    <form onSubmit={gravar} className='corpo'>
                        CNPJ: <input ref={cnpj} type="text" maxLength="18" required />
                        Nome Fantasia: <input ref={nomeFantasia} type="text" maxLength="100" required />
                        Telefone: <input ref={telefone} type="text" maxLength="16" required />
                        E-mail: <input ref={email} type="text" maxLength="100" required />
                        <button type='submit' className='waves-effect waves-light btn'>Cadastrar</button>
                    </form>
                </div>
            )}
            <div className="action"><Link to='/concessionarias' className="waves-effect red darken-4 btn">Cancelar</Link></div>
            <br />
        </div>
    )

    // Chamada a função da API

    async function gravar(e) {
        e.preventDefault(); // cancela o submit

        try {
            const concessionariaData = {
                cnpj: cnpj.current.value,
                nomeFantasia: nomeFantasia.current.value,
                telefone: telefone.current.value,
                email: email.current.value,
                id_endereco: enderecoId // Usando o ID do endereço obtido
            };
            // Chamar a função da API para criar a concessionária usando concessionariaData
            const resposta = await axiosInstance.post('/concessionarias', concessionariaData);
            setStatus(resposta);
            console.log(resposta);

            M.toast({ html: 'Concessionária inserida com sucesso!', classes: 'rounded teal lighten-2' });
            navigate('/concessionarias');
        } catch (erro) {
            setStatus(`Falha: ${erro}`);
        }
    }
}
export default Store;