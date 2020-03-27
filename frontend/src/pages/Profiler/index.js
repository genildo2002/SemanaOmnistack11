import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api'

import './style.css'
import { FiPower } from 'react-icons/fi'
import { FiTrash2 } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

export default function Profiler(){
    const [ incidents, setIncidents ] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory()
    //Preencher um array com o resultado do get. Se o ex.: ongId
    // mudar o useEffect vai refazer a consulta automaticamente
    useEffect(() => {
        api.get('/profiler',{
            headers:{
                Authorization: ongId
            }
        }).then(response=>{
            setIncidents(response.data)
        })
    },[ongId]);

    async function handleDeleteIncident(id){

        try {
          await api.delete(`incidents/${id}`,{
              headers: {
                  Authorization : ongId
              }
          });
          setIncidents(incidents.filter(incident => incident.id !=id))
        } catch (error) {
            alert('Erro ao excluir caso.')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="profiler-container">
            <header>
                <img src={logoImg} alt="Be The Hero" srcSet=""/>
                <span>Bem Vinda, {ongName}</span>
                <Link className='button' to="/incidents/new">Cadastrar Novo Caso</Link>
                <button onClick={handleLogout} title='Sair' type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map( incident => (
                <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR',{style: 'currency',currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={()=>handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>

                ))}
            </ul>
        </div>
    );
}
