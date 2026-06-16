'use client'

import { useTideCloak } from '@tidecloak/nextjs'
import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import tcConfig from "../../tidecloak.json"

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

export default function TideDrawHome() {
  const { logout, getValueFromIdToken, token } = useTideCloak()
  const [username, setUsername] = useState("")

  useEffect(() => {
    if (token) {
      const name = getValueFromIdToken("preferred_username")
      setUsername(name || "Organizer")
    }
  }, [token])

  const onLogout = useCallback(() => {
    logout()
  }, [logout])

  const activeRaffles = [
    { id: 1, name: "Q2 Engineering Perk Drawing", entries: 147, deadline: "2 days" },
    { id: 2, name: "Customer Loyalty Sweepstakes", entries: 2891, deadline: "5 days" },
  ]

  return (
    <div style={containerStyle}>
      <div style={mainStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px', height: '36px', background: colors.accent,
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', fontWeight: 800, color: colors.brand,
            }}>T</div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: colors.brand, letterSpacing: '-0.5px' }}>TideDraw</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: colors.muted, fontSize: '14px' }}>Welcome, {username}</span>
            <button onClick={onLogout} style={logoutButtonStyle}>Sign out</button>
          </div>
        </div>

        {/* Hero Stats */}
        <div style={heroStyle}>
          <div>
            <div style={{ fontSize: '13px', color: colors.muted, marginBottom: '0.25rem' }}>TOTAL DRAWS RUN</div>
            <div style={{ fontSize: '42px', fontWeight: 800, color: colors.brand, lineHeight: 1 }}>1,284</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', color: colors.muted, marginBottom: '0.25rem' }}>VERIFIED OUTCOMES</div>
            <div style={{ fontSize: '42px', fontWeight: 800, color: colors.accent, lineHeight: 1 }}>100%</div>
          </div>
        </div>

        {/* Active Raffles */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: colors.brand, margin: 0 }}>Active Raffles</h2>
            <Link href="/enter" style={linkStyle}>+ New Entry</Link>
          </div>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {activeRaffles.map((raffle) => (
              <div key={raffle.id} style={raffleCardStyle}>
                <div>
                  <div style={{ fontWeight: 600, color: colors.brand, marginBottom: '4px' }}>{raffle.name}</div>
                  <div style={{ fontSize: '13px', color: colors.muted }}>{raffle.entries} sealed entries • closes in {raffle.deadline}</div>
                </div>
                <Link href="/draw" style={ctaSmallStyle}>Run Draw →</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Navigation */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: colors.brand, marginBottom: '1rem' }}>What would you like to do?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Link href="/enter" style={featureCardStyle}>
              <div style={featureIconStyle}>🔐</div>
              <div style={{ fontWeight: 700, color: colors.brand, marginBottom: '4px' }}>Submit Sealed Entry</div>
              <div style={{ fontSize: '13px', color: colors.muted, lineHeight: 1.5 }}>Encrypt your entry with Tide — only you can ever decrypt it.</div>
            </Link>
            <Link href="/draw" style={featureCardStyle}>
              <div style={featureIconStyle}>🎲</div>
              <div style={{ fontWeight: 700, color: colors.brand, marginBottom: '4px' }}>Execute Verifiable Draw</div>
              <div style={{ fontSize: '13px', color: colors.muted, lineHeight: 1.5 }}>Run a DPoP-bound draw. Cryptographic proof included. Anyone can audit.</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Styles
const containerStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: colors.offWhite,
  padding: '2rem',
}

const mainStyle: React.CSSProperties = {
  maxWidth: '920px',
  margin: '0 auto',
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  paddingBottom: '1.5rem',
  borderBottom: `1px solid ${colors.border}`,
}

const heroStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  background: colors.brand,
  borderRadius: '16px',
  padding: '2rem 2.5rem',
  marginBottom: '2rem',
  color: '#fff',
}

const logoutButtonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  fontSize: '13px',
  borderRadius: '8px',
  border: `1px solid ${colors.border}`,
  background: 'transparent',
  color: colors.muted,
  cursor: 'pointer',
}

const linkStyle: React.CSSProperties = {
  fontSize: '14px',
  color: colors.accent,
  textDecoration: 'none',
  fontWeight: 600,
}

const raffleCardStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: colors.cardBg,
  border: `1px solid ${colors.border}`,
  borderRadius: '12px',
  padding: '1.25rem 1.5rem',
}

const ctaSmallStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  fontSize: '13px',
  fontWeight: 600,
  borderRadius: '8px',
  background: colors.accent,
  color: colors.nearBlack,
  textDecoration: 'none',
}

const featureCardStyle: React.CSSProperties = {
  background: colors.cardBg,
  border: `1px solid ${colors.border}`,
  borderRadius: '16px',
  padding: '1.75rem',
  textDecoration: 'none',
  transition: 'box-shadow 0.1s ease',
}

const featureIconStyle: React.CSSProperties = {
  fontSize: '32px',
  marginBottom: '1rem',
}

