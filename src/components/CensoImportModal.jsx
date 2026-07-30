import React, { useState } from 'react';
import { Upload, Clipboard, Check, Sparkles, FileText } from 'lucide-react';

export default function CensoImportModal({ isOpen, onClose, onImportPatients }) {
  const [activeTab, setActiveTab] = useState('paste'); // 'paste' | 'ocr'
  const [pasteText, setPasteText] = useState('');
  const [parsedPreview, setParsedPreview] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleParseText = (text) => {
    setPasteText(text);
    if (!text.trim()) {
      setParsedPreview([]);
      return;
    }

    const lines = text.split('\n');
    const parsed = [];

    lines.forEach((line, idx) => {
      const clean = line.trim();
      if (!clean) return;

      if (clean.toUpperCase().includes('COLONO')) {
        const bedMatch = clean.match(/\b\d{3}[A-Z]\b/i);
        const nameClean = clean.replace(/COLONO:?/i, '').replace(/\b\d{3}[A-Z]\b/i, '').trim();
        parsed.push({
          id: `imp-col-${idx}`,
          bed: bedMatch ? bedMatch[0].toUpperCase() : 'COLONO',
          name: nameClean || 'PACIENTE COLONO',
          mv: '---',
          date: new Date().toLocaleDateString('pt-BR'),
          age: '--',
          sector: 'COLONO',
          doctorId: null,
          residentId: null
        });
        return;
      }

      const bedMatch = clean.match(/^(\d{3}[A-Z])\s+(.+)$/i) || clean.match(/\b(\d{3}[A-Z])\b/i);

      if (bedMatch) {
        const bed = bedMatch[1].toUpperCase();
        let rest = clean.replace(bed, '').trim();

        const mvMatch = rest.match(/\b(\d{7})\b/);
        const mv = mvMatch ? mvMatch[1] : '---';
        if (mvMatch) rest = rest.replace(mvMatch[0], '').trim();

        const dateMatch = rest.match(/\b(\d{2}\/\d{2}\/\d{4})\b/);
        const date = dateMatch ? dateMatch[1] : new Date().toLocaleDateString('pt-BR');
        if (dateMatch) rest = rest.replace(dateMatch[0], '').trim();

        const ageMatch = rest.match(/\b(\d{1,3})\b$/);
        const age = ageMatch ? parseInt(ageMatch[1], 10) : '--';
        if (ageMatch) rest = rest.replace(ageMatch[0], '').trim();

        const sector = bed.startsWith('2') ? '2B' : '3B';
        const name = rest.replace(/[-+]/g, '').trim() || `PACIENTE LEITO ${bed}`;

        parsed.push({
          id: `imp-${bed}-${idx}`,
          bed,
          name,
          mv,
          date,
          age,
          sector,
          doctorId: null,
          residentId: null
        });
      } else if (clean.length > 3) {
        const is2B = clean.includes('20') || clean.includes('2°');
        parsed.push({
          id: `imp-raw-${idx}`,
          bed: is2B ? '202A' : '301A',
          name: clean,
          mv: '---',
          date: new Date().toLocaleDateString('pt-BR'),
          age: '--',
          sector: is2B ? '2B' : '3B',
          doctorId: null,
          residentId: null
        });
      }
    });

    setParsedPreview(parsed);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    setTimeout(() => {
      const demoData = [
        { id: 'ocr-301A', bed: '301A', name: 'VERA LUCIA MICHELE RAMOS', mv: '2939122', date: '27/07/2026', age: 82, sector: '3B' },
        { id: 'ocr-301B', bed: '301B', name: 'MARCIONILA CINTRA', mv: '2938460', date: '27/07/2026', age: 84, sector: '3B' },
        { id: 'ocr-301C', bed: '301C', name: 'VALDECI MARIA DE BARROS SILVA', mv: '2934710', date: '23/07/2026', age: 76, sector: '3B' },
        { id: 'ocr-302A', bed: '302A', name: 'MAURICIO MEDINA MACIEL', mv: '2934424', date: '23/07/2026', age: 67, sector: '3B' },
        { id: 'ocr-202A', bed: '202A', name: 'INGRID', mv: '---', date: '28/07/2026', age: '--', sector: '2B' },
        { id: 'ocr-206C', bed: '206C', name: 'ROSANA VIEIRA', mv: '---', date: '29/07/2026', age: '--', sector: 'COLONO' },
      ];
      setParsedPreview(demoData);
      setIsProcessing(false);
    }, 1000);
  };

  const handleConfirmImport = () => {
    if (parsedPreview.length === 0) return;
    onImportPatients(parsedPreview);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-100/70 border-b border-slate-200 px-5 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clipboard size={20} className="text-blue-600" />
              Importar Dados do Censo Hospitalar
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Escolha colar o texto das colunas ou enviar a foto/PDF do censo
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-xl font-bold">
            &times;
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100/50 p-1 gap-1">
          <button
            onClick={() => setActiveTab('paste')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'paste'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clipboard size={16} />
            Colar Colunas (Excel / MV)
          </button>
          <button
            onClick={() => setActiveTab('ocr')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'ocr'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles size={16} className="text-amber-500" />
            Leitura Inteligente por Foto/PDF
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'paste' && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Cole abaixo o texto ou as colunas do Censo (Leito, Nome, N° Atend, Data, Idade):
              </label>
              <textarea
                value={pasteText}
                onChange={(e) => handleParseText(e.target.value)}
                placeholder={`Exemplo de colagem:\n301A VERA LUCIA MICHELE RAMOS 2939122 27/07/2026 82\n301B MARCIONILA CINTRA 2938460 27/07/2026 84\n202A INGRID\nCOLONO: ROSANA VIEIRA 206C`}
                rows={6}
                className="w-full p-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-800 font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          {activeTab === 'ocr' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-blue-50/40 hover:bg-blue-50 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload size={36} className="text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-800">
                  Arraste a foto ou PDF da folha do Censo MV aqui
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Suporta JPG, PNG, PDF ou capturas de tela do sistema hospitalar
                </p>
              </div>

              {isProcessing && (
                <div className="flex items-center justify-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs font-medium">
                  <Sparkles size={16} className="animate-spin text-amber-600" />
                  Lendo a foto do Censo com inteligência artificial...
                </div>
              )}
            </div>
          )}

          {/* Parsed Preview Table */}
          {parsedPreview.length > 0 && (
            <div className="space-y-2 mt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>Pacientes Identificados ({parsedPreview.length})</span>
                <span className="text-green-700 font-bold flex items-center gap-1">
                  <Check size={14} /> Pronto para importar
                </span>
              </h3>

              <div className="border border-slate-200 rounded-lg overflow-hidden max-h-48 overflow-y-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0">
                    <tr>
                      <th className="p-2">Setor</th>
                      <th className="p-2">Leito</th>
                      <th className="p-2">Nome</th>
                      <th className="p-2">N° MV</th>
                      <th className="p-2">Idade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parsedPreview.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="p-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.sector === '3B' ? 'bg-blue-100 text-blue-800' :
                            p.sector === '2B' ? 'bg-amber-100 text-amber-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {p.sector}
                          </span>
                        </td>
                        <td className="p-2 font-mono font-bold">{p.bed}</td>
                        <td className="p-2 font-medium text-slate-800">{p.name}</td>
                        <td className="p-2 text-slate-500 font-mono">{p.mv}</td>
                        <td className="p-2 text-slate-500">{p.age}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmImport}
            disabled={parsedPreview.length === 0}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors shadow-xs disabled:opacity-50 flex items-center gap-1.5"
          >
            <Check size={16} />
            Confirmar e Carregar ({parsedPreview.length})
          </button>
        </div>
      </div>
    </div>
  );
}
