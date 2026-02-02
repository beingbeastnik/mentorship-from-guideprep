import type { Exam } from '../App'
import ExamCard from './ExamCard'
import { Beaker, HeartPulse, Sparkles, Monitor } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const exams = [
    {
        id: 'JEE' as Exam,
        slug: 'jee',
        title: 'JEE',
        subtitle: 'Engineering Entrance (Main/Adv)',
        icon: Beaker,
        features: ['Physics, Chemistry, Math', 'Engineering Focused'],
        color: 'var(--jee-color)',
        bg: '#eff6ff'
    },
    {
        id: 'NEET' as Exam,
        slug: 'neet',
        title: 'NEET',
        subtitle: 'National Medical Entrance (UG)',
        icon: HeartPulse,
        features: ['Physics, Chemistry, Bio', 'Medical Focused'],
        color: 'var(--neet-color)',
        bg: '#ecfdf5'
    },
    {
        id: 'BITSAT' as Exam,
        slug: 'bitsat',
        title: 'BITSAT',
        subtitle: 'BITS Pilani University Entrance',
        icon: Sparkles,
        features: ['Physics, Chemistry, Math', 'Time Management Focused'],
        color: 'var(--bitsat-color)',
        bg: '#f5f3ff'
    },
    {
        id: 'MHT-CET PCM' as Exam,
        slug: 'mht-cet-pcm',
        title: 'MHT-CET PCM',
        subtitle: 'Maharashtra Common Entrance',
        icon: Monitor,
        features: ['Physics, Chemistry, Math', 'Engineering Stream'],
        color: 'var(--mhtset-pcm)',
        bg: '#ecfeff'
    },
    {
        id: 'MHT-CET PCB' as Exam,
        slug: 'mht-cet-pcb',
        title: 'MHT-CET PCB',
        subtitle: 'Maharashtra Common Entrance',
        icon: Beaker,
        features: ['Physics, Chemistry, Bio', 'Medical Stream'],
        color: 'var(--mhtset-pcb)',
        bg: '#f0fdf4'
    }
]

export default function Dashboard() {
    const navigate = useNavigate()

    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }} className="fade-in">
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#0f172a' }}>
                    Choose Your <span style={{ color: '#2563eb' }}>Future.</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                    Select your exam path to access a tailored practice environment designed for excellence.
                </p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
                marginTop: '2rem'
            }}>
                {exams.map((exam, index) => (
                    <div key={exam.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <ExamCard
                            {...exam}
                            onClick={() => navigate(`/${exam.slug}`)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
