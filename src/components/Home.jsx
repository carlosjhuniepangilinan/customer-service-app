'use client';

import { useState, useEffect } from 'react';
import ServiceForm from './ServiceForm';
import ServiceDetails from './ServiceDetails';

const Home = () => {
  const [view, setView] = useState('form'); 
  
  const [serviceRequests, setServiceRequests] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedRequests = localStorage.getItem('serviceRequests');
    if (savedRequests) {
      setServiceRequests(JSON.parse(savedRequests));
    }
    // If no localStorage data exists, start with empty array (no mock data)
  }, []);

  const handleSubmitRequest = async (newRequest) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedRequests = [newRequest, ...serviceRequests];
    setServiceRequests(updatedRequests);
    
    // Save to localStorage
    localStorage.setItem('serviceRequests', JSON.stringify(updatedRequests));
    
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Service Management</h1>
              <p className="text-gray-600 mt-1">Manage and track service requests efficiently</p>
            </div>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setView('form')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'form'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Submit Request
              </button>
              <button
                onClick={() => setView('details')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'details'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                View Requests ({serviceRequests.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {view === 'form' ? (
          <ServiceForm onSubmit={handleSubmitRequest} />
        ) : (
          <ServiceDetails serviceRequests={serviceRequests} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; 2025 Customer Service Management System. Built with Next.js and React Hook Form.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
