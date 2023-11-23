import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from './../../services/api';
import M from 'materialize-css';
import { MdEdit, MdDelete } from "react-icons/md";

function Concessionaria() {
    const [json, setJson] = useState([]);

    // Função para exclusão de um item
    async function deleteItem(id) {
        try {
            // Realize a exclusão na API
            await axiosInstance.delete(`/concessionarias/${id}`);
            // Atualize o estado local para refletir a exclusão
            setJson(json.filter(concessionaria => concessionaria.id_concessionaria !== id));
            M.toast({ html: 'Registro Removido!', classes: 'rounded red lighten-1' });
        } catch (error) {
            console.error(`Erro ao excluir o item com ID ${id}: ${error}`);
        }
    }   

    useEffect(() => {
        async function Show() {
            try {
                // Realize a consulta na API com base na baseUrl configurada
                const resposta = await axiosInstance.get("/concessionarias");
                // Armazene a resposta na variável de estado
                setJson(resposta.data);
                console.log(resposta); // Use F12 para verificar a saída da consulta à API no console
            } catch (err) {
                console.error('Erro ao buscar os dados: ', err);
            };
        }

        Show();
    }, []);

    return (
        <>
            <div className='container'>
                <h4 style={{marginTop: "10%"}}>Concessionarias</h4>
                <table>
                    <thead>
                        <tr>
                            <th>CNPJ</th>
                            <th>Nome Fantasia</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {json.map((concessionaria) => (
                            <tr key={concessionaria.id_concessionaria}>
                                <td>{concessionaria.cnpj}</td>
                                <td>{concessionaria.nomeFantasia}</td>
                                <td>{concessionaria.email}</td>
                                <td><Link to={"update/" + concessionaria.id_concessionaria} title="Editar"><MdEdit color='grey' /></Link></td>
                                <td>
                                    <MdDelete color='grey' style={{ cursor: 'pointer' }} title="Apagar" onClick={() => deleteItem(concessionaria.id_concessionaria)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="action"><Link to='create' className="waves-effect waves-light btn">Cadastrar Novo</Link></div>
            </div>
        </>
    );
}

export default Concessionaria;
