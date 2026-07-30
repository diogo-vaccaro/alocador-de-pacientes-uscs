import { createClient } from '@supabase/supabase-js';

// URL e chave padrão do Supabase (lidas de .env ou configuráveis pelo usuário)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('uscs_supabase_url') || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('uscs_supabase_anon_key') || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
      realtime: { params: { eventsPerSecond: 10 } }
    })
  : null;

/**
 * Salva as credenciais do Supabase no localStorage para conexão instantânea sem rede-ploy
 */
export function configureSupabaseCredentials(url, key) {
  if (url && key) {
    localStorage.setItem('uscs_supabase_url', url.trim());
    localStorage.setItem('uscs_supabase_anon_key', key.trim());
    window.location.reload();
  }
}

/**
 * Busca o censo do dia no Supabase
 */
export async function fetchCensoFromCloud(dateKey) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('censo_hospitalar')
      .select('*')
      .eq('date_key', dateKey)
      .maybeSingle();

    if (error) {
      console.warn('Erro ao buscar censo no Supabase:', error.message);
      return null;
    }

    return data ? data.payload : null;
  } catch (err) {
    console.error('Falha na comunicação com Supabase:', err);
    return null;
  }
}

/**
 * Salva/Atualiza o censo do dia no Supabase em tempo real
 */
export async function saveCensoToCloud(dateKey, payload) {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('censo_hospitalar')
      .upsert(
        {
          date_key: dateKey,
          payload,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'date_key' }
      );

    if (error) {
      console.error('Erro ao salvar no Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Falha ao sincronizar com Supabase:', err);
    return false;
  }
}

/**
 * Escuta alterações em tempo real via WebSockets do Supabase
 */
export function subscribeToCloudCenso(dateKey, onRemoteChange) {
  if (!supabase) return () => {};

  const channel = supabase
    .channel(`censo_${dateKey}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'censo_hospitalar',
        filter: `date_key=eq.${dateKey}`
      },
      (payload) => {
        if (payload.new && payload.new.payload) {
          onRemoteChange(payload.new.payload);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
