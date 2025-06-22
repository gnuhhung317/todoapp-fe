'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/todos';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_BASE_URL);
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch todos. Please check if the backend is running.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new todo
  const handleAddTodo = async (newTodo) => {
    try {
      setError(null);
      const response = await axios.post(API_BASE_URL, newTodo);
      setTodos([...todos, response.data]);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
    }
  };

  // Update todo
  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      setError(null);
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedTodo);
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    try {
      setError(null);
      await axios.delete(`${API_BASE_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full">
      <div className="w-full px-6 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Todo List
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed text-center">
            Organize your tasks efficiently and boost your productivity
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full mb-8">
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-6 py-4 rounded-r-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-500 hover:text-red-700 font-bold text-xl ml-4 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Container */}
        <div className="w-full">
          {/* Add Task Form Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8 w-full">
            <TodoForm onAddTodo={handleAddTodo} />
          </div>

          {/* Task List Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full">
            {/* Header with Refresh Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Your Tasks
                </h2>
                <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full">
                  {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
                </span>
              </div>
              {todos.length > 0 && (
                <button
                  onClick={fetchTodos}
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm min-h-[44px]"
                  title="Refresh task list"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              )}
            </div>
            
            {todos.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-300 text-8xl mb-6">📝</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks yet</h3>
                <p className="text-gray-500">Add your first task above to get started!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onUpdate={handleUpdateTodo}
                    onDelete={handleDeleteTodo}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList; 