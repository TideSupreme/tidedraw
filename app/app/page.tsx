'use client'

import { useCallback, type CSSProperties } from 'react'
import { useTideCloak } from '@tidecloak/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// TideDraw Design System
const colors = {
  brand: '#0A2540',      // Deep navy
  accent: '#00D4AA',     // Teal accent
  nearBlack: '#0D1117',
  offWhite: '#F8FAFC',
  muted: '#64748B',
}

const containerStyle: CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${colors.brand} 0%, #1a365d 100%)`,
  margin: 0,
  padding: '2rem',
}

const cardStyle: CSSProperties = {
  background: '#fff',
  padding: '3rem 2.5rem',
  borderRadius: '16px',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  textAlign: 'center',
  maxWidth: '480px',
  width: '100%',
}

const logoStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '2rem',
}

const buttonStyle: CSSProperties = {
  marginTop: '1.5rem',
  padding: '1rem 2.5rem',
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: '12px',
  border: 'none',
  background: colors.accent,
  color: colors.nearBlack,
  cursor: 'pointer',
  transition: 'transform 0.1s ease, box-shadow 0.1s ease',
  boxShadow: '0 4px 14px rgba(0, 212, 170, 0.4)',
}

export default function TideDrawLogin() {
  const { login, authenticated } = useTideCloak()
  const router = useRouter()

  const onLogin = useCallback(() => {
    try {
      if (typeof login === 'function') {
        login()
      }
    } catch (e) {
      // Login will redirect; ignore transient errors during init
    }
  }, [login])

  useEffect(() => {
    if (authenticated) {
      router.push('/home')
    }
  }, [authenticated])

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={logoStyle}>
          <div style={{
            width: '48px',
            height: '48px',
            background: colors.accent,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: 800,
            color: colors.brand,
          }}>T</div>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: colors.brand, letterSpacing: '-1px' }}>TideDraw</span>
        </div>
        
        <h1 style={{ margin: '0 0 0.75rem', fontSize: '32px', fontWeight: 800, color: colors.brand, lineHeight: 1.1 }}>
          Provably Fair.<br />Zero Trust Required.
        </h1>
        
        <p style={{ color: colors.muted, fontSize: '15px', lineHeight: 1.55, marginBottom: '2rem' }}>
          Run corporate raffles, employee perks, and sweepstakes where the network picks the winner — not you.
        </p>

        <div style={{
          background: '#F1F5F9',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          fontSize: '13px',
          color: colors.muted,
        }}>
          ✓ Entries sealed with self-encryption &nbsp;•&nbsp; ✓ DPoP-bound draw sessions &nbsp;•&nbsp; ✓ Publicly auditable results
        </div>

        <button 
          onClick={onLogin} 
          style={buttonStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Continue with Tide
        </button>
        
        <p style={{ marginTop: '1.5rem', fontSize: '12px', color: colors.muted }}>
          Powered by TideCloak • No custodian. No auditor. No rigging possible.
        </p>
      </div>
    </div>
  )
}
