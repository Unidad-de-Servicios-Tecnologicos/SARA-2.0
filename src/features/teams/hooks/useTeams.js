import { useState, useCallback } from 'react';
import { teamService } from '../services/teamService';

export const useTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    try {
      const data = await teamService.getAllTeams();
      setTeams(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTeam = useCallback(async (teamData) => {
    try {
      const newTeam = await teamService.createTeam(teamData);
      setTeams([...teams, newTeam]);
      return newTeam;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [teams]);

  const updateTeam = useCallback(async (teamId, teamData) => {
    try {
      const updated = await teamService.updateTeam(teamId, teamData);
      setTeams(teams.map(t => t.id === teamId ? updated : t));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [teams]);

  const deleteTeam = useCallback(async (teamId) => {
    try {
      await teamService.deleteTeam(teamId);
      setTeams(teams.filter(t => t.id !== teamId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [teams]);

  const searchTeams = useCallback(async (searchTerm) => {
    setLoading(true);
    try {
      const data = await teamService.searchTeams(searchTerm);
      setTeams(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    teams,
    loading,
    error,
    fetchTeams,
    createTeam,
    updateTeam,
    deleteTeam,
    searchTeams
  };
};

export const useTeamById = (teamId) => {
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    try {
      const teamData = await teamService.getTeamById(teamId);
      const membersData = await teamService.getTeamMembers(teamId);
      const filesData = await teamService.getTeamFiles(teamId);
      
      setTeam(teamData);
      setMembers(membersData);
      setFiles(filesData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  const addMember = useCallback(async (userId) => {
    try {
      const result = await teamService.addTeamMember(teamId, userId);
      setMembers([...members, result]);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [teamId, members]);

  const removeMember = useCallback(async (userId) => {
    try {
      await teamService.removeTeamMember(teamId, userId);
      setMembers(members.filter(m => m.userId !== userId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [teamId, members]);

  return {
    team,
    members,
    files,
    loading,
    error,
    fetchTeam,
    addMember,
    removeMember
  };
};

export const useTeamFiles = (teamId, initialFolderPath = '/') => {
  const [files, setFiles] = useState([]);
  const [folderPath, setFolderPath] = useState(initialFolderPath);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [storageInfo, setStorageInfo] = useState(null);

  const fetchFiles = useCallback(async (path = folderPath) => {
    setLoading(true);
    try {
      const data = await teamService.getTeamFiles(teamId, path);
      const storage = await teamService.getTeamStorageInfo(teamId);
      setFiles(data);
      setStorageInfo(storage);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [teamId, folderPath]);

  const uploadFile = useCallback(async (file) => {
    try {
      const result = await teamService.uploadFile(teamId, file, folderPath);
      setFiles([...files, result]);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [teamId, folderPath, files]);

  const downloadFile = useCallback(async (fileId, fileName) => {
    try {
      const blob = await teamService.downloadFile(fileId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteFile = useCallback(async (fileId) => {
    try {
      await teamService.deleteFile(fileId);
      setFiles(files.filter(f => f.id !== fileId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [files]);

  const createFolder = useCallback(async (folderName) => {
    try {
      const result = await teamService.createFolder(teamId, folderName, folderPath);
      setFiles([...files, result]);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [teamId, folderPath, files]);

  return {
    files,
    folderPath,
    setFolderPath,
    loading,
    error,
    storageInfo,
    fetchFiles,
    uploadFile,
    downloadFile,
    deleteFile,
    createFolder
  };
};
