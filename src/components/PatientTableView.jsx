import React from 'react';
import { DOCTOR_TAGS } from '../constants/initialData';
import { Info } from 'lucide-react';

export default function PatientTableView({ patients, doctors, onUpdatePatient, onSelectExplain }) {
  const doctorMap = new Map(doctors.map(d => [d.id, d]));

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/80 border-b border-slate-200 font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
              <th className="py-2.5 px-3 w-20 text-center">Leito</th>
              <th className="py-2.5 px-3">Nome do Paciente</th>
              <th className="py-2.5 px-3 w-28 text-center font-mono">N° MV</th>
              <th className="py-2.5 px-3 w-24 text-center">Data Inter.</th>
              <th className="py-2.5 px-3 w-16 text-center">Idade</th>
              <th className="py-2.5 px-3 min-w-[200px]">Médico Responsável</th>
              <th className="py-2.5 px-3 min-w-[170px]">Residente</th>
              <th className="py-2.5 px-3 w-12 text-center">Info</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {patients.map((patient) => {
              const doc = doctorMap.get(patient.doctorId);
              const res = doctorMap.get(patient.residentId);

              return (
                <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Leito */}
                  <td className="py-2 px-3 text-center">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                      {patient.bed}
                    </span>
                  </td>

                  {/* Nome */}
                  <td className="py-2 px-3 font-semibold text-slate-900 uppercase text-xs">
                    {patient.name}
                  </td>

                  {/* N° MV */}
                  <td className="py-2 px-3 text-center font-mono text-slate-500">
                    {patient.mv}
                  </td>

                  {/* Data */}
                  <td className="py-2 px-3 text-center text-slate-600">
                    {patient.date}
                  </td>

                  {/* Idade */}
                  <td className="py-2 px-3 text-center text-slate-600">
                    {patient.age}
                  </td>

                  {/* Médico Dropdown */}
                  <td className="py-1.5 px-3">
                    <select
                      value={patient.doctorId || ''}
                      onChange={(e) => onUpdatePatient(patient.id, { doctorId: e.target.value || null })}
                      className={`w-full text-xs font-medium px-2 py-1 rounded-md border outline-none cursor-pointer ${
                        doc
                          ? 'border-blue-200 bg-blue-50/50 text-blue-900'
                          : 'border-amber-200 bg-amber-50 text-amber-800'
                      }`}
                    >
                      <option value="">-- Sem Médico --</option>
                      {doctors
                        .filter(d => d.tag !== 'residente')
                        .map(d => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({DOCTOR_TAGS[d.tag.toUpperCase()]?.label || d.tag})
                          </option>
                        ))}
                    </select>
                  </td>

                  {/* Residente Dropdown */}
                  <td className="py-1.5 px-3">
                    <select
                      value={patient.residentId || ''}
                      onChange={(e) => onUpdatePatient(patient.id, { residentId: e.target.value || null })}
                      className={`w-full text-xs font-medium px-2 py-1 rounded-md border outline-none cursor-pointer ${
                        res
                          ? 'border-purple-200 bg-purple-50 text-purple-800 font-semibold'
                          : 'border-slate-200 bg-slate-50 text-slate-500'
                      }`}
                    >
                      <option value="">Sem Residente</option>
                      {doctors
                        .filter(d => d.tag === 'residente')
                        .map(r => (
                          <option key={r.id} value={r.id}>
                            + {r.name} (Residente)
                          </option>
                        ))}
                    </select>
                  </td>

                  {/* Explain / Info */}
                  <td className="py-2 px-3 text-center">
                    {onSelectExplain && (
                      <button
                        onClick={() => onSelectExplain(patient.id)}
                        title="Ver por que este médico foi alocado"
                        className="text-slate-400 hover:text-blue-600 p-1 rounded hover:bg-slate-100 transition-colors"
                      >
                        <Info size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
