import React from 'react';
import { BookOpen, TreePine, ArrowRight, Sparkles, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DesignHub({ setDesignMode }) {
  return (
    <div style={styles.hubWrapper}>
      {/* Upper header */}
      <header style={styles.header}>
        <span style={styles.eyebrow}>EXHIBITION DESIGN SELECTOR</span>
        <h1 style={styles.mainTitle}>Hawaiian Plantation Village</h1>
        <p style={styles.subtitle}>
          Choose your visual perspective to explore the stories, cultures, and landscapes of Waipahu's historical sugar era.
        </p>
      </header>

      {/* Selector Grid */}
      <div style={styles.grid}>
        {/* Vintage Ledger Card */}
        <motion.div
          whileHover={{ y: -8 }}
          onClick={() => setDesignMode('vintage')}
          style={{ ...styles.card, ...styles.vintageCard }}
        >
          {/* Paper texture overlay */}
          <div style={styles.kraftOverlay} />
          
          <div style={styles.cardContent}>
            <div style={styles.iconContainerVintage}>
              <BookOpen size={36} color="var(--koa-wood)" />
            </div>
            
            <span className="ink-stamp rust" style={styles.badge}>
              Historic Ledger
            </span>
            
            <h2 style={styles.cardTitleVintage}>Vintage Ledger Edition</h2>
            
            <p style={styles.cardDescVintage}>
              Experience Waipahu's history rendered in authentic 19th-century ledger motifs. 
              Featuring rustic paper textures, ink-stamp accents, corrugated steel panels, 
              and typewritten archival records.
            </p>
            
            <button className="btn-primary" style={styles.cardBtn}>
              Enter Vintage Edition <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Nature Sanctuary Card */}
        <motion.div
          whileHover={{ y: -8 }}
          onClick={() => setDesignMode('nature')}
          style={{ ...styles.card, ...styles.natureCard }}
        >
          <div style={styles.cardContent}>
            <div style={styles.iconContainerNature}>
              <TreePine size={36} color="var(--nature-mist)" />
            </div>
            
            <span style={styles.natureBadge}>
              Botanical Sanctuary
            </span>
            
            <h2 style={styles.cardTitleNature}>Nature Sanctuary Edition</h2>
            
            <p style={styles.cardDescNature}>
              Discover the village as a living botanical sanctuary. 
              Reimagined with a professional, editorial design featuring emerald glassmorphism, 
              clean wide-spaced typography, and lush ecological layouts highlighting Waipahu’s canopy.
            </p>
            
            <button className="nature-btn-accent" style={styles.cardBtn}>
              Enter Nature Sanctuary <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* 3D Exhibition Card */}
        <motion.div
          whileHover={{ y: -8 }}
          onClick={() => setDesignMode('exhibition')}
          style={{ ...styles.card, ...styles.exhibitionCard }}
        >
          <div style={styles.cardContent}>
            <div style={styles.iconContainerExhibition}>
              <Sparkles size={36} color="var(--exhibit-gold)" />
            </div>
            
            <span style={styles.exhibitionBadge}>
              3D Interactive Museum
            </span>
            
            <h2 style={styles.cardTitleExhibition}>3D Exhibition Edition</h2>
            
            <p style={styles.cardDescExhibition}>
              Experience Waipahu's history in a dark-mode interactive digital exhibition.
              Featuring an ambient PixiJS background particle canopy, a 3D rotating camp house carousel, 
              interactive mouse-tilt Bango tags, and scroll-responsive 3D timelines.
            </p>
            
            <button className="exhibit-btn-primary" style={styles.cardBtn}>
              Enter 3D Exhibition <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Alethia Ecosystem Intelligence Card */}
        <motion.div
          whileHover={{ y: -8 }}
          onClick={() => setDesignMode('alethia')}
          style={{ ...styles.card, ...styles.alethiaCard }}
        >
          <div style={styles.cardContent}>
            <div style={styles.iconContainerAlethia}>
              <Leaf size={36} color="var(--alethia-accent)" />
            </div>

            <span style={styles.alethiaBadge}>
              Ecosystem Intelligence
            </span>

            <h2 style={styles.cardTitleAlethia}>Alethia-Inspired Edition</h2>

            <p style={styles.cardDescAlethia}>
              Experience HPV through a climate-tech landing lens—full-bleed hero, live heritage metrics,
              PixiJS ambient particles, 3D globe, and scroll-driven Framer Motion storytelling.
            </p>

            <button className="alethia-btn-primary" style={styles.cardBtn}>
              Enter Alethia Edition <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer notice */}
      <footer style={styles.footer}>
        <p>You can toggle instantly between these designs at any time using the selector in the bottom corner of your screen.</p>
      </footer>
    </div>
  );
}

const styles = {
  hubWrapper: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#111827', // Rich dark slate
    backgroundImage: 'radial-gradient(circle at 50% 120%, #1f2937 0%, #111827 80%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3rem 2rem 2rem 2rem',
    color: '#f3f4f6',
    boxSizing: 'border-box'
  },
  header: {
    textAlign: 'center',
    maxWidth: '700px',
    marginBottom: '2.5rem'
  },
  eyebrow: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.8rem',
    letterSpacing: '0.2em',
    color: 'var(--sugar-gold)',
    display: 'block',
    marginBottom: '0.75rem'
  },
  mainTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    fontSize: '2.75rem',
    color: '#ffffff',
    marginBottom: '1rem',
    letterSpacing: '-0.02em'
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    color: '#9ca3af',
    lineHeight: '1.6'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    width: '100%',
    maxWidth: '1200px',
    flex: '1',
    alignItems: 'stretch',
    marginBottom: '3rem'
  },
  card: {
    position: 'relative',
    minHeight: '480px',
    borderRadius: '24px',
    cursor: 'pointer',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    transition: 'box-shadow 0.3s ease'
  },
  vintageCard: {
    backgroundColor: 'var(--paper-light)',
    border: '1px solid var(--kraft-tan-dark)',
  },
  natureCard: {
    background: 'linear-gradient(135deg, var(--nature-forest) 0%, #06120b 100%)',
    border: '1px solid rgba(71, 118, 82, 0.3)',
  },
  kraftOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'var(--kraft-tan)',
    backgroundImage: 
      'radial-gradient(var(--kraft-tan-dark) 0.5px, transparent 0.5px), radial-gradient(var(--kraft-tan-dark) 0.5px, var(--kraft-tan) 0.5px)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 10px 10px',
    opacity: 0.15,
    pointerEvents: 'none',
  },
  cardContent: {
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    zIndex: 2,
    position: 'relative'
  },
  iconContainerVintage: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    backgroundColor: 'rgba(74, 44, 17, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  },
  iconContainerNature: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    backgroundColor: 'rgba(71, 118, 82, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  },
  badge: {
    alignSelf: 'flex-start',
    marginBottom: '1.25rem',
    fontSize: '0.75rem',
    letterSpacing: '0.05em'
  },
  natureBadge: {
    alignSelf: 'flex-start',
    marginBottom: '1.25rem',
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontWeight: '700',
    color: 'var(--nature-emerald)',
    border: '1px solid var(--nature-emerald)',
    padding: '3px 8px',
    borderRadius: '4px',
    fontFamily: 'var(--font-sans)'
  },
  cardTitleVintage: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.85rem',
    color: 'var(--koa-wood)',
    marginBottom: '1rem',
    fontWeight: '700'
  },
  cardTitleNature: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.85rem',
    color: 'var(--nature-mist)',
    marginBottom: '1rem',
    fontWeight: '600'
  },
  cardDescVintage: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'var(--text-dark)',
    lineHeight: '1.6',
    flex: '1'
  },
  cardDescNature: {
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.9rem',
    color: '#cbd5e1',
    lineHeight: '1.6',
    flex: '1'
  },
  exhibitionCard: {
    background: 'linear-gradient(135deg, #f4f9f6 0%, #dbeae2 100%)',
    border: '1px solid rgba(27, 56, 35, 0.25)',
  },
  iconContainerExhibition: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    backgroundColor: 'rgba(27, 56, 35, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    border: '1px solid rgba(27, 56, 35, 0.15)'
  },
  exhibitionBadge: {
    alignSelf: 'flex-start',
    marginBottom: '1.25rem',
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontWeight: '700',
    color: 'var(--exhibit-gold)',
    border: '1px solid var(--exhibit-gold)',
    padding: '3px 8px',
    borderRadius: '4px',
    fontFamily: 'var(--font-sans)'
  },
  cardTitleExhibition: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.85rem',
    color: 'var(--exhibit-text-light)',
    marginBottom: '1rem',
    fontWeight: '600'
  },
  cardDescExhibition: {
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.9rem',
    color: 'var(--exhibit-text-muted)',
    lineHeight: '1.6',
    flex: '1'
  },
  alethiaCard: {
    background: 'linear-gradient(145deg, #0b1f1c 0%, #134e4a 100%)',
    border: '1px solid rgba(245, 158, 11, 0.25)',
  },
  iconContainerAlethia: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    backgroundColor: 'rgba(15, 118, 110, 0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    border: '1px solid rgba(245, 158, 11, 0.3)'
  },
  alethiaBadge: {
    alignSelf: 'flex-start',
    marginBottom: '1.25rem',
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontWeight: '700',
    color: 'var(--alethia-accent)',
    border: '1px solid var(--alethia-accent)',
    padding: '3px 8px',
    borderRadius: '4px',
    fontFamily: 'var(--font-sans)'
  },
  cardTitleAlethia: {
    fontFamily: 'var(--font-alethia-display)',
    fontSize: '1.85rem',
    color: '#ecfdf5',
    marginBottom: '1rem',
    fontWeight: '600'
  },
  cardDescAlethia: {
    fontFamily: 'var(--font-alethia-body)',
    fontSize: '0.9rem',
    color: '#94b8b0',
    lineHeight: '1.6',
    flex: '1'
  },
  cardBtn: {
    width: '100%',
    justifyContent: 'center',
    padding: '0.85rem',
    fontSize: '0.9rem',
    marginTop: 'auto'
  },
  footer: {
    textAlign: 'center',
    maxWidth: '500px',
    fontSize: '0.75rem',
    color: '#6b7280',
    lineHeight: '1.5'
  }
};
