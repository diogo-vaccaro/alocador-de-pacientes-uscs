/**
 * Serviço de Persistência e Sincronização em Nuvem do Censo Hospitalar
 * Gerencia o armazenamento local e em nuvem dos dados de médicos, censo e histórico de alocações.
 */

const STORAGE_KEYS = {
  PATIENTS: 'censo_patients_v1',
  DOCTORS: 'censo_doctors_v1',
  ACTIVE_DOCTORS: 'censo_active_doctors_v1',
  HISTORY: 'censo_history_v1',
  CLOUD_CONFIG: 'censo_cloud_config_v1',
};

export const CloudStorageService = {
  // Salvar médicos
  saveDoctors(doctors) {
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
  },

  loadDoctors(defaultDoctors) {
    const data = localStorage.getItem(STORAGE_KEYS.DOCTORS);
    return data ? JSON.parse(data) : defaultDoctors;
  },

  // Salvar médicos ativos no plantão do dia
  saveActiveDoctors(doctorIds) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_DOCTORS, JSON.stringify(doctorIds));
  },

  loadActiveDoctors(defaultIds) {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_DOCTORS);
    return data ? JSON.parse(data) : defaultIds;
  },

  // Salvar pacientes
  savePatients(patients) {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    this.updateHistory(patients);
  },

  loadPatients(defaultPatients) {
    const data = localStorage.getItem(STORAGE_KEYS.PATIENTS);
    return data ? JSON.parse(data) : defaultPatients;
  },

  // Salvar / atualizar histórico de vinculações paciente -> médico
  updateHistory(patients) {
    const history = this.loadHistory();
    const today = new Date().toISOString().split('T')[0];

    patients.forEach(p => {
      if (p.doctorId) {
        history[p.id] = {
          patientName: p.name,
          bed: p.bed,
          doctorId: p.doctorId,
          residentId: p.residentId || null,
          lastUpdated: today,
        };
        // Também indexa por leito para rápida consulta
        history[p.bed] = history[p.id];
      }
    });

    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  },

  loadHistory() {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : {};
  },

  // Exportar backup completo do sistema em arquivo JSON
  exportJSONBackup(state) {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `censo_hospitalar_backup_${new Date().toISOString().slice(0,10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },

  // Importar backup JSON
  importJSONBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.doctors) this.saveDoctors(data.doctors);
      if (data.patients) this.savePatients(data.patients);
      if (data.activeDoctors) this.saveActiveDoctors(data.activeDoctors);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
