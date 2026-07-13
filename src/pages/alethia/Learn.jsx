import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import AlethiaPageHeader from './AlethiaPageHeader';

const PROGRAMS = [
  {
    icon: GraduationCap,
    title: 'School Field Trips',
    desc: 'Aligned with Hawaiʻi social studies standards. Docent-led tours plus optional activity packets for grades 3–12.',
  },
  {
    icon: BookOpen,
    title: 'Research & Archives',
    desc: 'Access oral histories, plantation ledgers, and community-curated exhibits for classroom and family research.',
  },
  {
    icon: Users,
    title: 'Community Workshops',
    desc: 'Seasonal demonstrations—bread baking, music, crafts—led by cultural practitioners and village partners.',
  },
];

const ARTICLES = [
  { date: 'Aug 2025', title: 'Teaching Plantation History Without Stereotypes', tag: 'Educator Guide' },
  { date: 'Jul 2025', title: 'Native Plants Along the Village Walk', tag: 'Garden Notes' },
  { date: 'Jun 2025', title: 'Bon Season: Music, Memory, and Waipahu', tag: 'Cultural Calendar' },
];

export default function Learn() {
  return (
    <div style={styles.page} className="theme-alethia">
      <AlethiaPageHeader
        eyebrow="Learn"
        title="Education & Insights"
        subtitle="Programs, resources, and articles that help teachers, students, and families go deeper."
      />
      <div style={styles.container}>
        <div style={styles.programGrid}>
          {PROGRAMS.map((prog, i) => {
            const Icon = prog.icon;
            return (
              <motion.article
                key={prog.title}
                className="alethia-glass"
                style={styles.programCard}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Icon size={24} color="var(--alethia-primary)" />
                <h3 style={styles.programTitle}>{prog.title}</h3>
                <p style={styles.programDesc}>{prog.desc}</p>
              </motion.article>
            );
          })}
        </div>

        <h2 style={styles.sectionTitle}>Latest insights</h2>
        <div style={styles.articleList}>
          {ARTICLES.map((article) => (
            <article key={article.title} className="alethia-glass" style={styles.article}>
              <span style={styles.articleTag}>{article.tag}</span>
              <span style={styles.articleDate}>{article.date}</span>
              <h3 style={styles.articleTitle}>{article.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { position: 'relative', zIndex: 1, paddingBottom: '4rem' },
  container: { maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' },
  programGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '3rem' },
  programCard: { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  programTitle: { fontSize: '1.05rem', fontWeight: 600 },
  programDesc: { margin: 0, fontSize: '0.9rem', color: 'var(--alethia-text-muted)', lineHeight: 1.6 },
  sectionTitle: { fontSize: '1.5rem', marginBottom: '1rem' },
  articleList: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  article: { padding: '1.25rem 1.5rem' },
  articleTag: { fontSize: '0.72rem', fontWeight: 700, color: 'var(--alethia-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '0.75rem' },
  articleDate: { fontSize: '0.78rem', color: 'var(--alethia-text-muted)' },
  articleTitle: { fontSize: '1.05rem', marginTop: '0.5rem', fontWeight: 600 },
};
