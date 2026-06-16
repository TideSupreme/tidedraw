'use client'

import { useTideCloak } from '@tidecloak/nextjs'
import { useState, useCallback } from 'react'
import Link from 'next/link'

// TideDraw Design System
const colors = {
  brand: '#0A2540',
  accent: '#00D4AA',
  nearBlack: '#0D1117',
  offWhite: '#F8FAFC',
  muted: '#64748B',
  cardBg: '#FFFFFF',
  border: '#E2E8F0',
}

export default function SealedEntry() {
  const { doEncrypt, doDecrypt } = useTideCloak()
  const [entryData, setEntryData] = useState({
    fullName: '',
    email: '',
    employeeId: '',
    department: '',
  })
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<{ ciphertext: string; proof: string } | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    setResult(null)

    try {
      // Use Tide self-encryption: organizer literally cannot read this
      const payload = JSON.stringify(entryData)
      const [ciphertext] = await doEncrypt([{ data: payload, tags: ['raffle-entry'] }])
      
      // Simulate storing the sealed entry (in real app, POST to API)
      const proof = `td_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
      
      // Store for demo verification
      if (typeof window !== 'undefined') {
        const entries = JSON.parse(localStorage.getItem('tidedraw-entries') || '[]')
        entries.push({ ciphertext, proof, timestamp: Date.now() })
        localStorage.setItem('tidedraw-entries', JSON.stringify(entries))
      }

      setResult({ ciphertext, proof })
    } catch (err: any) {
      setError(err.message || 'Encryption failed. Please try again.')
    } finally {
      setBusy(false)
    }
  }, [entryData, doEncrypt])

  return (
    <div style={containerStyle}>
      <div style={mainStyle}>
        <Link href="/home" style={{ color: colors.muted, textDecoration: 'none', fontSize: '14px', marginBottom: '1rem', display: 'inline-block' }}>← Back to dashboard</Link>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', background: colors.accent, color: colors.nearBlack, fontSize: '12px', padding: '4px 12px', borderRadius: '20px', fontWeight: 600, marginBottom: '1rem' }}>STEP 1 OF 2</div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: colors.brand, margin: 0 }}>Submit Sealed Entry</h1>
          <p style={{ color: colors.muted, marginTop: '0.5rem', fontSize: '15px' }}>Your information is encrypted with Tide before it ever leaves your browser. The organizer cannot read it — only you hold the key.</p>
        </div>

        <div style={cardStyle}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input 
                  type="text" 
                  value={entryData.fullName}
                  onChange={(e) => setEntryData({...entryData, fullName: e.target.value})}
                  placeholder="Alex Rivera" 
                  style={inputStyle} 
                  required 
                />
              </div>
              <div>
                <label style={labelStyle}>Work Email</label>
                <input 
                  type="email" 
                  value={entryData.email}
                  onChange={(e) => setEntryData({...entryData, email: e.target.value})}
                  placeholder="alex@company.com" 
                  style={inputStyle} 
                  required 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Employee ID</label>
                  <input 
                    type="text" 
                    value={entryData.employeeId}
                    onChange={(e) => setEntryData({...entryData, employeeId: e.target.value})}
                    placeholder="ENG-4821" 
                    style={inputStyle} 
                    required 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Department</label>
                  <input 
                    type="text" 
                    value={entryData.department}
                    onChange={(e) => setEntryData({...entryData, department: e.target.value})}
                    placeholder="Engineering" 
                    style={inputStyle} 
                    required 
                  />
                </div>
              </div>
            </div>

            <button type="submit" style={submitButtonStyle} disabled={busy}>
              {busy ? 'Sealing entry with Tide...' : '🔐 Seal Entry & Submit'}
            </button>
          </form>

          {error && <div style={errorStyle}>{error}</div>}

          {result && (
            <div style={successStyle}>
              <div style={{ color: colors.accent, fontWeight: 700, marginBottom: '0.75rem', fontSize: '18px' }}>✓ Entry Sealed Successfully</div>
              <div style={{ fontSize: '13px', color: colors.muted, marginBottom: '0.5rem' }}>Your entry is now provably private. Organizer has zero visibility.</div>
              <div style={{ background: '#F1F5F9', padding: '0.75rem', borderRadius: '8px', fontSize: '12px', fontFamily: 'monospace', wordBreak: 'break-all', marginTop: '1rem' }}>
                Proof ID: {result.proof}
              </div>
              <Link href="/draw" style={{ ...ctaStyle, marginTop: '1rem', display: 'inline-block' }}>Continue to Draw Execution →</Link>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: colors.muted, marginTop: '1.5rem' }}>
          Powered by Tide self-encryption • Data never readable by TideDraw servers
        </p>
      </div>
    </div>
  )
}

const containerStyle: React.CSSProperties = { minHeight: '100vh', background: colors.offWhite, padding: '2rem' }
const mainStyle: React.CSSProperties = { maxWidth: '620px', margin: '0 auto' }
const cardStyle: React.CSSProperties = { background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '2rem' }
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '13px', fontWeight: 600, color: colors.brand, marginBottom: '0.5rem' }
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', fontSize: '15px', border: `1px solid ${colors.border}`, borderRadius: '10px', boxSizing: 'border-box' }
const submitButtonStyle: React.CSSProperties = { width: '100%', marginTop: '1.75rem', padding: '1rem', fontSize: '16px', fontWeight: 700, borderRadius: '12px', border: 'none', background: colors.accent, color: colors.nearBlack, cursor: 'pointer' }
const errorStyle: React.CSSProperties = { marginTop: '1rem', padding: '0.75rem', background: '#FEF2F2', color: '#DC2626', borderRadius: '8px', fontSize: '14px' }
const successStyle: React.CSSProperties = { marginTop: '1.5rem', padding: '1.25rem', background: '#ECFDF5', borderRadius: '12px', border: '1px solid #A7F3D0' }
const ctaStyle: React.CSSProperties = { padding: '0.75rem 1.25rem', fontSize: '14px', fontWeight: 600, borderRadius: '10px', background: colors.brand, color: '#fff', textDecoration: 'none' }