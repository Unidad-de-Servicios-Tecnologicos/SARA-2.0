import { useState, useCallback } from 'react';
import { integrationService } from '../services/integrationService';

export const useSofia = () => {
  const [config, setConfig] = useState(null);
  const [status, setStatus] = useState(null);
  const [lastSync, setLastSync] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    try {
      const data = await integrationService.getSofiaConfig();
      setConfig(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateConfig = useCallback(async (newConfig) => {
    try {
      const updated = await integrationService.updateSofiaConfig(newConfig);
      setConfig(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const testConnection = useCallback(async () => {
    try {
      const result = await integrationService.testSofiaConnection();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const sync = useCallback(async (entityType) => {
    setLoading(true);
    try {
      const result = await integrationService.syncWithSofia(entityType);
      const syncStatus = await integrationService.getSofiaStatus();
      setStatus(syncStatus);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStatus = useCallback(async () => {
    try {
      const data = await integrationService.getSofiaStatus();
      setStatus(data);
      return data;
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const fetchLastSync = useCallback(async () => {
    try {
      const data = await integrationService.getSofiaLastSync();
      setLastSync(data);
      return data;
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return {
    config,
    status,
    lastSync,
    loading,
    error,
    fetchConfig,
    updateConfig,
    testConnection,
    sync,
    fetchStatus,
    fetchLastSync
  };
};

export const useGemini = () => {
  const [config, setConfig] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    try {
      const data = await integrationService.getGeminiConfig();
      setConfig(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateConfig = useCallback(async (newConfig) => {
    try {
      const updated = await integrationService.updateGeminiConfig(newConfig);
      setConfig(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const testConnection = useCallback(async () => {
    try {
      const result = await integrationService.testGeminiConnection();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const generateContent = useCallback(async (prompt, contentType = 'text') => {
    setLoading(true);
    try {
      const result = await integrationService.generateContent(prompt, contentType);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStatus = useCallback(async () => {
    try {
      const data = await integrationService.getGeminiStatus();
      setStatus(data);
      return data;
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return {
    config,
    status,
    loading,
    error,
    fetchConfig,
    updateConfig,
    testConnection,
    generateContent,
    fetchStatus
  };
};

export const useWebhooks = () => {
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWebhooks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await integrationService.getWebhooks();
      setWebhooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createWebhook = useCallback(async (webhookData) => {
    try {
      const newWebhook = await integrationService.createWebhook(webhookData);
      setWebhooks([...webhooks, newWebhook]);
      return newWebhook;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [webhooks]);

  const updateWebhook = useCallback(async (webhookId, webhookData) => {
    try {
      const updated = await integrationService.updateWebhook(webhookId, webhookData);
      setWebhooks(webhooks.map(w => w.id === webhookId ? updated : w));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [webhooks]);

  const deleteWebhook = useCallback(async (webhookId) => {
    try {
      await integrationService.deleteWebhook(webhookId);
      setWebhooks(webhooks.filter(w => w.id !== webhookId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [webhooks]);

  return {
    webhooks,
    loading,
    error,
    fetchWebhooks,
    createWebhook,
    updateWebhook,
    deleteWebhook
  };
};

export const useSync = () => {
  const [syncStatus, setSyncStatus] = useState(null);
  const [syncHistory, setSyncHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSyncStatus = useCallback(async () => {
    try {
      const data = await integrationService.getSyncStatus();
      setSyncStatus(data);
      return data;
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const startSync = useCallback(async (syncType = 'full') => {
    setLoading(true);
    try {
      const result = await integrationService.startSyncProcess(syncType);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async (limit = 10) => {
    try {
      const data = await integrationService.getSyncHistory(limit);
      setSyncHistory(data);
      return data;
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return {
    syncStatus,
    syncHistory,
    loading,
    error,
    fetchSyncStatus,
    startSync,
    fetchHistory
  };
};
