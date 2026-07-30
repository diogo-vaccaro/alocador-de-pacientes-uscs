/**
 * Módulo de Sincronização Nativa com o Repositório GitHub
 * Armazena e sincroniza médicos, leitos e históricos diretamente no GitHub em formato JSON.
 */

const REPO_OWNER = 'diogo-vaccaro';
const REPO_NAME = 'alocador-de-pacientes-uscs';

/**
 * Busca o censo do dia diretamente via API Vercel ou Raw GitHub CDN
 */
export async function fetchCensoFromGitHub(dateKey) {
  try {
    // Tentar via API interna Vercel em primeiro lugar
    const apiRes = await fetch(`/api/censo?date=${dateKey}`);
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data && data.success && data.payload) {
        return data.payload;
      }
    }

    // Fallback: tentar diretamente o CDN cru do GitHub
    const rawUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/data/censo_${dateKey}.json`;
    const rawRes = await fetch(rawUrl);
    if (rawRes.ok) {
      const payload = await rawRes.json();
      return payload;
    }
  } catch (err) {
    console.warn('Erro ao buscar censo no GitHub:', err.message);
  }
  return null;
}

/**
 * Envia o censo atualizado para ser commitado no repositório GitHub
 */
export async function saveCensoToGitHub(dateKey, payload) {
  try {
    const res = await fetch(`/api/censo?date=${dateKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload })
    });

    if (!res.ok) {
      const err = await res.json();
      console.warn('Alerta de salvamento no GitHub:', err.error);
      return false;
    }

    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error('Falha ao enviar censo para GitHub:', err);
    return false;
  }
}

/**
 * Inicia a escuta/polling automático a cada N segundos para sincronizar computadores
 */
export function startGitHubAutoSync(dateKey, onRemoteUpdate, intervalMs = 4000) {
  let lastJsonStr = '';

  const checkRemote = async () => {
    const remotePayload = await fetchCensoFromGitHub(dateKey);
    if (remotePayload) {
      const jsonStr = JSON.stringify(remotePayload);
      if (jsonStr !== lastJsonStr) {
        lastJsonStr = jsonStr;
        onRemoteUpdate(remotePayload);
      }
    }
  };

  // Checagem inicial imediata
  checkRemote();

  // Polling automático
  const timer = setInterval(checkRemote, intervalMs);

  return () => clearInterval(timer);
}
