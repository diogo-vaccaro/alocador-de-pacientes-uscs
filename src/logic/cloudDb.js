/**
 * Serviço de Armazenamento Local / Fallback Offline
 */

const STORAGE_KEYS = {
  PATIENTS: 'uscs_censo_patients_v2',
  DOCTORS: 'uscs_censo_doctors_v2',
  HISTORY: 'uscs_censo_history_v2',
  ACTIVE_DOCTORS: 'uscs_censo_active_doctors_v2'
};

export const CloudStorageService = {
  loadPatients: (defaultPatients = []) => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      return data ? JSON.parse(data) : defaultPatients;
    } catch (e) {
      console.error('Erro ao carregar pacientes:', e);
      return defaultPatients;
    }
  },

  savePatients: (patients) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    } catch (e) {
      console.error('Erro ao salvar pacientes:', e);
    }
  },

  loadDoctors: (defaultDoctors = []) => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCTORS);
      return data ? JSON.parse(data) : defaultDoctors;
    } catch (e) {
      console.error('Erro ao carregar médicos:', e);
      return defaultDoctors;
    }
  },

  saveDoctors: (doctors) => {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
    } catch (e) {
      console.error('Erro ao salvar médicos:', e);
    }
  },

  loadHistory: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Erro ao carregar histórico:', e);
      return {};
    }
  },

  updateHistory: (patients) => {
    try {
      const history = CloudStorageService.loadHistory();
      patients.forEach(p => {
        if (p.doctorId) {
          history[p.id] = { doctorId: p.doctorId, lastUpdated: new Date().toISOString() };
          history[p.bed] = { doctorId: p.doctorId, lastUpdated: new Date().toISOString() };
        }
      });
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.error('Erro ao atualizar histórico:', e);
    }
  }
};
