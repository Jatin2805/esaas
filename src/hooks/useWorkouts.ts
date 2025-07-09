import { useState, useEffect } from 'react';
import { apiService, Workout } from '../services/api';
import toast from 'react-hot-toast';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkouts = async () => {
    setLoading(true);
    const response = await apiService.getAllWorkouts();
    
    if (response.error) {
      setError(response.error);
      toast.error('Failed to fetch workouts');
    } else {
      setWorkouts(response.data || []);
      setError(null);
    }
    setLoading(false);
  };

  const createWorkout = async (workout: Omit<Workout, '_id' | 'createdAt' | 'updatedAt'>) => {
    const response = await apiService.createWorkout(workout);
    
    if (response.error) {
      toast.error('Failed to create workout');
      return false;
    } else {
      toast.success('Workout created successfully');
      fetchWorkouts(); // Refresh the list
      return true;
    }
  };

  const updateWorkout = async (id: string, updates: Partial<Workout>) => {
    const response = await apiService.updateWorkout(id, updates);
    
    if (response.error) {
      toast.error('Failed to update workout');
      return false;
    } else {
      toast.success('Workout updated successfully');
      fetchWorkouts(); // Refresh the list
      return true;
    }
  };

  const deleteWorkout = async (id: string) => {
    const response = await apiService.deleteWorkout(id);
    
    if (response.error) {
      toast.error('Failed to delete workout');
      return false;
    } else {
      toast.success('Workout deleted successfully');
      fetchWorkouts(); // Refresh the list
      return true;
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return {
    workouts,
    loading,
    error,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    refetch: fetchWorkouts
  };
};

export const useWorkoutsByCategory = (category: string) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      const response = await apiService.getWorkoutsByCategory(category);
      
      if (response.error) {
        setError(response.error);
        toast.error('Failed to fetch workouts');
      } else {
        setWorkouts(response.data || []);
        setError(null);
      }
      setLoading(false);
    };

    if (category) {
      fetchWorkouts();
    }
  }, [category]);

  return { workouts, loading, error };
};