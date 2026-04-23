export default function ComparisonTray() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-6 py-4 bg-[#1a1a2e]/80 backdrop-blur-md border-t border-[#b3c5ff]/15 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
      <button className="flex flex-col items-center gap-1 text-[#e2e0fc] opacity-60 hover:opacity-100 hover:bg-[#333348] transition-all p-2 rounded-md">
        <span className="material-symbols-outlined">compare_arrows</span>
        <span className="font-space-grotesk uppercase text-[10px] tracking-widest">Compare</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-[#e2e0fc] opacity-60 hover:opacity-100 hover:bg-[#333348] transition-all p-2 rounded-md">
        <span className="material-symbols-outlined">delete_sweep</span>
        <span className="font-space-grotesk uppercase text-[10px] tracking-widest">Clear All</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-[#e2e0fc] opacity-60 hover:opacity-100 hover:bg-[#333348] transition-all p-2 rounded-md">
        <span className="material-symbols-outlined">memory</span>
        <span className="font-space-grotesk uppercase text-[10px] tracking-widest">GPU Specs</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-[#e2e0fc] opacity-60 hover:opacity-100 hover:bg-[#333348] transition-all p-2 rounded-md">
        <span className="material-symbols-outlined">processing_cluster</span>
        <span className="font-space-grotesk uppercase text-[10px] tracking-widest">CPU Specs</span>
      </button>
    </div>
  );
}