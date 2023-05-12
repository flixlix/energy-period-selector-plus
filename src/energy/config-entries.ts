/* eslint-disable @typescript-eslint/no-explicit-any */
import { HomeAssistant } from '../type/home-assistant';

type IntegrationType = 'device' | 'helper' | 'hub' | 'service' | 'hardware';

export interface ConfigEntry {
  entry_id: string;
  domain: string;
  title: string;
  source: string;
  state: 'loaded' | 'setup_error' | 'migration_error' | 'setup_retry' | 'not_loaded' | 'failed_unload' | 'setup_in_progress';
  supports_options: boolean;
  supports_remove_device: boolean;
  supports_unload: boolean;
  pref_disable_new_entities: boolean;
  pref_disable_polling: boolean;
  disabled_by: 'user' | null;
  reason: string | null;
}

export const getConfigEntries = (
  hass: HomeAssistant,
  filters?: {
    type?: IntegrationType[];
    domain?: string;
  },
): Promise<ConfigEntry[]> => {
  const params: any = {};
  if (filters) {
    if (filters.type) {
      params.type_filter = filters.type;
    }
    if (filters.domain) {
      params.domain = filters.domain;
    }
  }
  return hass.callWS<ConfigEntry[]>({
    type: 'config_entries/get',
    ...params,
  });
};
