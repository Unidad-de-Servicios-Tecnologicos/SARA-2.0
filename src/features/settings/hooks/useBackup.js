import { useState, useCallback } from 'react';
import { backupService } from '../services/backupService';

export const useBackup = () => {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async (limit = 20) => {
    setLoading(true);
    try {
      const data = await backupService.getBackupHistory(limit);
      setBackups(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBackup = useCallback(async (type = 'full') => {
    setLoading(true);
    try {
      const result = await backupService.createBackupNow(type);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBackup = useCallback(async (backupId) => {
    try {
      await backupService.deleteBackup(backupId);
      setBackups(backups.filter(b => b.id !== backupId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [backups]);

  const downloadBackup = useCallback(async (backupId, fileName) => {
    try {
      const blob = await backupService.downloadBackup(backupId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || `backup_${backupId}.zip`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const restoreBackup = useCallback(async (backupId) => {
    setLoading(true);
    try {
      const result = await backupService.restoreBackup(backupId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyBackup = useCallback(async (backupId) => {
    try {
      const result = await backupService.verifyBackup(backupId);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    backups,
    loading,
    error,
    fetchHistory,
    createBackup,
    deleteBackup,
    downloadBackup,
    restoreBackup,
    verifyBackup
  };
};

export const useBackupSchedule = () => {
  const [config, setConfig] = useState(null);
  const [nextBackup, setNextBackup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchScheduleConfig = useCallback(async () => {
    setLoading(true);
    try {
      const data = await backupService.getScheduleConfig();
      const next = await backupService.getNextScheduledBackup();
      setConfig(data);
      setNextBackup(next);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSchedule = useCallback(async (scheduleData) => {
    try {
      const result = await backupService.setBackupSchedule(scheduleData);
      setConfig(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const enableAutomatic = useCallback(async () => {
    try {
      const result = await backupService.enableAutomaticBackup();
      setConfig(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const disableAutomatic = useCallback(async () => {
    try {
      const result = await backupService.disableAutomaticBackup();
      setConfig(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    config,
    nextBackup,
    loading,
    error,
    fetchScheduleConfig,
    updateSchedule,
    enableAutomatic,
    disableAutomatic
  };
};

export const useBackupStorage = () => {
  const [storageInfo, setStorageInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStorageInfo = useCallback(async () => {
    setLoading(true);
    try {
      const data = await backupService.getStorageInfo();
      setStorageInfo(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    storageInfo,
    loading,
    error,
    fetchStorageInfo
  };
};

export const useBackupRetention = () => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPolicy = useCallback(async () => {
    setLoading(true);
    try {
      const data = await backupService.getRetentionPolicy();
      setPolicy(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePolicy = useCallback(async (newPolicy) => {
    try {
      const result = await backupService.updateRetentionPolicy(newPolicy);
      setPolicy(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const cleanup = useCallback(async () => {
    setLoading(true);
    try {
      const result = await backupService.cleanupOldBackups();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    policy,
    loading,
    error,
    fetchPolicy,
    updatePolicy,
    cleanup
  };
};
