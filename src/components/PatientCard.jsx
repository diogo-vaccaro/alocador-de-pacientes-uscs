import React from 'react';
import { DOCTOR_TAGS } from '../constants/initialData';
import { Info } from 'lucide-react';

export default function PatientCard({ patient, doctor, resident, allDoctors, onUpdatePatient, onSelectExplain }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between gap-3">
      {/* Bed Pill & MV */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
            Leito {patient.bed}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            MV: {patient.mv}
          </span>
        </div>

        {onSelectExplain && (
          <button
            onClick={() => onSelectExplain(patient.id)}
            title="Ver por que este médico foi alocado"
            className="text-slate-400 hover:text-blue-600 p-1 rounded hover:bg-slate-100 transition-colors"
          >
            <Info size={15} />
          </button>
        )}
      </div>

      {/* Patient Info */}
      <div>
        <h4 className="font-semibold text-slate-900 text-sm leading-snug uppercase tracking-tight">
          {patient.name}
        </h4>
        <div className="flex gap-2 text-xs text-slate-500 mt-1">
          <span>Inter: {patient.date}</span>
          <span>•</span>
          <span>{patient.age} anos</span>
        </div>
      </div>

      {/* Doctor & Resident Selectors */}
      <div className="pt-2.5 border-t border-slate-100 space-y-1.5">
        <div>
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
            Médico Responsável
          </label>
          <select
            value={patient.doctorId || ''}
            onChange={(e) => onUpdatePatient(patient.id, { doctorId: e.target.value || null })}
            className={`w-full text-xs font-medium px-2 py-1.5 rounded-lg border outline-none cursor-pointer transition-colors ${
              doctor
                ? 'border-blue-200 bg-blue-50/50 text-blue-900'
                : 'border-amber-200 bg-amber-50 text-amber-800'
            }`}
          >
            <option value="">-- Sem Médico --</option>
            {allDoctors
              .filter(d => d.tag !== 'residente')
              .map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({DOCTOR_TAGS[d.tag.toUpperCase()]?.label || d.tag})
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
            Residente Acompanhante
          </label>
          <select
            value={patient.residentId || ''}
            onChange={(e) => onUpdatePatient(patient.id, { residentId: e.target.value || null })}
            className={`w-full text-xs font-medium px-2 py-1.5 rounded-lg border outline-none cursor-pointer transition-colors ${
              resident
                ? 'border-purple-200 bg-purple-50 text-purple-800 font-semibold'
                : 'border-slate-200 bg-slate-50 text-slate-500'
            }`}
          >
            <option value="">Sem Residente</option>
            {allDoctors
              .filter(d => d.tag === 'residente')
              .map(r => (
                <option key={r.id} value={r.id}>
                  + {r.name} (Residente)
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}
