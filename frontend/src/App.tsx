import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AuditLog from './pages/AuditLog'
import Dashboard from './pages/Dashboard'
import Deployments from './pages/Deployments'
import Incidents from './pages/Incidents'
import Services from './pages/Services'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="flex min-h-screen">
          <Sidebar />

          <main className="flex min-w-0 flex-1 flex-col">
            <Header />

            <div className="flex-1 p-6 lg:p-8">
              <div className="mx-auto max-w-7xl">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/incidents" element={<Incidents />} />
                  <Route path="/deployments" element={<Deployments />} />
                  <Route path="/audit-log" element={<AuditLog />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
