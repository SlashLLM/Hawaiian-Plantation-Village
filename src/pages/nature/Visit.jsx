import React, { useState } from 'react';
import { Clock, MapPin, Ticket, ParkingCircle, Footprints, ShieldAlert, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Visit({ setActivePage }) {
  const [activeTab, setActiveTab] = useState('hours');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How long does a typical visit take?',
      a: 'We recommend allocating at least 1.5 to 2 hours. A full guided tour takes approximately 90 minutes, and you can explore the gardens and exhibits afterward.'
    },
    {
      q: 'Are the historic buildings accessible?',
      a: 'As a historic preservation site, some cottages have elevated steps or narrow doorways that replicate original plantation-era conditions. However, many structures have ramps, and our central pathways are wheelchair-friendly. Please contact us for specialized accessibility support.'
    },
    {
      q: 'Is photography permitted?',
      a: 'Personal photography and filming are highly encouraged! For commercial photography or wedding sessions, please obtain a permit at the managers office.'
    },
    {
      q: 'Is the village open in the rain?',
      a: 'Yes, we are open rain or shine! Hawaii weather can be tropical; we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings.'
    }
  ];

  return (
    <div style={styles.pageContainer} className="theme-nature">
      {/* Header */}
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span style={styles.headerBadge}>PLAN YOUR JOURNEY</span>
          <h1 style={styles.pageTitle}>Visitor Experience</h1>
          <p style={styles.pageSubtitle}>Prepare for a meaningful walk through history, architecture, and lush tropical flora.</p>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.contentGrid}>
          {/* Left Column: Interactive Tabs */}
          <div style={styles.leftCol}>
            {/* Tabs Header */}
            <div style={styles.tabsHeader} className="nature-glass-card">
              <button
                onClick={() => setActiveTab('hours')}
                style={{ ...styles.tabButton, ...(activeTab === 'hours' ? styles.tabButtonActive : {}) }}
              >
                Hours & Tours
              </button>
              <button
                onClick={() => setActiveTab('parking')}
                style={{ ...styles.tabButton, ...(activeTab === 'parking' ? styles.tabButtonActive : {}) }}
              >
                Directions & Parking
              </button>
              <button
                onClick={() => setActiveTab('safety')}
                style={{ ...styles.tabButton, ...(activeTab === 'safety' ? styles.tabButtonActive : {}) }}
              >
                Guidelines
              </button>
            </div>

            {/* Tab Contents */}
            <div style={styles.tabContentCard} className="nature-glass-card nature-animate-fade-in">
              <AnimatePresence mode="wait">
                {activeTab === 'hours' && (
                  <motion.div
                    key="hours"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 style={styles.tabTitle}>Opening Hours</h3>
                    <div style={styles.infoRow}>
                      <div style={styles.iconCircle}>
                        <Clock size={20} color="var(--nature-forest)" />
                      </div>
                      <div>
                        <p style={styles.infoValue}>Tuesday – Saturday: 9:00 AM – 2:00 PM</p>
                        <p style={styles.infoDesc}>Closed on Sundays, Mondays, and major state holidays.</p>
                      </div>
                    </div>

                    <div style={styles.divider} />

                    <h3 style={styles.tabTitle}>Guided Tour Schedule</h3>
                    <p style={styles.bodyText}>
                      We highly recommend taking one of our daily guided tours led by resident docents to truly experience the depth of the stories:
                    </p>
                    <div style={styles.tourBox}>
                      <p>✨ <strong>Morning Tour:</strong> 10:00 AM daily</p>
                      <p>✨ <strong>Midday Tour:</strong> 12:00 PM daily</p>
                    </div>
                    <p style={styles.infoDesc}>
                      *Walk-ins are accommodated based on availability. To guarantee your spot, please book tickets online in advance.
                    </p>
                  </motion.div>
                )}

                {activeTab === 'parking' && (
                  <motion.div
                    key="parking"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 style={styles.tabTitle}>Directions to the Village</h3>
                    <div style={styles.infoRow}>
                      <div style={styles.iconCircle}>
                        <MapPin size={20} color="var(--nature-forest)" />
                      </div>
                      <div>
                        <p style={styles.infoValue}>94-695 Waipahu Street, Waipahu, HI 96797</p>
                        <p style={styles.infoDesc}>
                          Located approximately 30 minutes from Waikīkī and Honolulu. Take H1 West to Exit 8B (Farrington Hwy), then turn right onto Waipahu Depo Road and right onto Waipahu Street.
                        </p>
                      </div>
                    </div>

                    <div style={styles.divider} />

                    <h3 style={styles.tabTitle}>Parking Information</h3>
                    <div style={styles.infoRow}>
                      <div style={styles.iconCircle}>
                        <ParkingCircle size={20} color="var(--nature-forest)" />
                      </div>
                      <div>
                        <p style={styles.infoValue}>Free Visitor Parking</p>
                        <p style={styles.infoDesc}>
                          Free vehicle parking is located directly in front of the main museum entrance gate. Overflow parking is available inside the lower garden lot on busy days.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'safety' && (
                  <motion.div
                    key="safety"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 style={styles.tabTitle}>Site Accessibility</h3>
                    <div style={styles.infoRow}>
                      <div style={styles.iconCircle}>
                        <Footprints size={20} color="var(--nature-forest)" />
                      </div>
                      <div>
                        <p style={styles.infoValue}>Historic Preservation Terrain</p>
                        <p style={styles.infoDesc}>
                          As a heritage site, the path contains gravel walkways, grassy lawns, and historical buildings with wooden steps. Ramps are equipped on major camp cottages. Accessible restrooms are located in the main office pavilion.
                        </p>
                      </div>
                    </div>

                    <div style={styles.divider} />

                    <h3 style={styles.tabTitle}>Guidelines & Safety</h3>
                    <div style={styles.infoRow}>
                      <div style={styles.iconCircle}>
                        <ShieldAlert size={20} color="var(--nature-forest)" />
                      </div>
                      <div>
                        <p style={styles.infoValue}>Protecting Our Legacy</p>
                        <p style={styles.infoDesc}>
                          Please do not touch fragile indoor objects or move artifacts inside the camp cottages. Children must be supervised. Smoking, vaping, and pets are strictly prohibited inside the historical perimeter.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Admission CTA & Sidebar */}
          <div style={styles.rightCol}>
            <div style={styles.ctaCard} className="nature-glass-card">
              <span style={styles.cardBadge}>ADMISSION TICKETS</span>
              <h3 style={styles.ctaTitle}>Secure Your Spot</h3>
              <p style={styles.ctaText}>
                Guarantee your guided tour slot and speed up your arrival check-in by booking tickets online.
              </p>
              
              <div style={styles.priceList}>
                <div style={styles.priceItem}>
                  <span>Adults</span>
                  <strong>$17.00</strong>
                </div>
                <div style={styles.priceItem}>
                  <span>Kamaʻāina / Military</span>
                  <strong>$12.00</strong>
                </div>
                <div style={styles.priceItem}>
                  <span>Children (5–12)</span>
                  <strong>$8.00</strong>
                </div>
                <div style={styles.priceItem}>
                  <span>Children Under 5</span>
                  <strong>Free</strong>
                </div>
              </div>

              <button
                className="nature-btn-accent"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setActivePage('tickets')}
              >
                <Ticket size={18} /> Book Tickets Online
              </button>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div style={styles.faqSection}>
          <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
          <div style={styles.faqContainer}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    ...styles.faqItem,
                    borderColor: isOpen ? 'var(--nature-moss)' : 'rgba(71, 118, 82, 0.15)'
                  }}
                  className="nature-glass-card"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={styles.faqQuestionBtn}
                  >
                    <span>{faq.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={18} color="var(--nature-forest)" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={styles.faqAnswerOverflow}
                      >
                        <div style={styles.faqAnswerContent}>
                          <p style={styles.faqAnswerText}>{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: 'var(--nature-sand)',
    minHeight: '100vh',
    paddingBottom: '5rem',
    fontFamily: 'var(--font-nature-body)'
  },
  headerBlock: {
    background: 'linear-gradient(180deg, var(--nature-forest) 0%, #164228 100%)',
    color: 'var(--nature-mist)',
    padding: '5rem 0 4rem 0',
    textAlign: 'center',
    marginBottom: '3rem'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  headerBadge: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--nature-emerald)',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem'
  },
  pageTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '2.75rem',
    fontWeight: '700',
    marginBottom: '1rem',
    letterSpacing: '-0.02em'
  },
  pageSubtitle: {
    fontSize: '1.05rem',
    color: '#cbd5e1',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1.8fr 1fr',
    gap: '2.5rem',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr'
    }
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  tabsHeader: {
    display: 'flex',
    padding: '6px',
    gap: '4px',
    overflowX: 'auto',
    borderRadius: '16px'
  },
  tabButton: {
    flex: 1,
    minWidth: '100px',
    padding: '0.75rem 1rem',
    border: 'none',
    background: 'none',
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#6b7280',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap'
  },
  tabButtonActive: {
    backgroundColor: 'var(--nature-forest)',
    color: 'var(--nature-mist)',
    boxShadow: '0 4px 10px rgba(11, 36, 22, 0.15)'
  },
  tabContentCard: {
    padding: '2.5rem',
    boxShadow: 'none'
  },
  tabTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.35rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '1.5rem'
  },
  infoRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  },
  iconCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(71, 118, 82, 0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  infoValue: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: 'var(--nature-forest)',
    marginBottom: '4px'
  },
  infoDesc: {
    fontSize: '0.85rem',
    color: '#4b5563',
    lineHeight: '1.5'
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(71, 118, 82, 0.12)',
    margin: '2rem 0'
  },
  bodyText: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#4b5563',
    marginBottom: '1.5rem'
  },
  tourBox: {
    backgroundColor: 'rgba(71, 118, 82, 0.05)',
    borderLeft: '4px solid var(--nature-moss)',
    padding: '1.25rem',
    borderRadius: '0 16px 16px 0',
    marginBottom: '1.5rem',
    lineHeight: '1.8',
    color: 'var(--nature-forest)',
    fontSize: '0.95rem'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  ctaCard: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    boxShadow: 'none'
  },
  cardBadge: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: 'var(--nature-earth)',
    letterSpacing: '0.1em',
    marginBottom: '0.75rem'
  },
  ctaTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.4rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '0.75rem'
  },
  ctaText: {
    fontSize: '0.85rem',
    lineHeight: '1.5',
    color: '#4b5563',
    marginBottom: '1.5rem'
  },
  priceList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '2rem'
  },
  priceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    borderBottom: '1px solid rgba(71, 118, 82, 0.08)',
    paddingBottom: '8px',
    color: '#374151'
  },
  faqSection: {
    marginTop: '4rem'
  },
  faqTitle: {
    fontFamily: 'var(--font-nature-display)',
    fontSize: '1.85rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
    marginBottom: '2rem',
    textAlign: 'center'
  },
  faqContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '800px',
    margin: '0 auto'
  },
  faqItem: {
    borderRadius: '16px',
    border: '1px solid rgba(71, 118, 82, 0.12)',
    overflow: 'hidden',
    boxShadow: 'none',
    transition: 'all 0.2s ease'
  },
  faqQuestionBtn: {
    width: '100%',
    padding: '1.25rem 1.5rem',
    border: 'none',
    background: 'none',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    fontFamily: 'var(--font-nature-body)',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--nature-forest)',
  },
  faqAnswerOverflow: {
    overflow: 'hidden'
  },
  faqAnswerContent: {
    padding: '0 1.5rem 1.5rem 1.5rem'
  },
  faqAnswerText: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#4b5563',
  }
};
