'use client';

import Link from 'next/link';
import { useComparison } from '../compare/ComparisonContext';

export default function ComparisonTray() {
    const { comparisonList, clearComparison } = useComparison();

    if (comparisonList.length === 0) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 w-full z-40 md:block hidden">
            <div className="max-w-7xl mx-auto p-4">
                <div className="bg-surface-container-high/80 backdrop-blur-lg rounded-xl border border-outline-variant/30 shadow-2xl flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-4">
                            {comparisonList.map((product) => (
                                <img 
                                    key={product.id} 
                                    className="w-12 h-12 rounded-full border-2 border-surface-container-highest object-cover" 
                                    src={product.image_url || 'https://via.placeholder.com/300'} 
                                    alt={product.name} 
                                />
                            ))}
                        </div>
                        <div>
                            <p className="font-headline text-on-surface font-bold">Comparing {comparisonList.length} items</p>
                            <p className="text-on-surface-variant text-sm font-body">{comparisonList.map(p => p.name).join(' vs. ')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={clearComparison} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">delete_sweep</span>
                            <span className="font-label text-xs uppercase tracking-widest">Clear</span>
                        </button>
                        <Link href="/compare" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-headline font-bold text-sm tracking-tight transition-transform duration-200 active:scale-95 shadow-lg shadow-primary/20">
                            Compare Specs
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
