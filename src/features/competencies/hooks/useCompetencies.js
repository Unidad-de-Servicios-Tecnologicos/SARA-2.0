import { useState, useCallback } from 'react';
import { competencyService } from '../services/competencyService';

export const useItineraries = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItineraries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await competencyService.getAllItineraries();
      setItineraries(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createItinerary = useCallback(async (itineraryData) => {
    try {
      const newItinerary = await competencyService.createItinerary(itineraryData);
      setItineraries([...itineraries, newItinerary]);
      return newItinerary;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [itineraries]);

  const updateItinerary = useCallback(async (itineraryId, itineraryData) => {
    try {
      const updated = await competencyService.updateItinerary(itineraryId, itineraryData);
      setItineraries(itineraries.map(it => it.id === itineraryId ? updated : it));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [itineraries]);

  const deleteItinerary = useCallback(async (itineraryId) => {
    try {
      await competencyService.deleteItinerary(itineraryId);
      setItineraries(itineraries.filter(it => it.id !== itineraryId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [itineraries]);

  const searchItineraries = useCallback(async (searchTerm) => {
    setLoading(true);
    try {
      const data = await competencyService.searchItineraries(searchTerm);
      setItineraries(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    itineraries,
    loading,
    error,
    fetchItineraries,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    searchItineraries
  };
};

export const useCompetencies = () => {
  const [competencies, setCompetencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompetencies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await competencyService.getAllCompetencies();
      setCompetencies(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCompetency = useCallback(async (competencyData) => {
    try {
      const newCompetency = await competencyService.createCompetency(competencyData);
      setCompetencies([...competencies, newCompetency]);
      return newCompetency;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [competencies]);

  const updateCompetency = useCallback(async (competencyId, competencyData) => {
    try {
      const updated = await competencyService.updateCompetency(competencyId, competencyData);
      setCompetencies(competencies.map(c => c.id === competencyId ? updated : c));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [competencies]);

  const deleteCompetency = useCallback(async (competencyId) => {
    try {
      await competencyService.deleteCompetency(competencyId);
      setCompetencies(competencies.filter(c => c.id !== competencyId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [competencies]);

  const searchCompetencies = useCallback(async (searchTerm) => {
    setLoading(true);
    try {
      const data = await competencyService.searchCompetencies(searchTerm);
      setCompetencies(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const assignCompetenciesToItinerary = useCallback(async (itineraryId, competencyIds) => {
    try {
      const result = await competencyService.assignCompetenciesToItinerary(itineraryId, competencyIds);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    competencies,
    loading,
    error,
    fetchCompetencies,
    createCompetency,
    updateCompetency,
    deleteCompetency,
    searchCompetencies,
    assignCompetenciesToItinerary
  };
};

export const useCompetencyById = (competencyId) => {
  const [competency, setCompetency] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompetency = useCallback(async () => {
    setLoading(true);
    try {
      const data = await competencyService.getCompetencyById(competencyId);
      setCompetency(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [competencyId]);

  return { competency, loading, error, fetchCompetency };
};
