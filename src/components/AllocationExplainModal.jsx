import React from 'react';
import { Sparkles, Info } from 'lucide-react';

export default function AllocationExplainModal({ isOpen, onClose, explanations, patients, doctors }) {
  if (!isOpen) return null;

  const doctorMap = new Map(doctors.map(d => [d.id, d]));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-slate-100/70 border-b border-slate-200 px-5 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles size={20} className="text-amber-500" />
              Explicação da Lógica de Alocação
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Rastreabilidade e justificativas detalhadas do motor de distribuição
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-xl font-bold">
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-2 text-xs">
          {patients.map(p => {
            const exp = explanations[p.id] || 'Alocação manual ou padrão';
            const doc = doctorMap.get(p.doctorId);
            const res = doctorMap.get(p.residentId);

            return (
              <div key={p.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                    {p.bed}
                  </span>
                  <div>
                    <span className="font-bold text-slate-800 text-sm uppercase">{p.name}</span>
                    <span className="ml-2 text-[10px] text-slate-500 font-semibold">[{p.sector}]</span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className="font-semibold text-blue-700">
                    {doc ? doc.name : 'Sem Médico'} {res ? `+ ${res.name} (Residente)` : ''}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-end gap-1 mt-0.5">
                    <Info size={13} className="text-blue-500" />
                    <span>{exp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors shadow-xs"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
