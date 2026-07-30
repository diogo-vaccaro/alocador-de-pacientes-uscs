import React, { useState } from 'react';
import { History, Search, Calendar, UserCheck } from 'lucide-react';
import { DOCTOR_TAGS } from '../constants/initialData';

export default function HistoryModal({ isOpen, onClose, historyMap = {}, doctors = [] }) {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const doctorMap = new Map(doctors.map(d => [d.id, d]));

  // Converter o historyMap em um array de registros legíveis
  const historyEntries = Object.entries(historyMap).map(([key, val]) => {
    const doc = val.doctorId ? doctorMap.get(val.doctorId) : null;
    return {
      key, // leito ou ID do paciente
      doctorId: val.doctorId,
      doctorName: doc ? doc.name : (val.doctorId || 'Desconhecido'),
      doctorRole: doc ? (DOCTOR_TAGS[doc.tag.toUpperCase()]?.label || doc.tag) : 'Médico',
      lastUpdated: val.lastUpdated ? new Date(val.lastUpdated).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }) : '---'
    };
  });

  const filteredEntries = historyEntries.filter(entry => 
    entry.key.toLowerCase().includes(search.toLowerCase()) ||
    entry.doctorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-slate-100/70 border-b border-slate-200 px-5 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <History size={20} className="text-blue-600" />
              Histórico Completo de Alocações
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Registro histórico de vínculos entre leitos/pacientes e seus médicos responsáveis
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-xl font-bold">
            &times;
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por Leito, Paciente ou Nome do Médico..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Content Table */}
        <div className="p-4 overflow-y-auto flex-1">
          {filteredEntries.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              Nenhum histórico encontrado para a busca informada.
            </div>
          ) : (
            <table className="w-full border-collapse text-xs text-left">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                  <th className="py-2 px-3">Leito / Referência</th>
                  <th className="py-2 px-3">Médico Vínculado</th>
                  <th className="py-2 px-3">Função</th>
                  <th className="py-2 px-3 text-right">Última Atualização</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEntries.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-mono font-bold text-blue-700">
                      {entry.key}
                    </td>
                    <td className="py-2 px-3 font-semibold text-slate-900">
                      {entry.doctorName}
                    </td>
                    <td className="py-2 px-3 text-slate-600">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-medium">
                        {entry.doctorRole}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right text-slate-500 font-mono text-[11px]">
                      {entry.lastUpdated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex justify-between items-center text-xs text-slate-500">
          <span>Total de {historyEntries.length} registros no histórico</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
