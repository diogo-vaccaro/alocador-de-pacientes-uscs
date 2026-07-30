/**
 * Motor de Alocação de Pacientes do Censo Hospitalar
 * Suporta atribuição dinâmica de papeis (ex: Júlia como Plantonista na 2ª e Visitador NF na 3ª),
 * preservação de vínculo histórico, prioridades no 3°B e otimização do 2°B.
 */

export function runAllocationEngine({ patients, activeShiftDoctors, allDoctors, historyMap = {}, isWeekend = false }) {
  // Map de Médicos cadastrados
  const doctorMap = new Map(allDoctors.map(d => [d.id, d]));

  // activeShiftDoctors é um array: [{ doctorId: 'doc-6', roleTag: 'plantonista' }, ...]
  const shiftDoctorMap = new Map(activeShiftDoctors.map(item => [item.doctorId, item.roleTag]));

  // Médicos ativos hoje com seu papel do dia
  const activeDoctorsWithRoles = activeShiftDoctors
    .map(item => {
      const doc = doctorMap.get(item.doctorId);
      return doc ? { ...doc, effectiveRole: item.roleTag } : null;
    })
    .filter(Boolean);

  const coordenadoresAtivos = activeDoctorsWithRoles.filter(d => d.effectiveRole === 'coordenador');
  const visitadorFixoAtivo = activeDoctorsWithRoles.find(d => d.effectiveRole === 'visitador_fixo');
  const visitadoresNaoFixosAtivos = activeDoctorsWithRoles.filter(d => d.effectiveRole === 'visitador_nao_fixo');
  const plantonistasAtivos = activeDoctorsWithRoles.filter(d => d.effectiveRole === 'plantonista');
  const residentesAtivos = activeDoctorsWithRoles.filter(d => d.effectiveRole === 'residente');

  // Elegíveis para 3°B (Coordenadores + Visitadores Fixos + Visitadores N.F. + Plantonistas)
  const medicos3B = activeDoctorsWithRoles.filter(d => d.effectiveRole !== 'residente');

  // Elegíveis para 2°B (SOMENTE Visitadores N.F. e Plantonistas do dia)
  // Coordenadores e Visitadores Fixos são EXCLUÍDOS.
  const medicos2B = activeDoctorsWithRoles.filter(d => d.effectiveRole === 'visitador_nao_fixo' || d.effectiveRole === 'plantonista');

  const activeDocIds = activeShiftDoctors.map(d => d.doctorId);
  const explanations = {};
  const resultPatients = [];

  const load3B = {};
  medicos3B.forEach(d => { load3B[d.id] = 0; });

  // -------------------------------------------------------------
  // 1. PROCESSAMENTO DO 3°B (Enfermaria Clínica)
  // -------------------------------------------------------------
  const patients3B = patients.filter(p => p.sector === '3B');
  const unassigned3B = [];

  patients3B.forEach(patient => {
    let assignedDoc = null;
    let assignedRes = patient.residentId;
    let reason = [];

    // Checar Histórico / Manutenção de Vínculo
    const historyEntry = historyMap[patient.id] || historyMap[patient.bed];
    const previousDocId = patient.doctorId || (historyEntry ? historyEntry.doctorId : null);

    if (previousDocId && activeDocIds.includes(previousDocId)) {
      const prevDocWithRole = activeDoctorsWithRoles.find(d => d.id === previousDocId);
      if (prevDocWithRole && prevDocWithRole.effectiveRole !== 'residente') {
        assignedDoc = previousDocId;
        const roleLabel = prevDocWithRole.effectiveRole === 'coordenador' ? 'Coordenador' :
                          prevDocWithRole.effectiveRole === 'visitador_fixo' ? 'Visitador Fixo' : 'Vínculo Mantido';
        reason.push(`Mantido com ${prevDocWithRole.name} (${roleLabel})`);
      }
    }

    // Validar Residente ativo
    if (assignedRes && !activeDocIds.includes(assignedRes)) {
      assignedRes = null;
    }

    if (assignedDoc) {
      load3B[assignedDoc] = (load3B[assignedDoc] || 0) + 1;
      explanations[patient.id] = reason.join(' | ');
      resultPatients.push({ ...patient, doctorId: assignedDoc, residentId: assignedRes });
    } else {
      unassigned3B.push({ patient, residentId: assignedRes });
    }
  });

  // Distribuir leitos sobressalentes do 3°B
  if (unassigned3B.length > 0 && medicos3B.length > 0) {
    unassigned3B.forEach(({ patient, residentId }) => {
      let bestDoc = null;
      let minLoad = Infinity;

      const priorityScore = (doc) => {
        if (doc.effectiveRole === 'plantonista') return 4;
        if (doc.effectiveRole === 'visitador_fixo') return 3;
        if (doc.effectiveRole === 'coordenador') return 2;
        return 1;
      };

      medicos3B.forEach(doc => {
        const docLoad = load3B[doc.id] || 0;
        if (docLoad < minLoad) {
          minLoad = docLoad;
          bestDoc = doc;
        } else if (docLoad === minLoad) {
          if (priorityScore(doc) > priorityScore(bestDoc)) {
            bestDoc = doc;
          }
        }
      });

      if (bestDoc) {
        load3B[bestDoc.id] = (load3B[bestDoc.id] || 0) + 1;
        explanations[patient.id] = `Alocado para ${bestDoc.name} (Balanceamento do 3°B)`;
        resultPatients.push({ ...patient, doctorId: bestDoc.id, residentId });
      } else {
        resultPatients.push({ ...patient, residentId });
      }
    });
  }

  // -------------------------------------------------------------
  // 2. PROCESSAMENTO DO 2°B (Segundo Andar)
  // Regra: Concentração no MENOR N° DE MÉDICOS (Ideal: 1 médico)
  // -------------------------------------------------------------
  const patients2B = patients.filter(p => p.sector === '2B');

  if (patients2B.length > 0) {
    if (medicos2B.length === 0) {
      patients2B.forEach(p => {
        explanations[p.id] = 'ATENÇÃO: Nenhum plantonista ou visitador não-fixo escalado para o 2°B hoje';
        resultPatients.push({ ...p });
      });
    } else {
      let targetDoctor = null;

      // Buscar se algum paciente já tem médico recente escalado
      for (const p of patients2B) {
        const historyEntry = historyMap[p.id] || historyMap[p.bed];
        const prevDocId = p.doctorId || (historyEntry ? historyEntry.doctorId : null);
        if (prevDocId && medicos2B.some(d => d.id === prevDocId)) {
          targetDoctor = medicos2B.find(d => d.id === prevDocId);
          break;
        }
      }

      if (!targetDoctor) {
        targetDoctor = medicos2B.find(d => d.effectiveRole === 'plantonista') || medicos2B[0];
      }

      patients2B.forEach(p => {
        explanations[p.id] = `Alocado para ${targetDoctor.name} (Concentração do 2°B no menor número de médicos)`;
        resultPatients.push({ ...p, doctorId: targetDoctor.id });
      });
    }
  }

  // -------------------------------------------------------------
  // 3. COLONOSCOPIAS
  // -------------------------------------------------------------
  const patientsColono = patients.filter(p => p.sector === 'COLONO');
  patientsColono.forEach(p => {
    explanations[p.id] = 'Paciente em procedimento de Colonoscopia';
    resultPatients.push({ ...p });
  });

  return {
    allocatedPatients: resultPatients,
    explanations,
    stats: {
      total3B: patients3B.length,
      total2B: patients2B.length,
      totalColono: patientsColono.length,
      activeDoctorsCount: activeDoctorsWithRoles.length
    }
  };
}
