import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './style.css'

import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState('')

    const ongId = localStorage.getItem('ongId');

    const history = useHistory()

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }
        try {
            await api.post('incidents',data,{
                headers:{
                    Authorization: ongId
                }
            });
            history.push('/profiler');
        } catch (error) {
            alert('Erro ao cadastrar caso.')
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo" srcSet=""/>
                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente</p>
                    <Link className='back-link' to="/profiler">
                    <FiArrowLeft size={16} color="#e02041"/>
                    Voltar</Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text"
                    value={title}
                    onChange={e=> setTitle(e.target.value)}
                    placeholder="Título do caso"/>
                    <textarea cols="30" rows="5"
                    value={description}
                    onChange={e=> setDescription(e.target.value)}
                    placeholder="Descrição do caso"></textarea>
                    <input type="number"
                    value={value}
                    onChange={e=> setValue(e.target.value)}
                    placeholder="Valor em R$"/>
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
