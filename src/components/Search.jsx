import React, { useState } from "react";
import { FiSearch } from 'react-icons/fi'
import api from "../services/api";
import './Search.css'

function Search() {

    const [input, setInput] = useState('');
    const [cep, setCep] = useState({});

    async function handleSearch() {
        if (input === '') {
            alert('Preencha algum cep!')
            return;
        }

        try {
            const response = await api.get(`${input}/json`);
            setCep(response.data);
            setInput('');

        } catch {
            alert('ERRO, possivelmente esse cep não existe!');
            setInput('');
        }
    }

    return (
        <>
            <div className='container'>
                <h1>Buscador CEP</h1>

                <div className='containerInput'>
                    <input
                        type="text"
                        placeholder="Informe o cep"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <button onClick={handleSearch}>
                        <FiSearch size='25' color='#FFF' />
                    </button>
                </div>

                {Object.keys(cep).length > 0 && (
                    <main>
                        <h3>CEP: {cep.cep}</h3>
                        <span>{cep.logradouro}</span>
                        <span>Complemento: {cep.complemento}</span>
                        <span>{cep.bairro}</span>
                        <span>{cep.localidade} - {cep.uf}</span>
                    </main>
                )}
            </div>
        </>
    )
}

export default Search;