import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from './../../services/api';
import './style.css';
import M from 'materialize-css';
import { MdEdit, MdDelete } from "react-icons/md";

function Cliente() {
    const [json, setJson] = useState([]);

    // Função para exclusão de um item
    async function deleteItem(id) {
        try {
            // Realize a exclusão na API
            await axiosInstance.delete(`/clientes/${id}`);
            // Atualize o estado local para refletir a exclusão
            setJson(json.filter(cliente => cliente.id_cliente !== id));
            M.toast({ html: 'Registro Removido!', classes: 'rounded red lighten-1' });
        } catch (error) {
            console.error(`Erro ao excluir o item com ID ${id}: ${error}`);
        }
    }   

    useEffect(() => {
        async function Show() {
            try {
                // Realize a consulta na API com base na baseUrl configurada
                const resposta = await axiosInstance.get("/clientes");
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
                <h4>Clientes</h4>
                <table>
                    <thead>
                        <tr>
                            <th>CPF</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {json.map((cliente) => (
                            <tr key={cliente.id_cliente}>
                                <td>{cliente.cpf}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td><Link to={"update/" + cliente.id_cliente} title="Editar"><MdEdit color='grey' /></Link></td>
                                <td>
                                    <MdDelete color='grey' style={{ cursor: 'pointer' }} title="Apagar" onClick={() => deleteItem(cliente.id_cliente)} />
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

export default Cliente;
