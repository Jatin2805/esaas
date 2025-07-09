const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Workout {
  _id: string;
  title: string;
  reps: number;
  load: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Workout/Funnel API methods
  async getAllWorkouts(): Promise<ApiResponse<Workout[]>> {
    return this.request<Workout[]>('/api/funnel');
  }

  async getWorkout(id: string): Promise<ApiResponse<Workout>> {
    return this.request<Workout>(`/api/funnel/${id}`);
  }

  async getWorkoutsByCategory(category: string): Promise<ApiResponse<Workout[]>> {
    return this.request<Workout[]>(`/api/funnel/category/${category}`);
  }

  async createWorkout(workout: Omit<Workout, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Workout>> {
    return this.request<Workout>('/api/funnel', {
      method: 'POST',
      body: JSON.stringify(workout),
    });
  }

  async updateWorkout(id: string, workout: Partial<Workout>): Promise<ApiResponse<Workout>> {
    return this.request<Workout>(`/api/funnel/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(workout),
    });
  }

  async deleteWorkout(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/funnel/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();