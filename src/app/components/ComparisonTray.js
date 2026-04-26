'use client';
import { useState } from 'react';

export default function ComparisonTray() {
    const [itemCount, setItemCount] = useState(2); // Using static data for now

    // In a real app, this component would likely not render at all if itemCount is 0.
    // This logic would be handled by a parent component or a global state manager.
    if (itemCount === 0) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 w-full z-40 md:block hidden">
            <div className="max-w-7xl mx-auto p-4">
                <div className="bg-surface-container-high/80 backdrop-blur-lg rounded-xl border border-outline-variant/30 shadow-2xl flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-4">
                            <img className="w-12 h-12 rounded-full border-2 border-surface-container-highest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9WnNftwDOqKhZUSmp3l60mfbHOnBPTUquw1DowEX4CSSXQxvdi4KKrw9doFG-esNJM6c9tmLT7p01S7h7wa0SePvJN7Tlu1t5q2CSacAFVGja892me0AKznpp1oEBNQnquOxfx1TiPeBE7u2EOlKF6z0C6mzzoaSOie06TxqNE4WAHiraRYFxTqVUITIhCLV2mNREjQz7p9mR8yRow7SZGvx98Zs_exrWG4klChOpUvlGIg1aiv9xbzjhVs_cGS-jgvuSaCccLT04" alt="Product 1" />
                            <img className="w-12 h-12 rounded-full border-2 border-surface-container-highest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClSy2u2T1uZ1F8yABNPCUIFjgrDNQNG6Vcj3mfNflXOjw5HlSnBYx8DEjS6Ev8xUxIOVOvH0R36DuTanyiahEgQYb7xcSUOOAzq6TSpk6eQIkx1003ncqQMTkBVch4HJWovW9TfovFwmkkneNzrMHIxifY4dFX5Q9iYjkiqplQmJls4BjpC6GoMkvifTwWSJ-cRcn7WWhYaQSWS5_7CYPINaBzEj4RvDHjoitNc1rLMECq4r3r_dqntrpGVoRrabtu7Pz6Dy6ScG7P" alt="Product 2" />
                        </div>
                        <div>
                            <p className="font-headline text-on-surface font-bold">Comparing {itemCount} items</p>
                            <p className="text-on-surface-variant text-sm font-body">Apex-15 Pro vs. Vortex S7 Desktop</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">delete_sweep</span>
                            <span className="font-label text-xs uppercase tracking-widest">Clear</span>
                        </button>
                        <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-headline font-bold text-sm tracking-tight transition-transform duration-200 active:scale-95 shadow-lg shadow-primary/20">
                            Compare Specs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
