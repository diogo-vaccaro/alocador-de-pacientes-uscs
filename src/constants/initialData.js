/**
 * Dados iniciais para o Alocador de Pacientes USCS
 * Os pacientes iniciam em branco por padrão para uso em produção no hospital.
 */

export const DOCTOR_TAGS = {
  COORDENADOR: { label: 'Coordenador', color: '#1d4ed8', priority: 1 },
  VISITADOR_FIXO: { label: 'Visitador Fixo', color: '#047857', priority: 2 },
  VISITADOR_NAO_FIXO: { label: 'Visitador Não Fixo', color: '#0284c7', priority: 3 },
  PLANTONISTA: { label: 'Plantonista', color: '#d97706', priority: 4 },
  RESIDENTE: { label: 'Residente', color: '#7c3aed', priority: 5 },
};

// Médicos cadastrados na equipe USCS
export const INITIAL_DOCTORS = [
  { id: 'doc-1', name: 'Cláudia Arini', tag: 'coordenador', color: '#2563eb' },
  { id: 'doc-2', name: 'Maristela', tag: 'coordenador', color: '#4f46e5' },
  { id: 'doc-3', name: 'Grace', tag: 'visitador_fixo', color: '#059669' },
  { id: 'doc-4', name: 'Elize', tag: 'visitador_nao_fixo', color: '#0284c7' },
  { id: 'doc-5', name: 'Luiza', tag: 'visitador_nao_fixo', color: '#0891b2' },
  { id: 'doc-6', name: 'Julia', tag: 'plantonista', color: '#d97706' },
  { id: 'doc-7', name: 'Plantonista 2', tag: 'plantonista', color: '#b45309' },
  { id: 'res-1', name: 'Gabi', tag: 'residente', color: '#7c3aed' },
  { id: 'res-2', name: 'Ingrid', tag: 'residente', color: '#db2777' },
  { id: 'res-3', name: 'Ana Maria', tag: 'residente', color: '#c026d3' },
  { id: 'res-4', name: 'Marlon', tag: 'residente', color: '#9333ea' },
  { id: 'res-5', name: 'Janete', tag: 'residente', color: '#6b21a8' },
];

// Vagas padrão do plantão de Segunda a Sexta (2ª a 6ª)
export const DEFAULT_WEEKDAY_SLOTS = {
  coordenador1: 'doc-1',  // Cláudia Arini
  coordenador2: 'doc-2',  // Maristela
  visitadorFixo: 'doc-3', // Grace
  visitadorNaoFixo: 'doc-4', // Elize
  plantonista1: 'doc-6',  // Julia
  plantonista2: 'doc-7',  // Plantonista 2
  residentes: ['res-1', 'res-2', 'res-3', 'res-4', 'res-5']
};

// Vagas padrão do plantão de Sábado, Domingo e Feriados
export const DEFAULT_WEEKEND_SLOTS = {
  visitador1: 'doc-4',
  visitador2: 'doc-5',
  visitador3: 'doc-6',
  plantonista1: 'doc-7',
  plantonista2: 'doc-6',
  residentes: ['res-1', 'res-2']
};

// Pacientes iniciam em BRANCO por padrão para inclusão limpa
export const INITIAL_PATIENTS = [];

// Modelo de demonstração (caso o usuário clique em restaurar demo)
export const DEMO_PATIENTS_MODEL = [
  { id: 'pat-1', bed: '301A', name: 'VERA LUCIA MICHELE RAMOS', mv: '2939122', date: '27/07/2026', age: '82', sector: '3B', doctorId: 'doc-1', residentId: 'res-1' },
  { id: 'pat-2', bed: '301B', name: 'MARCIONILA CINTRA', mv: '2938460', date: '27/07/2026', age: '84', sector: '3B', doctorId: 'doc-3', residentId: null },
  { id: 'pat-3', bed: '301C', name: 'VALDECI MARIA DE BARROS SILVA', mv: '2934710', date: '23/07/2026', age: '76', sector: '3B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-4', bed: '302A', name: 'MAURICIO MEDINA MACIEL', mv: '2934424', date: '23/07/2026', age: '67', sector: '3B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-5', bed: '302B', name: 'SEBASTIAO CAETANO DE FARIA', mv: '2935872', date: '24/07/2026', age: '89', sector: '3B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-6', bed: '302C', name: 'JOSE BENONI GOULART', mv: '2917674', date: '10/07/2026', age: '71', sector: '2B', doctorId: 'doc-5', residentId: null },
  { id: 'pat-7', bed: '303A', name: 'MARIA LORETA BRAGA DA SILVA', mv: '2926842', date: '17/07/2026', age: '75', sector: '3B', doctorId: 'doc-3', residentId: null },
  { id: 'pat-8', bed: '303B', name: 'SARITA PINHEIRO DA SILVA GOMES', mv: '2910045', date: '04/07/2026', age: '77', sector: '3B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-9', bed: '303C', name: 'AMELIA YOSHIKO NAGAE OTA', mv: '2918559', date: '11/07/2026', age: '80', sector: '3B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-10', bed: '304A', name: 'VALTER FAUSTINO', mv: '2940041', date: '28/07/2026', age: '72', sector: '3B', doctorId: 'doc-4', residentId: null },
  { id: 'pat-11', bed: '304B', name: 'RENATO AMADUCI PEREIRA', mv: '2915731', date: '08/07/2026', age: '70', sector: '2B', doctorId: 'doc-5', residentId: null },
  { id: 'pat-12', bed: '304C', name: 'JAIR JOSE DE SOUZA', mv: '2887653', date: '18/06/2026', age: '71', sector: '3B', doctorId: 'doc-1', residentId: null },
  { id: 'pat-13', bed: '305A', name: 'DOLORES ALONSO VIDAL', mv: '2934668', date: '23/07/2026', age: '66', sector: '3B', doctorId: 'doc-6', residentId: 'res-1' },
  { id: 'pat-14', bed: '305B', name: 'IRACEMA VAZ CARDOSO BENETTE', mv: '2935964', date: '24/07/2026', age: '96', sector: '2B', doctorId: 'doc-5', residentId: null },
  { id: 'pat-15', bed: '305C', name: 'MARIA QUITERIA DA SILVA FEITOSA', mv: '2922430', date: '14/07/2026', age: '80', sector: '2B', doctorId: 'doc-5', residentId: null },
  { id: 'pat-16', bed: '306A', name: 'MONICA MIDORI KAMIYAMA', mv: '2937108', date: '26/07/2026', age: '59', sector: '3B', doctorId: 'doc-4', residentId: null },
  { id: 'pat-17', bed: '306B', name: 'MARIA JOSE BARBOSA PERINA', mv: '2932819', date: '22/07/2026', age: '81', sector: '3B', doctorId: 'doc-1', residentId: null },
  { id: 'pat-18', bed: '306C', name: 'ORMINDA MARISA GARCIA BATISTA', mv: '2940004', date: '28/07/2026', age: '79', sector: '3B', doctorId: 'doc-3', residentId: null },
  { id: 'pat-19', bed: '307A', name: 'NEIDE CAPELLA', mv: '2921373', date: '14/07/2026', age: '61', sector: '3B', doctorId: 'doc-4', residentId: null },
  { id: 'pat-20', bed: '307B', name: 'MARIA FERREIRA FILHA', mv: '2940313', date: '28/07/2026', age: '93', sector: '3B', doctorId: 'doc-3', residentId: null },
  { id: 'pat-21', bed: '307C', name: 'JOSEFA DA SILVA SOUZA', mv: '2927366', date: '18/07/2026', age: '71', sector: '2B', doctorId: 'doc-5', residentId: null },
  { id: 'pat-22', bed: '308A', name: 'JUVENAL BARBOSA DE OLIVEIRA', mv: '2929922', date: '20/07/2026', age: '76', sector: '3B', doctorId: 'doc-3', residentId: 'res-1' },
  { id: 'pat-23', bed: '308B', name: 'MARIO AOYAMA', mv: '2930031', date: '20/07/2026', age: '78', sector: '3B', doctorId: 'doc-1', residentId: null },
  { id: 'pat-24', bed: '308C', name: 'JOSE CARLOS VERONESE', mv: '2937830', date: '26/07/2026', age: '70', sector: '3B', doctorId: 'doc-4', residentId: 'res-1' },
  { id: 'pat-25', bed: '309A', name: 'ROMILDA MENEGOCCI DO AMARAL', mv: '2939193', date: '27/07/2026', age: '95', sector: '3B', doctorId: 'doc-3', residentId: null },
  { id: 'pat-26', bed: '309B', name: 'ANGELINA LORO PEREIRA', mv: '2931518', date: '21/07/2026', age: '92', sector: '3B', doctorId: 'doc-1', residentId: null },
  { id: 'pat-27', bed: '309C', name: 'CRISTINA DE ALMEIDA RICELLI', mv: '2906081', date: '01/07/2026', age: '85', sector: '3B', doctorId: 'doc-1', residentId: null },
  { id: 'pat-28', bed: '310A', name: 'VALDEMIR PEREIRA DE MIRANDA', mv: '2877471', date: '11/06/2026', age: '72', sector: '3B', doctorId: 'doc-1', residentId: null },
  { id: 'pat-29', bed: '310B', name: 'ANTONIO PEREIRA', mv: '2931061', date: '21/07/2026', age: '93', sector: '3B', doctorId: 'doc-4', residentId: null },
  { id: 'pat-30', bed: '310C', name: 'FIDELCINO DOS SANTOS', mv: '2864426', date: '02/06/2026', age: '73', sector: '2B', doctorId: 'doc-2', residentId: 'res-1' },
  { id: 'pat-31', bed: '311A', name: 'MAURICIO VIEIRA', mv: '2912594', date: '06/07/2026', age: '56', sector: '3B', doctorId: 'doc-3', residentId: null },
  { id: 'pat-32', bed: '311B', name: 'MARCIO ROBERTO ROSA', mv: '2937061', date: '25/07/2026', age: '50', sector: '3B', doctorId: 'doc-5', residentId: null },
  { id: 'pat-33', bed: '202A', name: 'INGRID', mv: '---', date: '---', age: '--', sector: '2B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-34', bed: '202C', name: 'ANA MARIA', mv: '---', date: '---', age: '--', sector: '2B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-35', bed: '203C', name: 'MARIA FERREIRA', mv: '---', date: '---', age: '--', sector: '2B', doctorId: 'doc-4', residentId: null },
  { id: 'pat-36', bed: '206A', name: 'MARLON', mv: '---', date: '---', age: '--', sector: '2B', doctorId: 'doc-4', residentId: 'res-1' },
  { id: 'pat-37', bed: '211A', name: 'JANETE', mv: '---', date: '---', age: '--', sector: '2B', doctorId: 'doc-6', residentId: null },
  { id: 'pat-38', bed: '206C', name: 'ROSANA VIEIRA', mv: '---', date: '---', age: '--', sector: 'COLONO', doctorId: null, residentId: null }
];
