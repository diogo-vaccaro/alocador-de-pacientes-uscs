export const DOCTOR_TAGS = {
  COORDENADOR: { id: 'coordenador', label: 'Coordenador', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  VISITADOR_FIXO: { id: 'visitador_fixo', label: 'Visitador Fixo', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  VISITADOR_NAO_FIXO: { id: 'visitador_nao_fixo', label: 'Visitador Não Fixo', color: 'bg-sky-100 text-sky-800 border-sky-300' },
  PLANTONISTA: { id: 'plantonista', label: 'Plantonista', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  RESIDENTE: { id: 'residente', label: 'Residente', color: 'bg-purple-100 text-purple-800 border-purple-300' },
};

export const INITIAL_DOCTORS = [
  { id: 'doc-1', name: 'Cláudia Arini', tag: 'coordenador', color: '#2563eb' },
  { id: 'doc-2', name: 'Maristela', tag: 'coordenador', color: '#4f46e5' },
  { id: 'doc-3', name: 'Grace', tag: 'visitador_fixo', color: '#059669' },
  { id: 'doc-4', name: 'Elize', tag: 'visitador_nao_fixo', color: '#0284c7' },
  { id: 'doc-5', name: 'Luiza', tag: 'visitador_nao_fixo', color: '#0891b2' },
  { id: 'doc-6', name: 'Julia', tag: 'plantonista', color: '#d97706' },
  { id: 'doc-7', name: 'Plantonista 2', tag: 'plantonista', color: '#b45309' },
  // Residentes
  { id: 'res-1', name: 'Gabi', tag: 'residente', color: '#9333ea' },
  { id: 'res-2', name: 'Ingrid', tag: 'residente', color: '#db2777' },
  { id: 'res-3', name: 'Ana Maria', tag: 'residente', color: '#c026d3' },
  { id: 'res-4', name: 'Marlon', tag: 'residente', color: '#7c3aed' },
  { id: 'res-5', name: 'Janete', tag: 'residente', color: '#65a30d' },
];

export const DEFAULT_WEEKDAY_SLOTS = {
  coordenador1: 'doc-1',     // Cláudia Arini
  coordenador2: 'doc-2',     // Maristela
  visitadorFixo: 'doc-3',    // Grace
  visitadorNaoFixo: 'doc-4', // Elize
  plantonista1: 'doc-6',     // Julia
  plantonista2: 'doc-7',     // Plantonista 2
  residentes: ['res-1', 'res-2', 'res-3', 'res-4', 'res-5']
};

export const DEFAULT_WEEKEND_SLOTS = {
  visitador1: 'doc-4',       // Elize
  visitador2: 'doc-5',       // Luiza
  visitador3: 'doc-3',       // Grace
  plantonista1: 'doc-6',     // Julia
  plantonista2: 'doc-7',     // Plantonista 2
  residentes: ['res-1', 'res-2']
};

export const INITIAL_PATIENTS = [
  // 3°B Enfermaria Clínica
  { id: 'pat-301A', bed: '301A', name: 'VERA LUCIA MICHELE RAMOS', mv: '2939122', date: '27/07/2026', age: 82, sector: '3B', doctorId: 'doc-1', residentId: 'res-1' },
  { id: 'pat-301B', bed: '301B', name: 'MARCIONILA CINTRA', mv: '2938460', date: '27/07/2026', age: 84, sector: '3B', doctorId: 'doc-3', residentId: null },
  { id: 'pat-301C', bed: '301C', name: 'VALDECI MARIA DE BARROS SILVA', mv: '2934710', date: '23/07/2026', age: 76, sector: '3B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-302A', bed: '302A', name: 'MAURICIO MEDINA MACIEL', mv: '2934424', date: '23/07/2026', age: 67, sector: '3B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-302B', bed: '302B', name: 'SEBASTIAO CAETANO DE FARIA', mv: '2935872', date: '24/07/2026', age: 89, sector: '3B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-302C', bed: '302C', name: 'JOSE BENONI GOULART', mv: '2917674', date: '10/07/2026', age: 71, sector: '3B', doctorId: 'doc-5', residentId: null },
  { id: 'pat-303A', bed: '303A', name: 'MARIA LORETA BRAGA DA SILVA', mv: '2926842', date: '17/07/2026', age: 75, sector: '3B', doctorId: 'doc-3', residentId: null },
  { id: 'pat-303B', bed: '303B', name: 'SARITA PINHEIRO DA SILVA GOMES', mv: '2910045', date: '04/07/2026', age: 77, sector: '3B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-303C', bed: '303C', name: 'AMELIA YOSHIKO NAGAE OTA', mv: '2918559', date: '11/07/2026', age: 80, sector: '3B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-304A', bed: '304A', name: 'VALTER FAUSTINO', mv: '2940041', date: '28/07/2026', age: 72, sector: '3B', doctorId: 'doc-4', residentId: null },
  { id: 'pat-304B', bed: '304B', name: 'RENATO AMADUCI PEREIRA', mv: '2915731', date: '08/07/2026', age: 70, sector: '3B', doctorId: 'doc-5', residentId: null },
  { id: 'pat-304C', bed: '304C', name: 'JAIR JOSE DE SOUZA', mv: '2887653', date: '18/06/2026', age: 71, sector: '3B', doctorId: 'doc-1', residentId: null },
  { id: 'pat-305A', bed: '305A', name: 'DOLORES ALONSO VIDAL', mv: '2934668', date: '23/07/2026', age: 66, sector: '3B', doctorId: 'doc-6', residentId: 'res-1' },
  { id: 'pat-305B', bed: '305B', name: 'IRACEMA VAZ CARDOSO BENETTE', mv: '2935964', date: '24/07/2026', age: 96, sector: '3B', doctorId: 'doc-5', residentId: null },
  { id: 'pat-305C', bed: '305C', name: 'MARIA QUITERIA DA SILVA FEITOSA', mv: '2922430', date: '14/07/2026', age: 80, sector: '3B', doctorId: 'doc-5', residentId: null },
  { id: 'pat-306A', bed: '306A', name: 'MONICA MIDORI KAMIYAMA', mv: '2937108', date: '26/07/2026', age: 59, sector: '3B', doctorId: 'doc-4', residentId: null },
  { id: 'pat-306B', bed: '306B', name: 'MARIA JOSE BARBOSA PERINA', mv: '2932819', date: '22/07/2026', age: 81, sector: '3B', doctorId: 'doc-1', residentId: null },
  { id: 'pat-306C', bed: '306C', name: 'ORMINDA MARISA GARCIA BATISTA', mv: '2940004', date: '28/07/2026', age: 79, sector: '3B', doctorId: 'doc-3', residentId: null },
  { id: 'pat-307A', bed: '307A', name: 'NEIDE CAPELLA', mv: '2921373', date: '14/07/2026', age: 61, sector: '3B', doctorId: 'doc-4', residentId: null },
  { id: 'pat-307B', bed: '307B', name: 'MARIA FERREIRA FILHA', mv: '2940313', date: '28/07/2026', age: 93, sector: '3B', doctorId: 'doc-3', residentId: null },
  { id: 'pat-307C', bed: '307C', name: 'JOSEFA DA SILVA SOUZA', mv: '2927366', date: '18/07/2026', age: 71, sector: '3B', doctorId: 'doc-5', residentId: null },
  { id: 'pat-308A', bed: '308A', name: 'JUVENAL BARBOSA DE OLIVEIRA', mv: '2929922', date: '20/07/2026', age: 76, sector: '3B', doctorId: 'doc-3', residentId: 'res-1' },
  { id: 'pat-308B', bed: '308B', name: 'MARIO AOYAMA', mv: '2930031', date: '20/07/2026', age: 78, sector: '3B', doctorId: 'doc-1', residentId: null },
  { id: 'pat-308C', bed: '308C', name: 'JOSE CARLOS VERONESE', mv: '2937830', date: '26/07/2026', age: 70, sector: '3B', doctorId: 'doc-4', residentId: 'res-1' },
  { id: 'pat-309A', bed: '309A', name: 'ROMILDA MENEGOCCI DO AMARAL', mv: '2939193', date: '27/07/2026', age: 95, sector: '3B', doctorId: 'doc-3', residentId: null },
  { id: 'pat-309B', bed: '309B', name: 'ANGELINA LORO PEREIRA', mv: '2931518', date: '21/07/2026', age: 92, sector: '3B', doctorId: 'doc-1', residentId: null },
  { id: 'pat-309C', bed: '309C', name: 'CRISTINA DE ALMEIDA RICELLI', mv: '2906081', date: '01/07/2026', age: 85, sector: '3B', doctorId: 'doc-1', residentId: null },
  { id: 'pat-310A', bed: '310A', name: 'VALDEMIR PEREIRA DE MIRANDA', mv: '2877471', date: '11/06/2026', age: 72, sector: '3B', doctorId: 'doc-1', residentId: null },
  { id: 'pat-310B', bed: '310B', name: 'ANTONIO PEREIRA', mv: '2931061', date: '21/07/2026', age: 93, sector: '3B', doctorId: 'doc-4', residentId: null },
  { id: 'pat-310C', bed: '310C', name: 'FIDELCINO DOS SANTOS', mv: '2864426', date: '02/06/2026', age: 73, sector: '3B', doctorId: 'doc-5', residentId: 'res-1' },
  { id: 'pat-311A', bed: '311A', name: 'MAURICIO VIEIRA', mv: '2912594', date: '06/07/2026', age: 56, sector: '3B', doctorId: 'doc-3', residentId: null },
  { id: 'pat-311B', bed: '311B', name: 'MARCIO ROBERTO ROSA', mv: '2937061', date: '25/07/2026', age: 50, sector: '3B', doctorId: 'doc-5', residentId: null },

  // 2°B Enfermaria
  { id: 'pat-202A', bed: '202A', name: 'INGRID', mv: '---', date: '28/07/2026', age: '--', sector: '2B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-202C', bed: '202C', name: 'ANA MARIA', mv: '---', date: '28/07/2026', age: '--', sector: '2B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-203C', bed: '203C', name: 'MARIA FERREIRA', mv: '---', date: '28/07/2026', age: '--', sector: '2B', doctorId: 'doc-4', residentId: null },
  { id: 'pat-206A', bed: '206A', name: 'MARLON', mv: '---', date: '28/07/2026', age: '--', sector: '2B', doctorId: 'doc-4', residentId: 'res-1' },
  { id: 'pat-211A', bed: '211A', name: 'JANETE', mv: '---', date: '28/07/2026', age: '--', sector: '2B', doctorId: 'doc-4', residentId: null },

  // Colonoscopias
  { id: 'pat-col-1', bed: '206C', name: 'ROSANA VIEIRA', mv: '---', date: '29/07/2026', age: '--', sector: 'COLONO', doctorId: null, residentId: null, notes: 'Colonoscopia agendada' }
];
