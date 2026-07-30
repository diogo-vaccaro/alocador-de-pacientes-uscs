/**
 * Módulo de Sincronização Nativa com o Repositório GitHub
 * Armazena e sincroniza médicos, leitos e históricos diretamente no GitHub em formato JSON.
 */

const REPO_OWNER = 'diogo-vaccaro';
const REPO_NAME = 'alocador-de-pacientes-uscs';

const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

/**
 * Busca o censo do dia via API Serverless Vercel ou Raw GitHub CDN
 */
export async function fetchCensoFromGitHub(dateKey) {
  try {
    // No ambiente local de dev (Vite), não chama /api/censo do Vercel para evitar 404/source code
    if (!isLocalhost) {
      const apiRes = await fetch(`/api/censo?date=${dateKey}`);
      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data && data.success && data.payload) {
          return data.payload;
        }
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
    // Silencioso em caso de arquivo ainda não criado no GitHub
  }
  return null;
}

/**
 * Envia o censo atualizado para ser commitado no repositório GitHub via API Serverless
 */
export async function saveCensoToGitHub(dateKey, payload) {
  if (isLocalhost) return true; // Em dev local salva no localStorage

  try {
    const res = await fetch(`/api/censo?date=${dateKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload })
    });

    if (!res.ok) {
      return false;
    }

    const data = await res.json();
    return data.success;
  } catch (err) {
    return false;
  }
}

/**
 * Inicia a escuta/polling automático a cada N segundos para sincronizar computadores
 */
export function startGitHubAutoSync(dateKey, onRemoteUpdate, intervalMs = 5000) {
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

  if (!isLocalhost) {
    checkRemote();
    const timer = setInterval(checkRemote, intervalMs);
    return () => clearInterval(timer);
  }

  return () => {};
}
