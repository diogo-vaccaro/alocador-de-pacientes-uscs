import React, { useState } from 'react';
import { DOCTOR_TAGS } from '../constants/initialData';
import { UserPlus, Calendar, Sun, Users, Check, Trash2 } from 'lucide-react';

export default function DoctorManager({ 
  doctors, 
  onDeleteDoctor,
  shiftSlots, 
  onUpdateSlot, 
  onToggleResidentInShift,
  onAddDoctor, 
  onApplyPreset, 
  isWeekend,
  isOpen, 
  onClose 
}) {
  const [newDocName, setNewDocName] = useState('');
  const [newDocTag, setNewDocTag] = useState('plantonista');
  const [showDeleteList, setShowDeleteList] = useState(false);

  if (!isOpen) return null;

  const nonResidentDoctors = doctors.filter(d => d.tag !== 'residente');
  const residentDoctors = doctors.filter(d => d.tag === 'residente');

  const handleCreateDoctor = (e) => {
    e.preventDefault();
    if (!newDocName.trim()) return;
    onAddDoctor({
      id: `doc-custom-${Date.now()}`,
      name: newDocName.trim(),
      tag: newDocTag,
      color: '#2563eb'
    });
    setNewDocName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-100/70 border-b border-slate-200 px-5 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              Escala de Plantão & Cadastro de Médicos
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Defina as vagas do dia e gerencie os médicos cadastrados no sistema
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-xl font-bold">
            &times;
          </button>
        </div>

        {/* Quick Presets */}
        <div className="p-4 bg-blue-50/50 border-b border-blue-100 flex flex-wrap gap-3 items-center justify-between">
          <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
            Predefinir Escala do Dia:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onApplyPreset('weekday')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors shadow-2xs ${
                !isWeekend ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Calendar size={14} />
              2ª a 6ª (2 Coordenadores + Visitador Fixo + Visitador NF + 2 Plantonistas)
            </button>
            <button
              onClick={() => onApplyPreset('weekend')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors shadow-2xs ${
                isWeekend ? 'bg-amber-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Sun size={14} />
              Sábado / Domingo / Feriado (3 Visitadores + 2 Plantonistas)
            </button>
          </div>
        </div>

        {/* Content Body - VAGAS DO DIA */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          
          {!isWeekend ? (
            /* VAGAS SEGUNDA A SEXTA */
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100">
                Vagas do Plantão — Dia Útil (2ª a 6ª)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Coordenador 1 */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    👑 Coordenador 1
                  </label>
                  <select
                    value={shiftSlots.coordenador1 || ''}
                    onChange={(e) => onUpdateSlot('coordenador1', e.target.value)}
                    className="w-full text-xs font-medium p-2 rounded-md border border-slate-300 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Selecionar Médico --</option>
                    {nonResidentDoctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({DOCTOR_TAGS[d.tag.toUpperCase()]?.label || d.tag})</option>
                    ))}
                  </select>
                </div>

                {/* Coordenador 2 */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    👑 Coordenador 2
                  </label>
                  <select
                    value={shiftSlots.coordenador2 || ''}
                    onChange={(e) => onUpdateSlot('coordenador2', e.target.value)}
                    className="w-full text-xs font-medium p-2 rounded-md border border-slate-300 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Selecionar Médico --</option>
                    {nonResidentDoctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({DOCTOR_TAGS[d.tag.toUpperCase()]?.label || d.tag})</option>
                    ))}
                  </select>
                </div>

                {/* Visitador Fixo */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    📌 Visitador Fixo
                  </label>
                  <select
                    value={shiftSlots.visitadorFixo || ''}
                    onChange={(e) => onUpdateSlot('visitadorFixo', e.target.value)}
                    className="w-full text-xs font-medium p-2 rounded-md border border-slate-300 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Selecionar Médico --</option>
                    {nonResidentDoctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({DOCTOR_TAGS[d.tag.toUpperCase()]?.label || d.tag})</option>
                    ))}
                  </select>
                </div>

                {/* Visitador Não Fixo */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    🔄 Visitador Não Fixo
                  </label>
                  <select
                    value={shiftSlots.visitadorNaoFixo || ''}
                    onChange={(e) => onUpdateSlot('visitadorNaoFixo', e.target.value)}
                    className="w-full text-xs font-medium p-2 rounded-md border border-slate-300 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Selecionar Médico --</option>
                    {nonResidentDoctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({DOCTOR_TAGS[d.tag.toUpperCase()]?.label || d.tag})</option>
                    ))}
                  </select>
                </div>

                {/* Plantonista 1 */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    🏥 Plantonista 1
                  </label>
                  <select
                    value={shiftSlots.plantonista1 || ''}
                    onChange={(e) => onUpdateSlot('plantonista1', e.target.value)}
                    className="w-full text-xs font-medium p-2 rounded-md border border-slate-300 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Selecionar Médico --</option>
                    {nonResidentDoctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({DOCTOR_TAGS[d.tag.toUpperCase()]?.label || d.tag})</option>
                    ))}
                  </select>
                </div>

                {/* Plantonista 2 */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    🏥 Plantonista 2
                  </label>
                  <select
                    value={shiftSlots.plantonista2 || ''}
                    onChange={(e) => onUpdateSlot('plantonista2', e.target.value)}
                    className="w-full text-xs font-medium p-2 rounded-md border border-slate-300 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Selecionar Médico --</option>
                    {nonResidentDoctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({DOCTOR_TAGS[d.tag.toUpperCase()]?.label || d.tag})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            /* VAGAS SÁBADO, DOMINGO E FERIADO */
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-3 py-1.5 rounded-md border border-amber-100">
                Vagas do Plantão — Final de Semana / Feriado
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visitador 1 */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    🔄 Visitador 1
                  </label>
                  <select
                    value={shiftSlots.visitador1 || ''}
                    onChange={(e) => onUpdateSlot('visitador1', e.target.value)}
                    className="w-full text-xs font-medium p-2 rounded-md border border-slate-300 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Selecionar Médico --</option>
                    {nonResidentDoctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({DOCTOR_TAGS[d.tag.toUpperCase()]?.label || d.tag})</option>
                    ))}
                  </select>
                </div>

                {/* Visitador 2 */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    🔄 Visitador 2
                  </label>
                  <select
                    value={shiftSlots.visitador2 || ''}
                    onChange={(e) => onUpdateSlot('visitador2', e.target.value)}
                    className="w-full text-xs font-medium p-2 rounded-md border border-slate-300 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Selecionar Médico --</option>
                    {nonResidentDoctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({DOCTOR_TAGS[d.tag.toUpperCase()]?.label || d.tag})</option>
                    ))}
                  </select>
                </div>

                {/* Visitador 3 */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    🔄 Visitador 3
                  </label>
                  <select
                    value={shiftSlots.visitador3 || ''}
                    onChange={(e) => onUpdateSlot('visitador3', e.target.value)}
                    className="w-full text-xs font-medium p-2 rounded-md border border-slate-300 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Selecionar Médico --</option>
                    {nonResidentDoctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({DOCTOR_TAGS[d.tag.toUpperCase()]?.label || d.tag})</option>
                    ))}
                  </select>
                </div>

                {/* Plantonista 1 */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    🏥 Plantonista 1
                  </label>
                  <select
                    value={shiftSlots.plantonista1 || ''}
                    onChange={(e) => onUpdateSlot('plantonista1', e.target.value)}
                    className="w-full text-xs font-medium p-2 rounded-md border border-slate-300 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Selecionar Médico --</option>
                    {nonResidentDoctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({DOCTOR_TAGS[d.tag.toUpperCase()]?.label || d.tag})</option>
                    ))}
                  </select>
                </div>

                {/* Plantonista 2 */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    🏥 Plantonista 2
                  </label>
                  <select
                    value={shiftSlots.plantonista2 || ''}
                    onChange={(e) => onUpdateSlot('plantonista2', e.target.value)}
                    className="w-full text-xs font-medium p-2 rounded-md border border-slate-300 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Selecionar Médico --</option>
                    {nonResidentDoctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({DOCTOR_TAGS[d.tag.toUpperCase()]?.label || d.tag})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* RESIDENTES ATIVOS NO PLANTÃO */}
          <div className="p-4 bg-purple-50/50 rounded-lg border border-purple-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-2">
              🎓 Residentes Escalados Hoje (1 a 3 ou mais)
            </h4>
            <div className="flex flex-wrap gap-3">
              {residentDoctors.map(res => {
                const isSelected = (shiftSlots.residentes || []).includes(res.id);
                return (
                  <label
                    key={res.id}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer border transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-700 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-100/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleResidentInShift(res.id)}
                      className="hidden"
                    />
                    {isSelected && <Check size={14} />}
                    {res.name}
                  </label>
                );
              })}
            </div>
          </div>

          {/* CADASTRAR NOVO MÉDICO */}
          <form onSubmit={handleCreateDoctor} className="pt-4 border-t border-slate-200">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <UserPlus size={15} className="text-blue-600" /> Cadastrar Novo Médico no Banco
            </h3>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                placeholder="Nome do Médico ou Residente"
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
              <select
                value={newDocTag}
                onChange={(e) => setNewDocTag(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
              >
                <option value="coordenador">Coordenador</option>
                <option value="visitador_fixo">Visitador Fixo</option>
                <option value="visitador_nao_fixo">Visitador Não Fixo</option>
                <option value="plantonista">Plantonista</option>
                <option value="residente">Residente</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserPlus size={16} /> Cadastrar
              </button>
            </div>
          </form>

          {/* GERENCIAR / DESCADASTRAR MÉDICOS */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Trash2 size={15} className="text-rose-600" /> Gerenciar / Descadastrar Médicos
              </h3>
              <button
                type="button"
                onClick={() => setShowDeleteList(!showDeleteList)}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                {showDeleteList ? 'Ocultar Lista' : 'Exibir Lista para Remover'}
              </button>
            </div>

            {showDeleteList && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
                {doctors.map(doc => (
                  <div key={doc.id} className="flex justify-between items-center py-1.5 px-3 bg-white rounded border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-800">
                      {doc.name} <span className="text-slate-500 font-normal">({DOCTOR_TAGS[doc.tag.toUpperCase()]?.label || doc.tag})</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Tem certeza que deseja descadastrar o médico ${doc.name}?`)) {
                          onDeleteDoctor(doc.id);
                        }
                      }}
                      className="text-rose-500 hover:text-rose-700 p-1 hover:bg-rose-50 rounded transition-colors flex items-center gap-1 font-semibold"
                      title="Remover médico"
                    >
                      <Trash2 size={14} /> Excluir
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            Concluir Escala do Dia
          </button>
        </div>
      </div>
    </div>
  );
}
