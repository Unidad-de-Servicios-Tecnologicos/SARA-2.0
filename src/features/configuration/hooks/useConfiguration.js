import { useState, useCallback } from 'react';
import { configService } from '../services/configService';

export const useSystemConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    try {
      const data = await configService.getSystemConfig();
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
      const updated = await configService.updateSystemConfig(newConfig);
      setConfig(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    config,
    loading,
    error,
    fetchConfig,
    updateConfig
  };
};

export const useUserPreferences = (userId) => {
  const [preferences, setPreferences] = useState(null);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('es');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPreferences = useCallback(async () => {
    setLoading(true);
    try {
      const prefs = await configService.getUserPreferences(userId);
      const themeData = await configService.getUserTheme(userId);
      const langData = await configService.getUserLanguage(userId);
      
      setPreferences(prefs);
      setTheme(themeData.theme || 'light');
      setLanguage(langData.language || 'es');
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updatePreferences = useCallback(async (newPrefs) => {
    try {
      const updated = await configService.updateUserPreferences(userId, newPrefs);
      setPreferences(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userId]);

  const updateTheme = useCallback(async (newTheme) => {
    try {
      const updated = await configService.setUserTheme(userId, newTheme);
      setTheme(newTheme);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userId]);

  const updateLanguage = useCallback(async (newLanguage) => {
    try {
      const updated = await configService.setUserLanguage(userId, newLanguage);
      setLanguage(newLanguage);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userId]);

  return {
    preferences,
    theme,
    language,
    loading,
    error,
    fetchPreferences,
    updatePreferences,
    updateTheme,
    updateLanguage
  };
};

export const useNotificationSettings = (userId) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await configService.getNotificationSettings(userId);
      setSettings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateSettings = useCallback(async (newSettings) => {
    try {
      const updated = await configService.updateNotificationSettings(userId, newSettings);
      setSettings(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userId]);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings
  };
};

export const useSecuritySettings = (userId) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await configService.getSecuritySettings(userId);
      setSettings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateSettings = useCallback(async (newSettings) => {
    try {
      const updated = await configService.updateSecuritySettings(userId, newSettings);
      setSettings(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userId]);

  const enable2FA = useCallback(async () => {
    try {
      const result = await configService.enableTwoFactor(userId);
      setSettings(prev => ({ ...prev, twoFactorEnabled: true }));
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userId]);

  const disable2FA = useCallback(async () => {
    try {
      const result = await configService.disableTwoFactor(userId);
      setSettings(prev => ({ ...prev, twoFactorEnabled: false }));
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userId]);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
    enable2FA,
    disable2FA
  };
};

export const usePrivacySettings = (userId) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await configService.getPrivacySettings(userId);
      setSettings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateSettings = useCallback(async (newSettings) => {
    try {
      const updated = await configService.updatePrivacySettings(userId, newSettings);
      setSettings(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userId]);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings
  };
};

export const useAccessibilitySettings = (userId) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await configService.getAccessibilitySettings(userId);
      setSettings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateSettings = useCallback(async (newSettings) => {
    try {
      const updated = await configService.updateAccessibilitySettings(userId, newSettings);
      setSettings(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userId]);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings
  };
};
