import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Type,
  Image,
  MousePointer,
  FileText,
  Video,
  Clock,
  Star,
  Layers,
  Palette,
  Settings,
  Smartphone,
  Monitor,
  Tablet,
  Undo,
  Redo,
  Copy,
  Trash2,
  Plus
} from 'lucide-react';
import { useAppStore } from '../store/appStore';

const FunnelBuilder = () => {
  const { 
    currentView, 
    currentPage, 
    selectedElement, 
    setSelectedElement,
    addElement,
    updateElement,
    deleteElement,
    duplicateElement,
    undo,
    redo,
    undoStack,
    redoStack
  } = useAppStore();

  const [activeTab, setActiveTab] = useState('elements');

  const elementTypes = [
    { type: 'text', icon: Type, label: 'Text', color: 'blue' },
    { type: 'image', icon: Image, label: 'Image', color: 'green' },
    { type: 'button', icon: MousePointer, label: 'Button', color: 'purple' },
    { type: 'form', icon: FileText, label: 'Form', color: 'orange' },
    { type: 'video', icon: Video, label: 'Video', color: 'red' },
    { type: 'countdown', icon: Clock, label: 'Countdown', color: 'yellow' },
    { type: 'testimonial', icon: Star, label: 'Testimonial', color: 'pink' }
  ];

  const handleAddElement = (type: string) => {
    const newElement = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type),
      position: { x: 100, y: 100 },
      size: { width: 300, height: 100 }
    };
    
    addElement(newElement);
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'text':
        return { text: 'Your text here', fontSize: 16, fontWeight: 'normal' };
      case 'button':
        return { text: 'Click Me', action: 'link', url: '#' };
      case 'image':
        return { src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Placeholder' };
      case 'form':
        return { fields: [{ type: 'email', label: 'Email', required: true }] };
      case 'video':
        return { src: '', poster: '', autoplay: false };
      case 'countdown':
        return { endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), format: 'days' };
      case 'testimonial':
        return { text: 'Amazing product!', author: 'John Doe', rating: 5 };
      default:
        return {};
    }
  };

  const getDefaultStyles = (type: string) => {
    return {
      backgroundColor: type === 'button' ? '#3b82f6' : 'transparent',
      color: type === 'button' ? '#ffffff' : '#000000',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      fontFamily: 'Inter, sans-serif'
    };
  };

  const getViewportWidth = () => {
    switch (currentView) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '1200px';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Elements & Properties */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('elements')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'elements'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            Elements
          </button>
          <button
            onClick={() => setActiveTab('styles')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'styles'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Palette className="w-4 h-4 inline mr-2" />
            Styles
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'settings'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Settings
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'elements' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Drag Elements</h3>
              <div className="grid grid-cols-2 gap-3">
                {elementTypes.map((element) => {
                  const Icon = element.icon;
                  return (
                    <motion.button
                      key={element.type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddElement(element.type)}
                      className={`p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-${element.color}-300 hover:bg-${element.color}-50 transition-all group`}
                    >
                      <Icon className={`w-6 h-6 text-gray-400 group-hover:text-${element.color}-500 mx-auto mb-2`} />
                      <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">
                        {element.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-2">
                <h4 className="font-medium text-gray-900">Quick Actions</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={undo}
                    disabled={undoStack.length === 0}
                    className="flex items-center space-x-1 px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Undo className="w-4 h-4" />
                    <span>Undo</span>
                  </button>
                  <button
                    onClick={redo}
                    disabled={redoStack.length === 0}
                    className="flex items-center space-x-1 px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Redo className="w-4 h-4" />
                    <span>Redo</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'styles' && selectedElement && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Element Styles</h3>
              
              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <input
                  type="color"
                  value={selectedElement.styles.backgroundColor || '#ffffff'}
                  onChange={(e) => updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, backgroundColor: e.target.value }
                  })}
                  className="w-full h-10 rounded-lg border border-gray-200"
                />
              </div>

              {/* Text Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Color
                </label>
                <input
                  type="color"
                  value={selectedElement.styles.color || '#000000'}
                  onChange={(e) => updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, color: e.target.value }
                  })}
                  className="w-full h-10 rounded-lg border border-gray-200"
                />
              </div>

              {/* Padding */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Padding
                </label>
                <input
                  type="text"
                  value={selectedElement.styles.padding || '12px 24px'}
                  onChange={(e) => updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, padding: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Border Radius */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Border Radius
                </label>
                <input
                  type="text"
                  value={selectedElement.styles.borderRadius || '8px'}
                  onChange={(e) => updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, borderRadius: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Page Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  placeholder="Enter page title"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  placeholder="Enter meta description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom CSS
                </label>
                <textarea
                  placeholder="/* Custom CSS */"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Canvas Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Canvas</span>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Zoom: 100%</span>
              <span>•</span>
              <span>{getViewportWidth()}</span>
            </div>
          </div>

          {selectedElement && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => duplicateElement(selectedElement.id)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteElement(selectedElement.id)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-100 p-8 overflow-auto">
          <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden" style={{ width: getViewportWidth(), minHeight: '800px' }}>
            <motion.div
              className="relative h-full"
              style={{ minHeight: '800px' }}
            >
              {currentPage?.elements.map((element) => (
                <motion.div
                  key={element.id}
                  drag
                  dragMomentum={false}
                  onDragEnd={(event, info) => {
                    updateElement(element.id, {
                      position: {
                        x: element.position.x + info.offset.x,
                        y: element.position.y + info.offset.y
                      }
                    });
                  }}
                  onClick={() => setSelectedElement(element)}
                  className={`absolute cursor-move ${
                    selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{
                    left: element.position.x,
                    top: element.position.y,
                    width: element.size.width,
                    height: element.size.height,
                    ...element.styles
                  }}
                >
                  {renderElement(element)}
                </motion.div>
              ))}

              {/* Empty State */}
              {(!currentPage?.elements || currentPage.elements.length === 0) && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Plus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building</h3>
                    <p className="text-gray-600">Drag elements from the sidebar to start creating your funnel page.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderElement = (element: any) => {
  switch (element.type) {
    case 'text':
      return (
        <div
          style={{
            fontSize: element.content.fontSize,
            fontWeight: element.content.fontWeight
          }}
        >
          {element.content.text}
        </div>
      );
    
    case 'button':
      return (
        <button className="w-full h-full flex items-center justify-center font-medium">
          {element.content.text}
        </button>
      );
    
    case 'image':
      return (
        <img
          src={element.content.src}
          alt={element.content.alt}
          className="w-full h-full object-cover"
        />
      );
    
    case 'form':
      return (
        <form className="space-y-4 p-4">
          {element.content.fields.map((field: any, index: number) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                required={field.required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      );
    
    case 'countdown':
      return (
        <div className="text-center p-4">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            Limited Time Offer!
          </div>
          <div className="text-lg text-red-600">
            Ends in: 7 days 12:34:56
          </div>
        </div>
      );
    
    case 'testimonial':
      return (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            {[...Array(element.content.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-700 mb-2">"{element.content.text}"</p>
          <p className="text-sm font-medium text-gray-900">- {element.content.author}</p>
        </div>
      );
    
    default:
      return <div>Unknown element type</div>;
  }
};

export default FunnelBuilder;