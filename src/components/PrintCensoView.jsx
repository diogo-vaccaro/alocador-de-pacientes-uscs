import React from 'react';
import { createPortal } from 'react-dom';

export default function PrintCensoView({ patients, doctors, dateStr, onClose }) {
  const doctorMap = new Map(doctors.map(d => [d.id, d]));

  const patients3B = patients.filter(p => p.sector === '3B');
  const patients2B = patients.filter(p => p.sector === '2B');
  const patientsColono = patients.filter(p => p.sector === 'COLONO');

  const getDocName = (docId) => {
    const d = doctorMap.get(docId);
    return d ? d.name.toUpperCase() : '';
  };

  const getResName = (resId) => {
    const r = doctorMap.get(resId);
    return r ? ` + ${r.name.toUpperCase()}` : '';
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm p-4 flex items-center justify-center no-print-bg">
      <div className="bg-white text-black w-full max-w-[850px] max-h-[92vh] flex flex-col rounded-xl shadow-2xl border border-slate-300 overflow-hidden font-sans text-xs print-modal-container">
        
        {/* Controls Bar for Screen (sticky at top, hidden when printing) */}
        <div className="no-print sticky top-0 z-10 flex justify-between items-center px-5 py-3 bg-slate-100 border-b border-slate-300 shrink-0">
          <span className="font-bold text-slate-800 text-sm">Folha de Impressão Oficial do Censo</span>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-2xs text-xs cursor-pointer"
            >
              Imprimir / Salvar PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg text-xs cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>

        {/* Scrollable Container on Screen for printable sheet */}
        <div className="overflow-y-auto p-4 sm:p-5 flex-1">
          {/* --- PRINTABLE CENSO SHEET (MATCHES PRINT 1) --- */}
          <div id="printable-censo" className="border-2 border-black p-3 space-y-2 bg-white">
            {/* Header */}
            <div className="text-center border-b-2 border-black pb-1">
              <div className="flex justify-between items-center text-[8.5px] uppercase font-semibold text-slate-700">
                <span>( ) Hospital Infantil e Maternidade MÁRCIA BRAIDO</span>
                <span>( ) Hospital Municipal MARIA BRAIDO</span>
              </div>
              <h1 className="text-sm font-black tracking-widest mt-0.5 uppercase border-t border-b border-black py-0.5">
                ENFERMAGEM — CENSO HOSPITALAR
              </h1>
              <h2 className="text-[11px] font-bold bg-slate-200 uppercase py-0.5 border-b border-black">
                3°B - ENFERMARIA CLÍNICA — {dateStr || new Date().toLocaleDateString('pt-BR')}
              </h2>
            </div>

            {/* Table 3°B */}
            <table className="w-full border-collapse border border-black text-left text-[9.5px]">
              <thead>
                <tr className="bg-slate-200 border-b border-black font-bold uppercase text-[8.5px]">
                  <th className="border-r border-black p-0.5 text-center w-12">LEITO</th>
                  <th className="border-r border-black p-0.5">NOME DO PACIENTE</th>
                  <th className="border-r border-black p-0.5 text-center w-20">N° ATEND. MV</th>
                  <th className="border-r border-black p-0.5 text-center w-16">DATA INTER.</th>
                  <th className="border-r border-black p-0.5 text-center w-10">IDADE</th>
                  <th className="p-0.5 w-44">MÉDICO RESPONSÁVEL</th>
                </tr>
              </thead>
              <tbody>
                {patients3B.map((p) => {
                  const docName = getDocName(p.doctorId);
                  const resName = getResName(p.residentId);

                  return (
                    <tr key={p.id} className="border-b border-slate-300 font-sans">
                      <td className="border-r border-black py-0.5 px-1 text-center font-bold font-mono">{p.bed}</td>
                      <td className="border-r border-black py-0.5 px-1 font-semibold uppercase">{p.name}</td>
                      <td className="border-r border-black py-0.5 px-1 text-center font-mono">{p.mv}</td>
                      <td className="border-r border-black py-0.5 px-1 text-center">{p.date}</td>
                      <td className="border-r border-black py-0.5 px-1 text-center">{p.age}</td>
                      <td className="py-0.5 px-1 font-bold text-blue-900 uppercase">
                        {docName ? `${docName}${resName}` : '----------'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Bottom Section: 2°B & Colonoscopias */}
            <div className="pt-1.5 border-t-2 border-black grid grid-cols-2 gap-2.5">
              {/* 2°B Sector */}
              <div className="border border-black p-1.5 bg-slate-50">
                <h3 className="font-bold border-b border-black pb-0.5 mb-1 uppercase text-[9.5px]">
                  2°B - ENFERMARIA (ALOCAÇÃO DEDICADA)
                </h3>
                <ul className="space-y-0.5 font-mono text-[9px]">
                  {patients2B.map(p => (
                    <li key={p.id} className="flex justify-between border-b border-slate-200 pb-0.5">
                      <span><strong className="font-bold">{p.name}</strong> ({p.bed})</span>
                      <span className="font-bold text-indigo-900">
                        - {getDocName(p.doctorId)}{getResName(p.residentId)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Colonoscopias Sector */}
              <div className="border border-black p-1.5 bg-purple-50/50">
                <h3 className="font-bold border-b border-black pb-0.5 mb-1 uppercase text-[9.5px] text-purple-900">
                  COLONOSCOPIAS AGENDADAS
                </h3>
                <ul className="space-y-0.5 font-mono text-[9px]">
                  {patientsColono.map(p => (
                    <li key={p.id} className="border-b border-purple-200 pb-0.5 font-bold text-purple-950">
                      COLONO: {p.name} ({p.bed})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
