import { useState, useCallback } from 'react';
import { courseService } from '../services/courseService';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const data = await courseService.getAllCourses(filters);
      setCourses(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCourse = useCallback(async (courseData) => {
    setLoading(true);
    try {
      const newCourse = await courseService.createCourse(courseData);
      setCourses([...courses, newCourse]);
      setError(null);
      return newCourse;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [courses]);

  const updateCourse = useCallback(async (courseId, courseData) => {
    setLoading(true);
    try {
      const updated = await courseService.updateCourse(courseId, courseData);
      setCourses(courses.map(c => (c.id === courseId ? updated : c)));
      setError(null);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [courses]);

  const deleteCourse = useCallback(async (courseId) => {
    setLoading(true);
    try {
      await courseService.deleteCourse(courseId);
      setCourses(courses.filter(c => c.id !== courseId));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [courses]);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};

export const useCourseById = (courseId) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourse = useCallback(async () => {
    if (!courseId) return;
    setLoading(true);
    try {
      const data = await courseService.getCourseById(courseId);
      setCourse(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  return { course, loading, error, fetchCourse };
};
