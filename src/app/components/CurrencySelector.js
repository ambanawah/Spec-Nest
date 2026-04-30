'use client';

import { useCurrency } from '../context/CurrencyContext';

export default function CurrencySelector() {
    const { currency, setCurrency, currencies, loading } = useCurrency();

    if (loading) return <div className="text-sm text-gray-500">Loading currencies...</div>;

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="currency-select" className="text-sm font-medium text-gray-700">
                Currency:
            </label>
            <select
                id="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {currencies.map((curr) => (
                    <option key={curr.currency_code} value={curr.currency_code}>
                        {curr.currency_code} - {curr.currency_name}
                    </option>
                ))}
            </select>
        </div>
    );
}
