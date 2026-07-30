import React, { useState } from 'react';
import { Database, ShieldCheck, ExternalLink } from 'lucide-react';
import { configureSupabaseCredentials, isSupabaseConfigured } from '../logic/supabaseClient';

export default function SupabaseConfigModal({ isOpen, onClose }) {
  const [url, setUrl] = useState(() => localStorage.getItem('uscs_supabase_url') || '');
  const [key, setKey] = useState(() => localStorage.getItem('uscs_supabase_anon_key') || '');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!url.trim() || !key.trim()) return;
    configureSupabaseCredentials(url, key);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-slate-100/70 border-b border-slate-200 px-5 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Database size={20} className="text-emerald-600" />
              Sincronização em Tempo Real (Supabase)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Conecte o aplicativo ao Supabase para sincronizar leitos e médicos entre computadores
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-xl font-bold">
            &times;
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 leading-relaxed flex items-start gap-2">
            <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Status Atual:</strong> {isSupabaseConfigured ? '🟢 Conectado em Nuvem (Multi-computadores Ativo)' : '🟡 Armazenamento Local (Aguardando Chave Supabase)'}
              <p className="mt-1 text-[11px] text-emerald-800">
                Cole a URL e a Anon Key do projeto Supabase abaixo. Uma vez salvas, qualquer mudança feita em um computador aparecerá instantaneamente em todos os outros!
              </p>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              SUPABASE PROJECT URL:
            </label>

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://xyz.supabase.co"
              className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-mono text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              SUPABASE ANON KEY:
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-mono text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2 flex justify-between items-center border-t border-slate-200">
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-600 hover:underline font-semibold flex items-center gap-1"
            >
              <ExternalLink size={14} /> Criar conta grátis no Supabase
            </a>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-2xs"
              >
                Conectar Supabase
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
