import React, { useState } from 'react';
import { Clock, MapPin, Ticket, ParkingCircle, Footprints, ShieldAlert, ArrowRight } from 'lucide-react';

export default function Visit({ setActivePage }) {
  const [activeTab, setActiveTab] = useState('hours');

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
    <div style={styles.pageContainer}>
      {/* Header */}
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span className="ink-stamp green" style={{ marginBottom: '0.5rem' }}>VISITOR GUIDE</span>
          <h1 style={styles.pageTitle}>Plan Your Visit</h1>
          <p style={styles.pageSubtitle}>Everything you need to know to prepare for your journey into Waipahu’s history.</p>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.contentGrid}>
          {/* Main info tabs */}
          <div style={styles.leftCol}>
            {/* Tabs Navigation */}
            <div style={styles.tabsHeader}>
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
                Accessibility & Guidelines
              </button>
            </div>

            {/* Tab: Hours & Tours */}
            {activeTab === 'hours' && (
              <div className="paper-card animate-fade-in" style={styles.tabContentCard}>
                <h3 style={styles.tabTitle}>Opening Hours</h3>
                <div style={styles.infoRow}>
                  <Clock size={20} color="var(--cane-green)" />
                  <div>
                    <p style={styles.infoValue}>Tuesday – Saturday: 9:00 AM – 2:00 PM</p>
                    <p style={styles.infoDesc}>Closed on Sundays, Mondays, and major state holidays.</p>
                  </div>
                </div>

                <div style={styles.ledgerDivider} className="ledger-divider" />

                <h3 style={styles.tabTitle}>Guided Tour Schedule</h3>
                <p style={styles.bodyText}>
                  To experience the stories fully, we highly recommend taking one of our daily guided tours led by resident docents:
                </p>
                <ul style={styles.tourList}>
                  <li><strong>Morning Tour:</strong> 10:00 AM daily</li>
                  <li><strong>Midday Tour:</strong> 12:00 PM daily</li>
                </ul>
                <p style={styles.infoDesc}>
                  *Walk-ins are accommodated based on availability. To guarantee your spot, please book tickets online in advance.
                </p>
              </div>
            )}

            {/* Tab: Directions & Parking */}
            {activeTab === 'parking' && (
              <div className="paper-card animate-fade-in" style={styles.tabContentCard}>
                <h3 style={styles.tabTitle}>Directions to the Village</h3>
                <div style={styles.infoRow}>
                  <MapPin size={20} color="var(--cane-green)" />
                  <div>
                    <p style={styles.infoValue}>94-695 Waipahu Street, Waipahu, HI 96797</p>
                    <p style={styles.infoDesc}>
                      Located approximately 30 minutes from Waikīkī and Honolulu. Take H1 West to Exit 8B (Farrington Hwy), then turn right onto Waipahu Depo Road and right onto Waipahu Street.
                    </p>
                  </div>
                </div>

                <div style={styles.ledgerDivider} className="ledger-divider" />

                <h3 style={styles.tabTitle}>Parking Information</h3>
                <div style={styles.infoRow}>
                  <ParkingCircle size={20} color="var(--cane-green)" />
                  <div>
                    <p style={styles.infoValue}>Free Visitor Parking Onsite</p>
                    <p style={styles.infoDesc}>
                      We offer free designated parking for passenger cars, school buses, and tour vans inside our secure lot.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Accessibility & Safety */}
            {activeTab === 'safety' && (
              <div className="paper-card animate-fade-in" style={styles.tabContentCard}>
                <h3 style={styles.tabTitle}>Accessibility Support</h3>
                <div style={styles.infoRow}>
                  <Footprints size={20} color="var(--cane-green)" />
                  <div>
                    <p style={styles.infoValue}>Terrain & Navigation</p>
                    <p style={styles.infoDesc}>
                      The Village path is a dirt/gravel trail approximately 0.5 miles long. Comfortable walking shoes are highly recommended. Restrooms are fully ADA-compliant and located in the main visitor courtyard.
                    </p>
                  </div>
                </div>

                <div style={styles.ledgerDivider} className="ledger-divider" />

                <h3 style={styles.tabTitle}>Visitor Guidelines</h3>
                <div style={styles.infoRow}>
                  <ShieldAlert size={20} color="var(--cane-green)" />
                  <div>
                    <p style={styles.infoValue}>Preserving Cultural Heritage</p>
                    <p style={styles.infoDesc}>
                      Please do not climb on historical structures or touch displays marked with preservation tags. Hawaiian Plantation Village is a smoke-free facility.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* FAQs */}
            <div style={styles.faqSection}>
              <h3 style={styles.faqHeaderTitle}>Frequently Asked Questions</h3>
              <div style={styles.faqList}>
                {faqs.map((faq, idx) => (
                  <div key={idx} style={styles.faqItem}>
                    <h4 style={styles.faqQuestion}>Q: {faq.q}</h4>
                    <p style={styles.faqAnswer}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar: Ticket CTA block */}
          <div style={styles.rightCol}>
            <div className="paper-card" style={styles.ctaCard}>
              <div style={styles.priceHeader}>
                <Ticket size={24} color="var(--sugar-gold)" />
                <h3 style={styles.ctaCardTitle}>Admission Tickets</h3>
              </div>
              <p style={styles.ctaCardText}>
                Secure your tickets online to guarantee your guided tour slot and skip the check-in queue at the visitor center desk.
              </p>
              
              <div style={styles.priceList}>
                <div style={styles.priceItem}>
                  <span>Adults (13+)</span>
                  <strong>$17.00</strong>
                </div>
                <div style={styles.priceItem}>
                  <span>Kamaʻāina / Military (with ID)</span>
                  <strong>$12.00</strong>
                </div>
                <div style={styles.priceItem}>
                  <span>Seniors (62+)</span>
                  <strong>$12.00</strong>
                </div>
                <div style={styles.priceItem}>
                  <span>Youth (5 - 12)</span>
                  <strong>$8.00</strong>
                </div>
                <div style={styles.priceItem}>
                  <span>Child (Under 5)</span>
                  <strong>Free</strong>
                </div>
              </div>

              <button className="btn-primary" onClick={() => setActivePage('tickets')} style={styles.bookBtn}>
                Book Tickets Online <ArrowRight size={16} />
              </button>
            </div>

            {/* School tours CTA */}
            <div className="paper-card" style={{ ...styles.ctaCard, marginTop: '1.5rem', backgroundColor: '#fffcf7' }}>
              <h4 style={styles.schoolTitle}>Bringing a School Group?</h4>
              <p style={styles.schoolText}>
                We host educational class visits Tuesday through Friday. Learn about specialized curriculum programs and discounted school group pricing.
              </p>
              <button className="btn-secondary" onClick={() => setActivePage('learn')} style={styles.schoolBtn}>
                School Field Trips
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
    paddingBottom: '5rem'
  },
  headerBlock: {
    backgroundColor: 'var(--paper-dark)',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    padding: '3.5rem 0',
    marginBottom: '3rem'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  pageTitle: {
    fontSize: '2.8rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '0.5rem'
  },
  pageSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.15rem',
    color: 'var(--text-muted)',
    maxWidth: '700px'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1.6fr 1fr',
    gap: '3rem',
    '@media (max-width: 800px)': {
      gridTemplateColumns: '1fr',
      gap: '2.5rem'
    }
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  tabsHeader: {
    display: 'flex',
    borderBottom: '2px solid var(--kraft-tan-dark)',
    gap: '12px',
    marginBottom: '1.5rem',
    overflowX: 'auto'
  },
  tabButton: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.9rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '0.75rem 1rem',
    borderBottom: '3px solid transparent',
    whiteSpace: 'nowrap'
  },
  tabButtonActive: {
    color: 'var(--cane-green)',
    borderBottom: '3px solid var(--cane-green)'
  },
  tabContentCard: {
    padding: '2rem',
    borderRadius: '4px'
  },
  tabTitle: {
    fontSize: '1.4rem',
    color: 'var(--koa-wood)',
    marginBottom: '1rem'
  },
  infoRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginTop: '0.5rem'
  },
  infoValue: {
    fontSize: '1.05rem',
    fontWeight: 'bold',
    color: 'var(--text-dark)',
    marginBottom: '2px'
  },
  infoDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5'
  },
  tourList: {
    listStyleType: 'circle',
    paddingLeft: '1.5rem',
    marginBottom: '1rem',
    fontSize: '0.95rem'
  },
  bodyText: {
    fontSize: '0.95rem',
    marginBottom: '1rem'
  },
  faqSection: {
    marginTop: '3.5rem'
  },
  faqHeaderTitle: {
    fontSize: '1.75rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '1.5rem',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    paddingBottom: '0.5rem'
  },
  faqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  faqItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  faqQuestion: {
    fontSize: '1.05rem',
    color: 'var(--koa-wood)',
    fontWeight: '700'
  },
  faqAnswer: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  ctaCard: {
    padding: '2rem',
    borderRadius: '4px'
  },
  priceHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '1rem'
  },
  ctaCardTitle: {
    fontSize: '1.4rem',
    color: 'var(--koa-wood)'
  },
  ctaCardText: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    marginBottom: '1.5rem',
    lineHeight: '1.5'
  },
  priceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '2rem'
  },
  priceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.95rem',
    borderBottom: '1px dotted var(--kraft-tan-dark)',
    paddingBottom: '6px',
    color: 'var(--text-dark)'
  },
  bookBtn: {
    width: '100%',
    justifyContent: 'center'
  },
  schoolTitle: {
    fontSize: '1.25rem',
    color: 'var(--koa-wood)',
    marginBottom: '0.5rem'
  },
  schoolText: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '1.25rem'
  },
  schoolBtn: {
    width: '100%',
    justifyContent: 'center'
  }
};
