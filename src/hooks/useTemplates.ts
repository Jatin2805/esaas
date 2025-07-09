import { useState, useEffect } from 'react';
import { apiService, Template } from '../services/api';
import toast from 'react-hot-toast';

export const useTemplates = (params?: { category?: string; search?: string; sort?: string }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = async () => {
    setLoading(true);
    const response = await apiService.getAllTemplates(params);
    
    if (response.error) {
      setError(response.error);
      toast.error('Failed to fetch templates');
    } else {
      setTemplates(response.data || []);
      setError(null);
    }
    setLoading(false);
  };

  const createTemplate = async (template: Omit<Template, '_id' | 'createdAt' | 'updatedAt'>) => {
    const response = await apiService.createTemplate(template);
    
    if (response.error) {
      toast.error('Failed to create template');
      return null;
    } else {
      toast.success('Template created successfully');
      fetchTemplates(); // Refresh the list
      return response.data;
    }
  };

  const updateTemplate = async (id: string, updates: Partial<Template>) => {
    const response = await apiService.updateTemplate(id, updates);
    
    if (response.error) {
      toast.error('Failed to update template');
      return null;
    } else {
      toast.success('Template updated successfully');
      fetchTemplates(); // Refresh the list
      return response.data;
    }
  };

  const deleteTemplate = async (id: string) => {
    const response = await apiService.deleteTemplate(id);
    
    if (response.error) {
      toast.error('Failed to delete template');
      return false;
    } else {
      toast.success('Template deleted successfully');
      fetchTemplates(); // Refresh the list
      return true;
    }
  };

  const downloadTemplate = async (id: string) => {
    const response = await apiService.incrementTemplateDownload(id);
    
    if (response.error) {
      toast.error('Failed to download template');
      return null;
    } else {
      toast.success('Template downloaded successfully');
      fetchTemplates(); // Refresh to update download count
      return response.data;
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [params?.category, params?.search, params?.sort]);

  return {
    templates,
    loading,
    error,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    downloadTemplate,
    refetch: fetchTemplates
  };
};

export const useTemplate = (id: string) => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!id) return;
      
      setLoading(true);
      const response = await apiService.getTemplate(id);
      
      if (response.error) {
        setError(response.error);
        toast.error('Failed to fetch template');
      } else {
        setTemplate(response.data || null);
        setError(null);
      }
      setLoading(false);
    };

    fetchTemplate();
  }, [id]);

  return { template, loading, error };
};