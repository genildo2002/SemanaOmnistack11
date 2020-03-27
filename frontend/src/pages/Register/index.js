import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'
import './style.css'

import logoImg from '../../assets/logo.svg'


export default function Register(){
    const [ name, setName] = useState('');
    const [ email, setEmail] = useState('');
    const [ whatsup, setWhatsup] = useState('');
    const [ city, setCity] = useState('');
    const [ uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {name,email,whatsup,city,uf};
        try {
            const response = await api.post('/ongs',data);
            alert(`Seud ID de acesso é:${response.data.id}`);
            history.push('/')
        } catch (error) {
            alert(error);
            alert('Erro no cadastro. Tente novamente!!')            ;
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo" srcSet=""/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro para entrar na plataforma</p>
                    <Link className='back-link' to="/">
                    <FiArrowLeft size={16} color="#e02041"/>
                    Não tenho cadastro</Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input type="text"
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input type="email"
                    placeholder="Email da ONG"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input type="text"
                    placeholder="WhatsUp"
                    value={whatsup}
                    onChange={e => setWhatsup(e.target.value)}
                    />
                    <div className="input-group">
                        <input type="text"
                        placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />
                        <input type="text"
                        placeholder="UF" style={{width: 80}}
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
