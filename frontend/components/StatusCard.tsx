'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function StatusCard() {
  const [apiStatus, setApiStatus] = useState<'loading' | 'healthy' | 'error'>('loading');
  const [firebaseStatus, setFirebaseStatus] = useState<{
    initialized: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      await api.checkHealth();
      setApiStatus('healthy');
      
      const fbStatus = await api.getFirebaseStatus();
      setFirebaseStatus({
        initialized: fbStatus.firebase_initialized,
        message: fbStatus.message,
      });
    } catch (err) {
      setApiStatus('error');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">System Status</h2>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Backend API:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              apiStatus === 'healthy'
                ? 'bg-green-100 text-green-700'
                : apiStatus === 'error'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {apiStatus === 'healthy' ? '✓ Healthy' : apiStatus === 'error' ? '✗ Error' : '⟳ Loading'}
          </span>
        </div>

        {firebaseStatus && (
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Firebase (Backend):</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                firebaseStatus.initialized
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {firebaseStatus.initialized ? '✓ Connected' : '○ Not Configured'}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Frontend Firebase:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              process.env.NEXT_PUBLIC_FIREBASE_API_KEY
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✓ Configured' : '○ Not Configured'}
          </span>
        </div>
      </div>

      <button
        onClick={checkStatus}
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Refresh Status
      </button>
    </div>
  );
}
