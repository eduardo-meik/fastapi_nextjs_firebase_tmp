import UserList from '@/components/UserList';
import StatusCard from '@/components/StatusCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Firebase + FastAPI + Next.js
            </h1>
            <p className="text-xl text-gray-600">
              A modern full-stack template with TypeScript and Tailwind CSS
            </p>
          </div>

          {/* Tech Stack Info */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tech Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="font-semibold text-gray-900">FastAPI</h3>
                <p className="text-sm text-gray-600">Backend</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <div className="text-4xl mb-2">⚛️</div>
                <h3 className="font-semibold text-gray-900">React</h3>
                <p className="text-sm text-gray-600">UI Library</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <div className="text-4xl mb-2">🔷</div>
                <h3 className="font-semibold text-gray-900">Next.js</h3>
                <p className="text-sm text-gray-600">Framework</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <div className="text-4xl mb-2">🔥</div>
                <h3 className="font-semibold text-gray-900">Firebase</h3>
                <p className="text-sm text-gray-600">Backend Services</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <div className="text-4xl mb-2">📘</div>
                <h3 className="font-semibold text-gray-900">TypeScript</h3>
                <p className="text-sm text-gray-600">Type Safety</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <div className="text-4xl mb-2">🎨</div>
                <h3 className="font-semibold text-gray-900">Tailwind CSS</h3>
                <p className="text-sm text-gray-600">Styling</p>
              </div>
            </div>
          </div>

          {/* Status and Demo Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <StatusCard />
            <UserList />
          </div>

          {/* Getting Started */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Started</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">1. Backend Setup</h3>
                <code className="block bg-gray-100 p-3 rounded text-sm">
                  cd backend && pip install -r requirements.txt && python run.py
                </code>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">2. Frontend Setup</h3>
                <code className="block bg-gray-100 p-3 rounded text-sm">
                  cd frontend && npm install && npm run dev
                </code>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">3. Configure Firebase (Optional)</h3>
                <p className="text-sm">
                  Add your Firebase credentials to enable authentication and Firestore features.
                  See the README files in each directory for detailed instructions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
