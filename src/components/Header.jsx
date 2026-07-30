import React from 'react';
import { 
  Users, 
  Sparkles, 
  Printer, 
  Upload, 
  Calendar, 
  Sun, 
  RotateCcw,
  Info,
  Building2,
  Table,
  LayoutGrid,
  Database
} from 'lucide-react';
import { isSupabaseConfigured } from '../logic/supabaseClient';

export default function Header({ 
  selectedDate, 
  setSelectedDate, 
  isWeekend, 
  setIsWeekend, 
  activeDoctorsCount, 
  viewMode,
  setViewMode,
  onOpenDoctorManager, 
  onOpenImportModal, 
  onRunAllocation, 
  onOpenPrintView, 
  onOpenExplainModal,
  onResetDemo,
  onOpenSupabaseModal
}) {
  return (
    <header className="mb-6 pb-6 border-b border-slate-200 flex flex-col md:flex-row md:items-start justify-between gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-3">
          <Building2 className="text-blue-600" size={32} />
          Censo Hospitalar & Alocador USCS
        </h1>
        <div className="text-slate-600 mt-3 text-sm leading-relaxed space-y-1">
          <p>
            <strong>Para alocação de leitos:</strong> Importe o censo via PDF/foto ou cole o texto das colunas.
          </p>
          <p>
            <strong>Setores:</strong> 3°B (Enfermaria Clínica), 2°B (Enfermaria) e Colonoscopias agendadas.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 shrink-0">
        {/* Row 1: Date & Cloud Connection Status & View Mode */}
        <div className="flex flex-wrap items-center gap-2 justify-end">
          <button
            onClick={onOpenSupabaseModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border shadow-2xs text-xs font-semibold transition-colors ${
              isSupabaseConfigured
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
            }`}
            title="Sincronização entre múltiplos computadores"
          >
            <Database size={14} className={isSupabaseConfigured ? "text-emerald-600" : "text-amber-600"} />
            {isSupabaseConfigured ? '🟢 Nuvem Ativa (Supabase)' : '🟡 Conectar Nuvem'}
          </button>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs text-sm font-medium text-slate-700">
            <Calendar size={16} className="text-blue-600" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent outline-none cursor-pointer text-slate-800 font-medium"
            />
          </div>

          <button
            onClick={() => setIsWeekend(!isWeekend)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border shadow-2xs text-sm font-medium transition-colors ${
              isWeekend
                ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
            }`}
          >
            <Sun size={16} className={isWeekend ? "text-amber-500" : "text-blue-600"} />
            {isWeekend ? 'Fim de Semana / Feriado' : 'Dia Útil (2ª a 6ª)'}
          </button>

          {/* Toggle View Mode: Tabela vs Grade */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                viewMode === 'table' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Visualização em Tabela (Padrão)"
            >
              <Table size={14} />
              Tabela
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Visualização em Grade (Cards)"
            >
              <LayoutGrid size={14} />
              Grade
            </button>
          </div>

          <button
            onClick={onOpenDoctorManager}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-2xs hover:bg-slate-50 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            <Users size={16} className="text-blue-600" />
            Escala ({activeDoctorsCount} Vagas)
          </button>
        </div>

        {/* Row 2: Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 justify-end">
          <button
            onClick={onOpenImportModal}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-2xs hover:bg-slate-50 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            <Upload size={16} className="text-blue-600" />
            Importar Censo
          </button>

          <button
            onClick={onRunAllocation}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-2xs font-medium transition-colors text-sm"
          >
            <Sparkles size={16} />
            Distribuir Leitos
          </button>

          <button
            onClick={onOpenPrintView}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-2xs hover:bg-slate-50 hover:text-blue-600 transition-colors text-sm font-medium"
            title="Folha de Censo para Impressão / PDF"
          >
            <Printer size={16} />
            Imprimir
          </button>

          <button
            onClick={onOpenExplainModal}
            className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg shadow-2xs hover:bg-slate-50 hover:text-blue-600 transition-colors"
            title="Ver Lógica de Alocação"
          >
            <Info size={16} />
          </button>

          <button
            onClick={onResetDemo}
            className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg shadow-2xs hover:bg-slate-50 hover:text-amber-600 transition-colors"
            title="Restaurar Censo Padrão da Foto"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
