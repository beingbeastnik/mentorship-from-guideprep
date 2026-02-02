import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import MentorshipForm from './components/MentorshipForm'

export type Exam = 'JEE' | 'NEET' | 'BITSAT' | 'MHT-CET PCM' | 'MHT-CET PCB'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f8fafc]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:examSlug" element={<MentorshipForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
