import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface ExamCardProps {
    title: string
    subtitle: string
    icon: LucideIcon
    features: string[]
    color: string
    bg: string
    onClick: () => void
}

export default function ExamCard({ title, subtitle, icon: Icon, features, color, bg, onClick }: ExamCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
            className="glass"
            style={{
                padding: '2.5rem',
                borderRadius: '1.5rem',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease'
            }}
            onClick={onClick}
        >
            {/* Decorative circle */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                background: bg,
                borderRadius: '50%',
                opacity: 0.6,
                zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    color: color,
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}>
                    <Icon size={40} strokeWidth={1.5} />
                </div>

                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', color: '#0f172a' }}>{title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{subtitle}</p>

                <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                    {features.map((feature, i) => (
                        <li key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#475569',
                            fontSize: '0.9rem',
                            marginBottom: '0.5rem'
                        }}>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: color }} />
                            {feature}
                        </li>
                    ))}
                </ul>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', color: color, fontWeight: 600 }}>
                    Enter Portal <span style={{ marginLeft: '0.5rem' }}>→</span>
                </div>
            </div>
        </motion.div>
    )
}
