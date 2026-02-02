import React, { useState, useEffect } from 'react'
import { Send, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'

const collegeData: Record<string, string[]> = {
    'jee': [
        'IIT Kharagpur', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'IIT Delhi', 'IIT Guwahati', 'IIT Roorkee',
        'IIT (BHU) Varanasi', 'IIT Bhubaneswar', 'IIT Gandhinagar', 'IIT Hyderabad', 'IIT Jodhpur', 'IIT Patna',
        'IIT Ropar', 'IIT Indore', 'IIT Mandi', 'IIT (ISM) Dhanbad', 'IIT Tirupati', 'IIT Palakkad', 'IIT Bhilai',
        'IIT Goa', 'IIT Jammu', 'IIT Dharwad',
        'NIT Tiruchirappalli (Trichy)', 'NIT Karnataka (Surathkal)', 'NIT Rourkela', 'NIT Warangal', 'NIT Calicut',
        'VNIT Nagpur', 'MNIT Jaipur', 'NIT Kurukshetra', 'NIT Durgapur', 'NIT Silchar', 'MNNIT Allahabad',
        'NIT Hamirpur', 'NIT Jalandhar', 'NIT Patna', 'NIT Jamshedpur', 'NIT Srinagar', 'NIT Surat (SVNIT)',
        'NIT Raipur', 'NIT Agartala', 'MANIT Bhopal', 'NIT Goa', 'NIT Puducherry', 'NIT Uttarakhand',
        'NIT Mizoram', 'NIT Nagaland', 'NIT Meghalaya', 'NIT Manipur', 'NIT Arunachal Pradesh', 'NIT Delhi',
        'NIT Sikkim', 'NIT Andhra Pradesh'
    ],
    'neet': [
        'AIIMS Delhi', 'Christian Medical College (CMC), Vellore', 'JIPMER', 'IMS - Banaras Hindu University (BHU)',
        'Madras Medical College & Govt Hospital', "King George's Medical University (KGMU)", 'Kasturba Medical College (KMC), Manipal',
        'AIIMS Rishikesh', 'AIIMS Bhubaneswar', 'AIIMS Jodhpur', 'Vardhman Mahavir Medical College (VMMC)',
        'Dr. D. Y. Patil Vidyapeeth', 'Saveetha Institute of Medical Sciences', 'St. John’s Medical College',
        'SRM Medical College Hospital', 'Sri Ramachandra Institute of Higher Ed', "Siksha 'O' Anusandhan",
        'IPGMER Kolkata', 'Datta Meghe Institute of Medical Sciences', 'Maulana Azad Medical College (MAMC)',
        'Kalinga Institute (KIIT)', 'AIIMS Patna', 'Aligarh Muslim University (AMU)', 'Lady Hardinge Medical College (LHMC)',
        'Armed Forces Medical College (AFMC)', 'AIIMS Bhopal', 'University College of Medical Sciences',
        'Kasturba Medical College (KMC), Mangalore', 'Govt. Medical College & Hospital (GMCH)', 'Maharishi Markandeshwar',
        'Jamia Hamdard', 'AIIMS Raipur', 'JSS Medical College', 'Dayanand Medical College (DMC)',
        'PSG Institute of Medical Sciences', 'Govt. Medical College, Thiruvananthapuram', 'SMS Medical College',
        'Medical College Kolkata', 'B. J. Medical College', 'M. S. Ramaiah Medical College',
        'Mahatma Gandhi Medical College (MGMCRI)', 'Osmania Medical College', 'Christian Medical College (CMC), Ludhiana',
        'Pt. B.D. Sharma PGIMS', 'Jawaharlal Nehru Medical College (JNMC)', 'Chettinad Academy of Research',
        'Grant Medical College', 'Seth GS Medical College (KEM)', 'Bangalore Medical College (BMCRI)',
        'Government Medical College, Kozhikode'
    ],
    'bitsat': ['BITS Pilani', 'BITS Goa', 'BITS Hyderabad'],
    'mht-cet-pcm': [
        'COEP Technological University', 'Veermata Jijabai Technological Institute (VJTI)',
        'Institute of Chemical Technology (ICT)', 'Sardar Patel Institute of Technology (SPIT)',
        'Pune Institute of Computer Technology (PICT)', 'Walchand College of Engineering (WCE)',
        'Dwarkadas J. Sanghvi College of Engg (DJSCE)', 'Vishwakarma Institute of Technology (VIT)',
        'Pimpri Chinchwad College of Engineering (PCCOE)', 'Shri Ramdeobaba College of Engineering (RCOEM)',
        'Thadomal Shahani Engineering College (TSEC)', 'Vishwakarma Institute of Information Tech (VIIT)',
        'Cummins College of Engineering for Women', 'Vivekanand Education Society’s Inst. (VESIT)',
        'K.J. Somaiya Institute of Technology (KJSIEIT)', 'D.Y. Patil Institute of Technology (DYPIT)',
        'Government College of Engineering (GECA)', 'Government College of Engineering (GCOEN)',
        'Thakur College of Engineering (TCET)', 'PVG’s College of Engineering & Technology'
    ],
    'mht-cet-pcb': [
        'Institute of Chemical Technology (ICT)', 'Bombay College of Pharmacy (BCP)',
        'Poona College of Pharmacy (PCP)', 'Prin. K.M. Kundnani College of Pharmacy',
        'SVKM’s Dr. Bhanuben Nanavati College', 'Govt College of Pharmacy, Karad',
        'Govt College of Pharmacy, Aurangabad', 'Dr. D.Y. Patil Inst. of Pharma Science',
        'AISSMS College of Pharmacy', 'R.C. Patel Institute (RCPIPER)'
    ]
}

const examNameMap: Record<string, string> = {
    'jee': 'JEE',
    'neet': 'NEET',
    'bitsat': 'BITSAT',
    'mht-cet-pcm': 'MHT-CET PCM',
    'mht-cet-pcb': 'MHT-CET PCB'
}

export default function MentorshipForm() {
    const { examSlug } = useParams<{ examSlug: string }>()
    const navigate = useNavigate()
    const [college, setCollege] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    const [timeLeft, setTimeLeft] = useState(180) // 3 minutes in seconds

    // Validate slug
    useEffect(() => {
        if (examSlug && !examNameMap[examSlug]) {
            navigate('/')
        }
    }, [examSlug, navigate])

    // Countdown timer effect
    useEffect(() => {
        let timer: any
        if (isLoading && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)
        } else if (timeLeft === 0 && isLoading) {
            setIsLoading(false)
            setIsFailed(true)
        }
        return () => clearInterval(timer)
    }, [isLoading, timeLeft])

    if (!examSlug || !examNameMap[examSlug]) return null

    const examName = examNameMap[examSlug]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Instead of showing error immediately, start loading simulation
        setIsLoading(true)
        setTimeLeft(180) // Reset to 3 minutes
    }

    if (isLoading) {
        const minutes = Math.floor(timeLeft / 60)
        const seconds = timeLeft % 60
        return (
            <div className="container" style={{ maxWidth: '600px', paddingTop: '8rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass"
                    style={{ padding: '4rem', textAlign: 'center', borderRadius: '2.5rem' }}
                >
                    <div className="loading-spinner" style={{
                        width: '80px',
                        height: '80px',
                        border: '4px solid #e2e8f0',
                        borderTopColor: '#2563eb',
                        borderRadius: '50%',
                        margin: '0 auto 2.5rem',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#0f172a' }}>
                        Submitting Your Application
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>
                        We're processing your request and matching you with the best mentor. Please do not close or refresh this page.
                    </p>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: 700,
                        color: '#2563eb',
                        fontVariantNumeric: 'tabular-nums',
                        backgroundColor: '#eff6ff',
                        padding: '1.5rem',
                        borderRadius: '1.5rem',
                        display: 'inline-block',
                        minWidth: '200px'
                    }}>
                        {minutes}:{seconds.toString().padStart(2, '0')}
                    </div>
                </motion.div>
                <style>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        )
    }

    if (isFailed) {
        return (
            <div className="container" style={{ maxWidth: '600px', paddingTop: '8rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass"
                    style={{ padding: '4rem', textAlign: 'center', borderRadius: '2.5rem', border: '1px solid #fee2e2' }}
                >
                    <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#fef2f2',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        color: '#ef4444'
                    }}>
                        <AlertCircle size={48} />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#b91c1c' }}>
                        Request Failed
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '3rem' }}>
                        We encountered an error while processing your application. This could be due to a high volume of requests. Please try again later.
                    </p>
                    <a
                        href="https://guideprep.in/"
                        className="btn-primary"
                        style={{
                            padding: '1.25rem 2.5rem',
                            fontSize: '1.1rem',
                            borderRadius: '1.25rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            textDecoration: 'none'
                        }}
                    >
                        Please go back to dashboard
                    </a>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="container" style={{ maxWidth: '800px', paddingTop: '4rem', paddingBottom: '4rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{ padding: '3rem', borderRadius: '2rem', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.05)' }}
            >
                <header style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: '#0f172a', lineHeight: 1.2 }}>
                        Connect with your personal 1-to-1 <span style={{ color: '#2563eb' }}>Topper mentor</span>
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
                        Fill the form & your mentor will reach you within 4 hours.
                        This mentorship is valid till <span style={{ fontWeight: 600, color: '#0f172a' }}>{examName} - 2026</span>.
                    </p>
                </header>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: '#334155' }}>I want my mentor from</label>
                        <select
                            required
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #e2e8f0',
                                backgroundColor: '#fff',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        >
                            <option value="">Select a college</option>
                            {collegeData[examSlug].map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 600, color: '#334155' }}>Write down message for your mentor</label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Tell your mentor about your current preparation level and goals..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                borderRadius: '0.75rem',
                                border: '1px solid #e2e8f0',
                                fontSize: '1rem',
                                outline: 'none',
                                resize: 'none'
                            }}
                        />
                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                            Description: This helps your mentor understand your current situation before connecting with you.
                            Thereafter, they will connect with you daily, make your daily study schedule, guide your daily till your exam.
                        </p>
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                        <Send size={18} /> Submit Application
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

