import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gamepad2, Puzzle, Sparkles, Trophy } from 'lucide-react';
import AlethiaPageHeader from './AlethiaPageHeader';

const GAMES = [
  { id: 'match', title: 'Culture Match', desc: 'Pair camp houses with their immigrant communities.', icon: Puzzle },
  { id: 'timeline', title: 'Timeline Sprint', desc: 'Place key plantation-era dates in chronological order.', icon: Trophy },
  { id: 'garden', title: 'Garden Scout', desc: 'Identify native and heritage plants across the village grounds.', icon: Sparkles },
];

export default function Play() {
  const [score, setScore] = useState(0);
  const [lastGame, setLastGame] = useState(null);

  const playGame = (game) => {
    setLastGame(game.title);
    setScore((s) => s + Math.floor(Math.random() * 15) + 10);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 }, colors: ['#0f766e', '#f59e0b', '#14b8a6'] });
  };

  return (
    <div style={styles.page} className="theme-alethia">
      <AlethiaPageHeader
        eyebrow="Play & learn"
        title="Heritage Games"
        subtitle="Lightweight interactive challenges that make plantation history stick—fun for families and school groups."
      />
      <div style={styles.container}>
        <div style={styles.scoreBar} className="alethia-glass">
          <Gamepad2 size={22} color="var(--alethia-accent)" />
          <div>
            <span style={styles.scoreLabel}>Heritage Score</span>
            <strong style={styles.scoreValue}>{score} pts</strong>
          </div>
          {lastGame && <span style={styles.lastPlay}>Last played: {lastGame}</span>}
        </div>

        <div style={styles.grid}>
          {GAMES.map((game, i) => {
            const Icon = game.icon;
            return (
              <motion.button
                key={game.id}
                className="alethia-glass"
                style={styles.gameCard}
                onClick={() => playGame(game)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Icon size={28} color="var(--alethia-primary)" />
                <h3 style={styles.gameTitle}>{game.title}</h3>
                <p style={styles.gameDesc}>{game.desc}</p>
                <span style={styles.playLabel}>Tap to play →</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { position: 'relative', zIndex: 1, paddingBottom: '4rem' },
  container: { maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' },
  scoreBar: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem', marginBottom: '2rem', flexWrap: 'wrap' },
  scoreLabel: { display: 'block', fontSize: '0.75rem', color: 'var(--alethia-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' },
  scoreValue: { fontFamily: 'var(--font-alethia-display)', fontSize: '1.5rem', color: 'var(--alethia-primary)' },
  lastPlay: { marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--alethia-text-muted)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' },
  gameCard: { padding: '1.5rem', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  gameTitle: { fontSize: '1.1rem', fontWeight: 600 },
  gameDesc: { margin: 0, fontSize: '0.9rem', color: 'var(--alethia-text-muted)', lineHeight: 1.55, flex: 1 },
  playLabel: { fontSize: '0.82rem', fontWeight: 600, color: 'var(--alethia-accent)' },
};
