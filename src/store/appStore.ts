import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'viewer';
  plan: 'free' | 'pro' | 'enterprise';
}

interface Funnel {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  pages: FunnelPage[];
  createdAt: Date;
  updatedAt: Date;
  conversions: number;
  views: number;
  revenue: number;
}

interface FunnelPage {
  id: string;
  name: string;
  type: 'landing' | 'checkout' | 'thankyou' | 'upsell' | 'downsell';
  elements: PageElement[];
  settings: PageSettings;
}

interface PageElement {
  id: string;
  type: 'text' | 'image' | 'button' | 'form' | 'video' | 'countdown' | 'testimonial';
  content: any;
  styles: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface PageSettings {
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
}

interface AppState {
  // UI State
  sidebarOpen: boolean;
  currentView: 'desktop' | 'tablet' | 'mobile';
  darkMode: boolean;
  
  // User State
  user: User | null;
  
  // Funnel State
  funnels: Funnel[];
  currentFunnel: Funnel | null;
  currentPage: FunnelPage | null;
  
  // Builder State
  selectedElement: PageElement | null;
  draggedElement: PageElement | null;
  clipboard: PageElement | null;
  undoStack: any[];
  redoStack: any[];
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setCurrentView: (view: 'desktop' | 'tablet' | 'mobile') => void;
  setDarkMode: (dark: boolean) => void;
  setUser: (user: User | null) => void;
  setCurrentFunnel: (funnel: Funnel | null) => void;
  setCurrentPage: (page: FunnelPage | null) => void;
  setSelectedElement: (element: PageElement | null) => void;
  addFunnel: (funnel: Funnel) => void;
  updateFunnel: (id: string, updates: Partial<Funnel>) => void;
  deleteFunnel: (id: string) => void;
  addElement: (element: PageElement) => void;
  updateElement: (id: string, updates: Partial<PageElement>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  undo: () => void;
  redo: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      sidebarOpen: true,
      currentView: 'desktop',
      darkMode: false,
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        plan: 'pro'
      },
      funnels: [],
      currentFunnel: null,
      currentPage: null,
      selectedElement: null,
      draggedElement: null,
      clipboard: null,
      undoStack: [],
      redoStack: [],

      // Actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setCurrentView: (view) => set({ currentView: view }),
      setDarkMode: (dark) => set({ darkMode: dark }),
      setUser: (user) => set({ user }),
      setCurrentFunnel: (funnel) => set({ currentFunnel: funnel }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setSelectedElement: (element) => set({ selectedElement: element }),

      addFunnel: (funnel) => set((state) => ({
        funnels: [...state.funnels, funnel]
      })),

      updateFunnel: (id, updates) => set((state) => ({
        funnels: state.funnels.map(f => f.id === id ? { ...f, ...updates } : f),
        currentFunnel: state.currentFunnel?.id === id 
          ? { ...state.currentFunnel, ...updates } 
          : state.currentFunnel
      })),

      deleteFunnel: (id) => set((state) => ({
        funnels: state.funnels.filter(f => f.id !== id),
        currentFunnel: state.currentFunnel?.id === id ? null : state.currentFunnel
      })),

      addElement: (element) => set((state) => {
        if (!state.currentPage) return state;
        
        const updatedPage = {
          ...state.currentPage,
          elements: [...state.currentPage.elements, element]
        };
        
        return {
          currentPage: updatedPage,
          undoStack: [...state.undoStack, state.currentPage],
          redoStack: []
        };
      }),

      updateElement: (id, updates) => set((state) => {
        if (!state.currentPage) return state;
        
        const updatedPage = {
          ...state.currentPage,
          elements: state.currentPage.elements.map(el => 
            el.id === id ? { ...el, ...updates } : el
          )
        };
        
        return {
          currentPage: updatedPage,
          selectedElement: state.selectedElement?.id === id 
            ? { ...state.selectedElement, ...updates }
            : state.selectedElement
        };
      }),

      deleteElement: (id) => set((state) => {
        if (!state.currentPage) return state;
        
        const updatedPage = {
          ...state.currentPage,
          elements: state.currentPage.elements.filter(el => el.id !== id)
        };
        
        return {
          currentPage: updatedPage,
          selectedElement: state.selectedElement?.id === id ? null : state.selectedElement,
          undoStack: [...state.undoStack, state.currentPage],
          redoStack: []
        };
      }),

      duplicateElement: (id) => set((state) => {
        if (!state.currentPage) return state;
        
        const element = state.currentPage.elements.find(el => el.id === id);
        if (!element) return state;
        
        const duplicated = {
          ...element,
          id: `${element.id}-copy-${Date.now()}`,
          position: {
            x: element.position.x + 20,
            y: element.position.y + 20
          }
        };
        
        const updatedPage = {
          ...state.currentPage,
          elements: [...state.currentPage.elements, duplicated]
        };
        
        return {
          currentPage: updatedPage,
          undoStack: [...state.undoStack, state.currentPage],
          redoStack: []
        };
      }),

      undo: () => set((state) => {
        if (state.undoStack.length === 0) return state;
        
        const previous = state.undoStack[state.undoStack.length - 1];
        const newUndoStack = state.undoStack.slice(0, -1);
        
        return {
          currentPage: previous,
          undoStack: newUndoStack,
          redoStack: state.currentPage ? [...state.redoStack, state.currentPage] : state.redoStack
        };
      }),

      redo: () => set((state) => {
        if (state.redoStack.length === 0) return state;
        
        const next = state.redoStack[state.redoStack.length - 1];
        const newRedoStack = state.redoStack.slice(0, -1);
        
        return {
          currentPage: next,
          redoStack: newRedoStack,
          undoStack: state.currentPage ? [...state.undoStack, state.currentPage] : state.undoStack
        };
      })
    }),
    {
      name: 'funnel-builder-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        sidebarOpen: state.sidebarOpen,
        user: state.user,
        funnels: state.funnels
      })
    }
  )
);