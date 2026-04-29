'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
    const [currency, setCurrency] = useState('USD');
    const [currencies, setCurrencies] = useState([{ currency_code: 'USD', currency_name: 'US Dollar' }]);

    useEffect(() => {
        fetch('/api/rates')
            .then(r => r.json())
            .then(data => { if (Array.isArray(data)) setCurrencies(data); })
            .catch(() => {}); // keep default on error
    }, []);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, currencies }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    return useContext(CurrencyContext);
}
