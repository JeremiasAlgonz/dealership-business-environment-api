import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../services/api';

function UpdateCliente() {

    const [status, setStatus] = useState({});
    const { id } = useParams();
    const [endereco, setEndereco] = useState({ id_endereco: 0, logradouro: "", numero: 0, complemento: "", codigoPostal: "" });
    const [dados, setDados] = useState({ tipoProprietario: "", nome: "", cnpj: "", cpf: "", telefone: "", email: "", id_endereco: 0 });
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
                    setEndereco(resposta.data.endereco); // tentativa de catch do id_endereco da requisicao, vai que cola xd
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
                <h5>Dados do Cliente:</h5>
                <br />
                Tipo Cliente: <input value={dados.tipoProprietario} readOnly />

                {dados.tipoProprietario === "PESSOA_JURIDICA" ? (
                    <>
                        Nome Fantasia: <input value={dados.nome} type="text" required onChange={(e) => setDados({ ...dados, nome: e.target.value })} />
                        CNPJ: <input style={{ backgroundColor: '#fbe9e7' }} value={dados.cnpj} type="text" onChange={(e) => setDados({ ...dados, cnpj: e.target.value })} title='CUIDADO! Informação sensível, altere apenas quando for necessario.' />
                        CPF: <input style={{ backgroundColor: '#f5f5f5' }} value={dados.cpf} type="text" readOnly disabled={true} />
                        Telefone: <input value={dados.telefone} type="text" required onChange={(e) => setDados({ ...dados, telefone: e.target.value })} />
                        E-mail: <input value={dados.email} type="text" required onChange={(e) => setDados({ ...dados, email: e.target.value })} />

                        <br /><br />
                        <h5>Endereco:</h5>
                        <br />
                        Logradoro: <input value={endereco.logradouro} type="text" required onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })} />
                        Numero: <input value={endereco.numero} type="number" required onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })} />
                        Complemento: <input value={endereco.complemento} type="text" required onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })} />
                        CEP: <input value={endereco.codigoPostal} type="text" required onChange={(e) => setEndereco({ ...endereco, codigoPostal: e.target.value })} />

                    </>
                ) : (
                    <>
                        Nome: <input value={dados.nome} type="text" required onChange={(e) => setDados({ ...dados, nome: e.target.value })} />
                        CNPJ: <input style={{ backgroundColor: '#f5f5f5' }} value={dados.cnpj} type="text" readOnly disabled={true} />
                        CPF: <input style={{ backgroundColor: '#fbe9e7' }} value={dados.cpf} type="text" onChange={(e) => setDados({ ...dados, cpf: e.target.value })} title='CUIDADO! Informação sensível, altere apenas quando for necessario.' />
                        Telefone: <input value={dados.telefone} type="text" required onChange={(e) => setDados({ ...dados, telefone: e.target.value })} />
                        E-mail: <input value={dados.email} type="text" required onChange={(e) => setDados({ ...dados, email: e.target.value })} />

                        <br /><br />
                        <h5>Endereco:</h5>
                        <br />
                        Logradoro: <input value={endereco.logradouro} type="text" required onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })} />
                        Numero: <input value={endereco.numero} type="number" required onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })} />
                        Complemento: <input value={endereco.complemento} type="text" required onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })} />
                        CEP: <input value={endereco.codigoPostal} type="text" required onChange={(e) => setEndereco({ ...endereco, codigoPostal: e.target.value })} />
                    </>
                )}
                <button type='submit' className="waves-effect waves-light btn">Salvar</button>
            </form>
            <div className="action"><Link to='/clientes' className="waves-effect red darken-4 btn">Cancelar</Link></div>
        </div>
    )

    // Chamada a função da API
    async function gravar(e) {
        e.preventDefault(); // cancela o submit
        try {
            // Atualizar dados da concessionária
            const putDataCliente = {
                tipoProprietario: dados.tipoProprietario,
                cnpj: dados.cnpj,
                cpf: dados.cpf,
                nome: dados.nome,
                telefone: dados.telefone,
                email: dados.email,
                id_endereco: dados.endereco.id_endereco // Usando o ID do endereço obtido
            }
            const resCliente = await axiosInstance.put(`/clientes/${id}`, putDataCliente);
            setStatus(resCliente.data);

            // Atualizar endereço
            const resEndereco = await axiosInstance.put(`/enderecos/${endereco.id_endereco}`, endereco);

            console.log(resCliente);
            console.log(resEndereco);
            M.toast({ html: 'Registro Alterado com sucesso!', classes: 'rounded amber lighten-2' });

            // Retorna para a lista de concessionarias
            navigate('/clientes');
        } catch (erro) {
            setStatus(`Falha: ${erro}`);
        }
    }

}
export default UpdateCliente;