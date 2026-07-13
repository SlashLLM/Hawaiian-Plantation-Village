import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Shield, Gift, RefreshCw, Eye } from 'lucide-react';

const TIERS = [
  {
    id: 1,
    name: 'Cane Cut Patron',
    price: '$50',
    frequency: 'annually',
    desc: 'Support basic cottage preservation and educational field trips for local Title I schools.',
    frontColor: 'linear-gradient(135deg, #182230 0%, #0f1622 100%)',
    perks: [
      'Unlimited general admission for 1 person',
      '10% discount at the museum shop',
      'Exclusive newsletter updates'
    ]
  },
  {
    id: 2,
    name: 'Bango Guardian',
    price: '$150',
    frequency: 'annually',
    desc: 'Fund historical database digitization and restoration of period furniture inside the camp houses.',
    frontColor: 'linear-gradient(135deg, #2b2216 0%, #1a140d 100%)',
    perks: [
      'Unlimited general admission for 4 guests',
      '2 tickets to the annual Obon Festival',
      '15% discount at the museum shop',
      'Name listed in our digital archive'
    ]
  },
  {
    id: 3,
    name: 'Sanctuary Keeper',
    price: '$500',
    frequency: 'annually',
    desc: 'Sponsor the botanical garden revival, heritage seed propagation, and professional docent training.',
    frontColor: 'linear-gradient(135deg, #1c2a1a 0%, #0d160c 100%)',
    perks: [
      'All Guardian level benefits',
      'Private guided tour for up to 8 guests',
      'Invitation to patron-only preview events',
      'Engraved copper plaque on the donor wall'
    ]
  }
];

export default function Support() {
  const [flippedCards, setFlippedCards] = useState({});

  const handleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div style={styles.pageContainer} className="theme-exhibition">
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <span style={styles.sectionBadge}>PRESERVATION & DONATIONS</span>
          <h1 style={styles.title}>Support Our Heritage</h1>
          <p style={styles.subtitle}>
            Hawaiian Plantation Village is preserved by the Waipahu community. Your donations maintain the cottages, plants, and archives for future generations.
          </p>
        </header>

        {/* 3D Flipping Cards Grid */}
        <div style={styles.grid}>
          {TIERS.map((tier) => {
            const isFlipped = flippedCards[tier.id];
            return (
              <div 
                key={tier.id} 
                style={styles.cardContainer}
                onClick={() => handleFlip(tier.id)}
              >
                <div 
                  style={{
                    ...styles.cardWrapper,
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front Side: Price & Description */}
                  <div 
                    className="card-3d-face exhibit-glass-card" 
                    style={{ ...styles.cardFront, background: tier.frontColor }}
                  >
                    <div style={styles.cardTop}>
                      <Shield size={24} color="var(--exhibit-gold)" />
                      <span style={styles.tierName}>{tier.name}</span>
                    </div>
                    
                    <div style={styles.priceContainer}>
                      <h2 style={styles.price}>{tier.price}</h2>
                      <span style={styles.frequency}>/ {tier.frequency}</span>
                    </div>

                    <p style={styles.tierDesc}>{tier.desc}</p>
                    
                    <div style={styles.flipNotice}>
                      <Eye size={12} /> CLICK CARD TO INSPECT PERKS
                    </div>
                  </div>

                  {/* Back Side: Perks & Join Button */}
                  <div 
                    className="card-3d-face exhibit-glass-card" 
                    style={styles.cardBack}
                  >
                    <h4 style={styles.perksTitle}>MEMBERSHIP PERKS:</h4>
                    <div style={styles.perksDivider} />
                    <ul style={styles.perksList}>
                      {tier.perks.map((perk, pIdx) => (
                        <li key={pIdx} style={styles.perkItem}>
                          <Gift size={14} color="var(--exhibit-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>

                    <button 
                      className="exhibit-btn-primary" 
                      style={styles.joinBtn}
                      onClick={(e) => {
                        e.stopPropagation(); // prevent flipping when clicking button
                        alert(`Thank you for selecting the ${tier.name}! You will be redirected to the secure gateway.`);
                      }}
                    >
                      Join at this Tier
                    </button>
                    
                    <div style={styles.flipNoticeBack}>
                      CLICK TO GO BACK
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alternative ways to help */}
        <div style={styles.communityModule} className="exhibit-glass-card">
          <div style={styles.comGrid}>
            <div>
              <span style={styles.sectionBadge}>COMMUNITY IMPACT</span>
              <h3 style={styles.comTitle}>Volunteer docents & gardening</h3>
              <p style={styles.comText}>
                Prefer hands-on preservation? We are always looking for gardening volunteers to manage our heritage fields of sugarcane, taro, and ethnic vegetables, as well as tour guides to share Waipahu’s history with school groups.
              </p>
            </div>
            <div style={styles.comRight}>
              <button className="exhibit-btn-secondary">
                Apply as Volunteer
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    padding: '4rem 2rem',
    boxSizing: 'border-box'
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    width: '100%'
  },
  header: {
    textAlign: 'center',
    maxWidth: '750px',
    margin: '0 auto 4rem auto'
  },
  sectionBadge: {
    fontFamily: 'var(--font-exhibit-mono)',
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    color: 'var(--exhibit-gold)',
    display: 'block',
    marginBottom: '0.75rem'
  },
  title: {
    fontSize: '2.75rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.05rem',
    lineHeight: '1.65',
    color: 'var(--exhibit-text-muted)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2.5rem',
    perspective: '1200px',
    marginBottom: '4rem'
  },
  cardContainer: {
    height: '380px',
    cursor: 'pointer',
    transformStyle: 'preserve-3d'
  },
  cardWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  cardFront: {
    padding: '2.25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.06)',
    boxSizing: 'border-box'
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  tierName: {
    fontFamily: 'var(--font-exhibit-display)',
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'var(--exhibit-text-light)'
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    margin: '1.5rem 0 1rem 0'
  },
  price: {
    fontSize: '3.25rem',
    fontWeight: '800',
    color: 'var(--exhibit-text-light)',
    fontFamily: 'var(--font-exhibit-display)',
    lineHeight: '1'
  },
  frequency: {
    fontSize: '0.85rem',
    color: 'var(--exhibit-text-muted)',
    fontFamily: 'var(--font-exhibit-mono)'
  },
  tierDesc: {
    fontSize: '0.88rem',
    lineHeight: '1.6',
    color: 'var(--exhibit-text-muted)',
    marginBottom: '1rem',
    flex: '1'
  },
  flipNotice: {
    fontSize: '0.62rem',
    color: 'var(--exhibit-gold)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: '700',
    letterSpacing: '0.05em'
  },
  cardBack: {
    padding: '2.25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'var(--exhibit-bg-card)',
    borderRadius: '20px',
    border: '1px solid rgba(27, 56, 35, 0.15)',
    boxSizing: 'border-box'
  },
  perksTitle: {
    fontSize: '0.85rem',
    fontFamily: 'var(--font-exhibit-mono)',
    color: 'var(--exhibit-gold)',
    letterSpacing: '0.08em',
    marginBottom: '0.5rem'
  },
  perksDivider: {
    height: '1px',
    backgroundColor: 'rgba(27, 56, 35, 0.15)',
    marginBottom: '1.25rem'
  },
  perksList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1
  },
  perkItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '0.85rem',
    color: 'var(--exhibit-text-light)',
    lineHeight: '1.4'
  },
  joinBtn: {
    width: '100%',
    justifyContent: 'center',
    padding: '0.75rem',
    marginTop: '1.5rem'
  },
  flipNoticeBack: {
    fontSize: '0.62rem',
    color: 'var(--exhibit-text-muted)',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: '8px'
  },
  communityModule: {
    padding: '2.5rem',
    boxSizing: 'border-box'
  },
  comGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '2rem',
    alignItems: 'center'
  },
  comTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '0.5rem'
  },
  comText: {
    fontSize: '0.92rem',
    lineHeight: '1.6',
    color: 'var(--exhibit-text-muted)',
    margin: 0
  },
  comRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  // Responsive overrides
  '@media (max-width: 768px)': {
    comGrid: {
      gridTemplateColumns: '1fr'
    },
    comRight: {
      justifyContent: 'flex-start'
    }
  }
};
