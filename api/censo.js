// Vercel Serverless Function: API de Sincronização do Censo via GitHub

const REPO_OWNER = 'diogo-vaccaro';
const REPO_NAME = 'alocador-de-pacientes-uscs';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { date } = req.query;
  const dateKey = date || new Date().toISOString().slice(0, 10);
  const filePath = `data/censo_${dateKey}.json`;
  const githubApiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;

  // LEITURA DO CENSO NO GITHUB
  if (req.method === 'GET') {
    try {
      const response = await fetch(githubApiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'USCS-Alocador-App',
          ...(GITHUB_TOKEN ? { 'Authorization': `token ${GITHUB_TOKEN}` } : {})
        }
      });

      if (response.status === 404) {
        return res.status(200).json({ success: true, payload: null });
      }

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      const payload = JSON.parse(content);

      return res.status(200).json({ success: true, sha: data.sha, payload });
    } catch (err) {
      console.error('Erro ao ler censo no GitHub:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // ESCRITA/COMMIT DO CENSO NO GITHUB
  if (req.method === 'POST') {
    try {
      const { payload } = req.body || {};
      if (!payload) {
        return res.status(400).json({ success: false, error: 'Payload é obrigatório' });
      }

      if (!GITHUB_TOKEN) {
        return res.status(401).json({ 
          success: false, 
          error: 'GITHUB_TOKEN não configurado nas variáveis de ambiente do Vercel' 
        });
      }

      // Buscar o SHA do arquivo existente (se houver)
      let sha = null;
      const getFileRes = await fetch(githubApiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'USCS-Alocador-App',
          'Authorization': `token ${GITHUB_TOKEN}`
        }
      });

      if (getFileRes.ok) {
        const fileData = await getFileRes.json();
        sha = fileData.sha;
      }

      // Criar/Atualizar o arquivo JSON via Commit Automático no GitHub
      const fileContentBase64 = Buffer.from(JSON.stringify(payload, null, 2)).toString('base64');
      const putRes = await fetch(githubApiUrl, {
        method: 'PUT',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'USCS-Alocador-App',
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `chore(censo): atualizar censo do dia ${dateKey} via App USCS`,
          content: fileContentBase64,
          ...(sha ? { sha } : {})
        })
      });

      if (!putRes.ok) {
        const errData = await putRes.json();
        throw new Error(errData.message || 'Falha ao commitar censo no GitHub');
      }

      const result = await putRes.json();
      return res.status(200).json({ success: true, commit: result.commit.sha });
    } catch (err) {
      console.error('Erro ao salvar censo no GitHub:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
