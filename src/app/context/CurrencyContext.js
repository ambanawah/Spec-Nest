'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
    const [currency, setCurrency] = useState('USD');
    const [currencies, setCurrencies] = useState([{ currency_code: 'USD', currency_name: 'US Dollar', rate_against_usd: 1 }]);
    const [rates, setRates] = useState({ USD: 1 });
    const [loading, setLoading] = useState(true);

    // Fetch rates on mount and restore saved currency preference
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch('/api/rates');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCurrencies(data);
                    // Build rate map for fast lookup: { USD: 1.0, EUR: 0.92, ZAR: 17.85, ... }
                    const ratesMap = {};
                    data.forEach(r => {
                        ratesMap[r.currency_code] = r.rate_against_usd;
                    });
                    setRates(ratesMap);
                    
                    // Restore user's saved currency preference
                    const savedCurrency = localStorage.getItem('selected_currency') || 'USD';
                    if (ratesMap[savedCurrency]) {
                        setCurrency(savedCurrency);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch exchange rates:', err);
                setRates({ USD: 1 });
            } finally {
                setLoading(false);
            }
        };
        
        fetchRates();
    }, []);

    // Handle currency change and save preference
    const handleCurrencyChange = (newCurrency) => {
        setCurrency(newCurrency);
        localStorage.setItem('selected_currency', newCurrency);
    };

    // Convert a USD price to the selected currency
    const convertPrice = (priceUSD) => {
        const rate = rates[currency] || 1;
        return Math.round(priceUSD * rate * 100) / 100;
    };

    return (
        <CurrencyContext.Provider value={{
            currency,
            setCurrency: handleCurrencyChange,
            currencies,
            rates,
            loading,
            convertPrice
        }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    return useContext(CurrencyContext);
}
