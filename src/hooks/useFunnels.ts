import { useState, useEffect } from 'react';
import { apiService, Funnel, FunnelPage } from '../services/api';
import toast from 'react-hot-toast';

export const useFunnels = () => {
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFunnels = async () => {
    setLoading(true);
    const response = await apiService.getAllFunnels();
    
    if (response.error) {
      setError(response.error);
      toast.error('Failed to fetch funnels');
    } else {
      setFunnels(response.data || []);
      setError(null);
    }
    setLoading(false);
  };

  const createFunnel = async (funnel: { name: string; description?: string; status?: string }) => {
    const response = await apiService.createFunnel(funnel);
    
    if (response.error) {
      toast.error('Failed to create funnel');
      return null;
    } else {
      toast.success('Funnel created successfully');
      fetchFunnels(); // Refresh the list
      return response.data;
    }
  };

  const updateFunnel = async (id: string, updates: Partial<Funnel>) => {
    const response = await apiService.updateFunnel(id, updates);
    
    if (response.error) {
      toast.error('Failed to update funnel');
      return null;
    } else {
      toast.success('Funnel updated successfully');
      fetchFunnels(); // Refresh the list
      return response.data;
    }
  };

  const deleteFunnel = async (id: string) => {
    const response = await apiService.deleteFunnel(id);
    
    if (response.error) {
      toast.error('Failed to delete funnel');
      return false;
    } else {
      toast.success('Funnel deleted successfully');
      fetchFunnels(); // Refresh the list
      return true;
    }
  };

  const addPage = async (funnelId: string, page: { name: string; type?: string }) => {
    const response = await apiService.addPage(funnelId, page);
    
    if (response.error) {
      toast.error('Failed to add page');
      return null;
    } else {
      toast.success('Page added successfully');
      fetchFunnels(); // Refresh the list
      return response.data;
    }
  };

  const updatePage = async (funnelId: string, pageId: string, page: Partial<FunnelPage>) => {
    const response = await apiService.updatePage(funnelId, pageId, page);
    
    if (response.error) {
      toast.error('Failed to update page');
      return null;
    } else {
      fetchFunnels(); // Refresh the list
      return response.data;
    }
  };

  const deletePage = async (funnelId: string, pageId: string) => {
    const response = await apiService.deletePage(funnelId, pageId);
    
    if (response.error) {
      toast.error('Failed to delete page');
      return null;
    } else {
      toast.success('Page deleted successfully');
      fetchFunnels(); // Refresh the list
      return response.data;
    }
  };

  const updateAnalytics = async (funnelId: string, analytics: { views?: number; conversions?: number; revenue?: number }) => {
    const response = await apiService.updateAnalytics(funnelId, analytics);
    
    if (response.error) {
      toast.error('Failed to update analytics');
      return null;
    } else {
      fetchFunnels(); // Refresh the list
      return response.data;
    }
  };

  useEffect(() => {
    fetchFunnels();
  }, []);

  return {
    funnels,
    loading,
    error,
    createFunnel,
    updateFunnel,
    deleteFunnel,
    addPage,
    updatePage,
    deletePage,
    updateAnalytics,
    refetch: fetchFunnels
  };
};

export const useFunnel = (id: string) => {
  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFunnel = async () => {
      if (!id) return;
      
      setLoading(true);
      const response = await apiService.getFunnel(id);
      
      if (response.error) {
        setError(response.error);
        toast.error('Failed to fetch funnel');
      } else {
        setFunnel(response.data || null);
        setError(null);
      }
      setLoading(false);
    };

    fetchFunnel();
  }, [id]);

  return { funnel, loading, error };
};