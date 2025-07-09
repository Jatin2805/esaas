const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Legacy Workout interface (for backward compatibility)
export interface Workout {
  _id: string;
  title: string;
  reps: number;
  load: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

// New Funnel interfaces
export interface PageElement {
  id: string;
  type: 'text' | 'image' | 'button' | 'form' | 'video' | 'countdown' | 'testimonial';
  content: any;
  styles: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface FunnelPage {
  id: string;
  name: string;
  type: 'landing' | 'checkout' | 'thankyou' | 'upsell' | 'downsell';
  elements: PageElement[];
  settings: {
    seo: {
      title: string;
      description: string;
      keywords: string[];
    };
    tracking: {
      googleAnalytics?: string;
      facebookPixel?: string;
      customCode?: string;
    };
    redirects: {
      success?: string;
      cancel?: string;
    };
  };
}

export interface Funnel {
  _id: string;
  name: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  pages: FunnelPage[];
  analytics: {
    views: number;
    conversions: number;
    revenue: number;
  };
  settings: {
    domain?: string;
    customCss?: string;
    favicon?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  _id: string;
  name: string;
  description: string;
  category: 'business' | 'ecommerce' | 'education' | 'marketing' | 'personal';
  thumbnail: string;
  price: number;
  rating: number;
  downloads: number;
  tags: string[];
  conversionRate: number;
  funnelData: any;
  author: string;
  featured: boolean;
  active: boolean;
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

  // Legacy Workout API methods (for backward compatibility)
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

  // New Funnel API methods
  async getAllFunnels(): Promise<ApiResponse<Funnel[]>> {
    return this.request<Funnel[]>('/api/funnels');
  }

  async getFunnel(id: string): Promise<ApiResponse<Funnel>> {
    return this.request<Funnel>(`/api/funnels/${id}`);
  }

  async createFunnel(funnel: { name: string; description?: string; status?: string }): Promise<ApiResponse<Funnel>> {
    return this.request<Funnel>('/api/funnels', {
      method: 'POST',
      body: JSON.stringify(funnel),
    });
  }

  async updateFunnel(id: string, funnel: Partial<Funnel>): Promise<ApiResponse<Funnel>> {
    return this.request<Funnel>(`/api/funnels/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(funnel),
    });
  }

  async deleteFunnel(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/funnels/${id}`, {
      method: 'DELETE',
    });
  }

  // Page management
  async addPage(funnelId: string, page: { name: string; type?: string }): Promise<ApiResponse<Funnel>> {
    return this.request<Funnel>(`/api/funnels/${funnelId}/pages`, {
      method: 'POST',
      body: JSON.stringify(page),
    });
  }

  async updatePage(funnelId: string, pageId: string, page: Partial<FunnelPage>): Promise<ApiResponse<Funnel>> {
    return this.request<Funnel>(`/api/funnels/${funnelId}/pages/${pageId}`, {
      method: 'PATCH',
      body: JSON.stringify(page),
    });
  }

  async deletePage(funnelId: string, pageId: string): Promise<ApiResponse<Funnel>> {
    return this.request<Funnel>(`/api/funnels/${funnelId}/pages/${pageId}`, {
      method: 'DELETE',
    });
  }

  // Analytics
  async updateAnalytics(funnelId: string, analytics: { views?: number; conversions?: number; revenue?: number }): Promise<ApiResponse<Funnel>> {
    return this.request<Funnel>(`/api/funnels/${funnelId}/analytics`, {
      method: 'PATCH',
      body: JSON.stringify(analytics),
    });
  }

  // Template API methods
  async getAllTemplates(params?: { category?: string; search?: string; sort?: string }): Promise<ApiResponse<Template[]>> {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sort) queryParams.append('sort', params.sort);
    
    const queryString = queryParams.toString();
    return this.request<Template[]>(`/api/templates${queryString ? `?${queryString}` : ''}`);
  }

  async getTemplate(id: string): Promise<ApiResponse<Template>> {
    return this.request<Template>(`/api/templates/${id}`);
  }

  async createTemplate(template: Omit<Template, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Template>> {
    return this.request<Template>('/api/templates', {
      method: 'POST',
      body: JSON.stringify(template),
    });
  }

  async updateTemplate(id: string, template: Partial<Template>): Promise<ApiResponse<Template>> {
    return this.request<Template>(`/api/templates/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(template),
    });
  }

  async deleteTemplate(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/templates/${id}`, {
      method: 'DELETE',
    });
  }

  async incrementTemplateDownload(id: string): Promise<ApiResponse<Template>> {
    return this.request<Template>(`/api/templates/${id}/download`, {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();