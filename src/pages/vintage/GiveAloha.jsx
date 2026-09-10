import React, { useState } from 'react';
import { 
  Heart, 
  Copy, 
  Check, 
  ExternalLink, 
  Store, 
  Receipt, 
  CreditCard, 
  Calendar, 
  Gift, 
  Sparkles, 
  ZoomIn, 
  X, 
  Download, 
  Info, 
  ChevronDown, 
  ArrowLeft 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import SEO from '../../components/SEO.jsx';
import posterImg from '../../assets/give-aloha/give-aloha-poster.jpg';
import walkthroughImg from '../../assets/give-aloha/give-aloha-walkthrough.png';

const ORG_CODE = '79102';
const FOODLAND_URL = 'https://foodland.com/give-aloha/';

export default function GiveAloha() {
  const [copied, setCopied] = useState(false);
  const [activeModalImg, setActiveModalImg] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('guide'); // 'guide' | 'flyer'

  const handleCopyCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ORG_CODE).then(() => {
      setCopied(true);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#d98e04', '#b5502e', '#3f5c4c', '#faf6ec']
        });
      } catch {
        // canvas-confetti fallback
      }
      setTimeout(() => setCopied(false), 2800);
    });
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is Foodland's Give Aloha program?",
      a: "Give Aloha is Foodland's Annual Community Matching Gifts Program. Each September, Foodland and the Western Union Foundation partner with customers to support local non-profit organizations across Hawaiʻi, matching a portion of every customer donation."
    },
    {
      q: "Do I need a Maikaʻi Member card/number?",
      a: "Yes. To have your donation credited and matched, simply enter your Maikaʻi phone number on the pinpad or scan your card at the checkout register before paying."
    },
    {
      q: "How much can I donate?",
      a: "You may donate any amount up to $249 per organization per Maikaʻi member. Donations can be paid with cash, card, or Foodland gift card."
    },
    {
      q: "Can I donate at any Foodland location?",
      a: "Yes! Donations are accepted at checkout counters at all Foodland, Sack N Save, and Foodland Farms stores statewide across Oʻahu, Maui, Kauaʻi, and Hawaiʻi Island."
    },
    {
      q: "When does the program run?",
      a: "Give Aloha runs throughout the entire month of September, now through September 30."
    }
  ];

  return (
    <div style={styles.pageWrap}>
      <SEO
        title="Give Aloha 2026 - Support Hawaii's Plantation Village"
        description="Support Hawaii's Plantation Village at Foodland checkout with Give Aloha organization code 79102. Foodland matches a portion of your gift through September 30."
        image={posterImg}
      />

      {/* Top Banner Notice */}
      <section style={styles.topBar}>
        <div className="editorial-shell" style={styles.topBarInner}>
          <div style={styles.topBarText}>
            <Sparkles size={16} color="var(--heritage-gold)" />
            <span><strong>Foodland Give Aloha Month:</strong> Now through September 30 • Code <strong>{ORG_CODE}</strong></span>
          </div>
          <a 
            href={FOODLAND_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={styles.topBarLink}
          >
            foodland.com/give-aloha <ExternalLink size={13} style={{ marginLeft: 4 }} />
          </a>
        </div>
      </section>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div className="editorial-shell" style={styles.heroGrid}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4 }}
            style={styles.heroContent}
          >
            <div style={styles.heroBadgeRow}>
              <span className="ink-stamp rust">Annual Community Matching Program</span>
              <span style={styles.datePill}>
                <Calendar size={14} /> Through September 30
              </span>
            </div>

            <h1 style={styles.heroTitle}>
              Support Hawaii’s Plantation Village Through <span style={styles.titleHighlight}>Give Aloha!</span>
            </h1>

            <p style={styles.heroLead}>
              Shop at any <strong>Foodland</strong>, <strong>Sack N Save</strong>, or <strong>Foodland Farms</strong> and make a donation to Hawaii’s Plantation Village at checkout. <strong>Foodland will match a portion of your gift!</strong>
            </p>

            {/* Quick Code Copy Card */}
            <div style={styles.codeCard}>
              <div style={styles.codeCardLeft}>
                <span style={styles.codeLabel}>HPV ORGANIZATION CODE</span>
                <div style={styles.codeRow}>
                  <span style={styles.codeDigits}>{ORG_CODE}</span>
                  <span style={styles.codeOrgName}>Friends of Waipahu Cultural Garden Park</span>
                </div>
              </div>
              <button 
                onClick={handleCopyCode} 
                style={copied ? styles.copyBtnSuccess : styles.copyBtn}
                title="Copy organization code"
                aria-label="Copy organization code 79102"
              >
                {copied ? (
                  <>
                    <Check size={18} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} /> Copy Code
                  </>
                )}
              </button>
            </div>

            <div style={styles.heroActions}>
              <a 
                href="#how-to-donate" 
                className="btn-accent" 
                style={styles.primaryActionBtn}
              >
                <Heart size={16} fill="currentColor" /> How to Donate at Checkout
              </a>
              <a 
                href={FOODLAND_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary" 
                style={styles.foodlandActionBtn}
              >
                Foodland Give Aloha Info <ExternalLink size={15} />
              </a>
            </div>

            <p style={styles.codeHelpText}>
              💡 <em>Keep this page open on your phone or tap <strong>Copy Code</strong> so you have #79102 ready at the cash register!</em>
            </p>
          </motion.div>

          {/* Hero Poster Preview Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.45, delay: 0.1 }}
            style={styles.heroPosterContainer}
          >
            <div style={styles.posterFrame}>
              <div style={styles.posterHeader}>
                <span style={styles.posterBadge}>Official Campaign Poster</span>
                <button 
                  onClick={() => setActiveModalImg(posterImg)} 
                  style={styles.zoomButton}
                  aria-label="Zoom in poster"
                >
                  <ZoomIn size={15} /> Enlarge
                </button>
              </div>
              <div 
                style={styles.posterImgWrap} 
                onClick={() => setActiveModalImg(posterImg)}
                title="Click to view full poster"
              >
                <img 
                  src={posterImg} 
                  alt="Foodland Give Aloha - Shop at Foodland and make a donation to Hawaii's Plantation Village 79102" 
                  style={styles.posterImg} 
                />
                <div style={styles.posterOverlay}>
                  <ZoomIn size={28} color="#fff" />
                  <span style={styles.posterOverlayText}>Click to Enlarge</span>
                </div>
              </div>
              <div style={styles.posterFooter}>
                <div style={styles.posterFooterItem}>
                  <strong>Beneficiary:</strong> Hawaii’s Plantation Village
                </div>
                <div style={styles.posterFooterItem}>
                  <strong>Code:</strong> <span style={{ color: 'var(--terracotta-clay)', fontWeight: 700 }}>{ORG_CODE}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Highlights Banner */}
      <section style={styles.highlightsStrip}>
        <div className="editorial-shell" style={styles.highlightsGrid}>
          <div style={styles.highlightItem}>
            <div style={styles.highlightIconWrap}>
              <Store size={22} color="var(--terracotta-clay)" />
            </div>
            <div>
              <h3 style={styles.highlightTitle}>Any Store Statewide</h3>
              <p style={styles.highlightDesc}>Foodland, Sack N Save, or Foodland Farms store checkouts.</p>
            </div>
          </div>

          <div style={styles.highlightItem}>
            <div style={styles.highlightIconWrap}>
              <Gift size={22} color="var(--heritage-gold)" />
            </div>
            <div>
              <h3 style={styles.highlightTitle}>Foodland Gift Matching</h3>
              <p style={styles.highlightDesc}>Foodland & Western Union match a portion of every dollar given.</p>
            </div>
          </div>

          <div style={styles.highlightItem}>
            <div style={styles.highlightIconWrap}>
              <CreditCard size={22} color="var(--ocean-teal)" />
            </div>
            <div>
              <h3 style={styles.highlightTitle}>Up to $249 Matched</h3>
              <p style={styles.highlightDesc}>Donate any amount up to $249 per Maikaʻi member.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Walkthrough Section */}
      <section id="how-to-donate" style={styles.walkthroughSection}>
        <div className="editorial-shell">
          <div style={styles.sectionHeader}>
            <p className="ink-stamp green">Step-by-Step Checkout Guide</p>
            <h2 style={styles.sectionTitle}>How to Donate at Checkout</h2>
            <p style={styles.sectionSubtitle}>
              Follow these simple steps when paying for your groceries at any Foodland, Sack N Save, or Foodland Farms store during September.
            </p>
          </div>

          {/* Tab Switcher: Interactive Guide vs Original Sheet */}
          <div style={styles.tabBar}>
            <button
              onClick={() => setActiveTab('guide')}
              style={{
                ...styles.tabBtn,
                ...(activeTab === 'guide' ? styles.tabBtnActive : {})
              }}
            >
              Interactive Steps
            </button>
            <button
              onClick={() => setActiveTab('flyer')}
              style={{
                ...styles.tabBtn,
                ...(activeTab === 'flyer' ? styles.tabBtnActive : {})
              }}
            >
              Original Cashier Sheet
            </button>
          </div>

          {activeTab === 'guide' ? (
            <div style={styles.stepsContainer}>
              {/* Step 1 */}
              <div style={styles.stepCard}>
                <div style={styles.stepNumberBadge}>1</div>
                <div style={styles.stepBody}>
                  <div style={styles.stepHeaderRow}>
                    <CreditCard size={20} color="var(--ocean-teal)" />
                    <h3 style={styles.stepHeading}>Enter your Maikaʻi Member info</h3>
                  </div>
                  <p style={styles.stepText}>
                    At the start of your checkout, type your <strong>Maikaʻi 10-digit phone number</strong> or scan your membership card on the pinpad.
                  </p>
                  <div style={styles.stepTip}>
                    <Info size={16} color="var(--muted-sage)" style={{ flexShrink: 0 }} />
                    <span>Your Maikaʻi number ensures your donation is registered and matched by Foodland.</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div style={styles.stepCardHighlight}>
                <div style={styles.stepNumberBadgeHighlight}>2</div>
                <div style={styles.stepBody}>
                  <div style={styles.stepHeaderRow}>
                    <Heart size={20} color="var(--terracotta-clay)" fill="var(--terracotta-clay)" />
                    <h3 style={styles.stepHeading}>Tell the cashier to donate to #79102</h3>
                  </div>
                  <p style={styles.stepText}>
                    Tell the cashier before you complete payment:
                  </p>

                  <div style={styles.quoteBox}>
                    <p style={styles.quoteText}>
                      “I’d like to make a <strong>$_____</strong> donation to <span style={styles.quoteOrg}>Hawaii’s Plantation Village</span>, code <span style={styles.quoteCode}>#79102</span>.”
                    </p>
                    <button 
                      onClick={handleCopyCode} 
                      style={styles.quoteCopyBtn}
                      title="Copy code 79102"
                    >
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                      {copied ? 'Copied #79102' : 'Copy Code #79102'}
                    </button>
                  </div>

                  <p style={styles.stepFootnote}>
                    * Customers may donate up to $249 per organization. You may pay with cash, debit, credit, or Foodland gift card.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div style={styles.stepCard}>
                <div style={styles.stepNumberBadge}>3</div>
                <div style={styles.stepBody}>
                  <div style={styles.stepHeaderRow}>
                    <Receipt size={20} color="var(--cane-green)" />
                    <h3 style={styles.stepHeading}>Check your receipt</h3>
                  </div>
                  <p style={styles.stepText}>
                    Review your printed receipt before leaving the register to confirm that:
                  </p>
                  <ul style={styles.receiptChecklist}>
                    <li><strong>Hawaii’s Plantation Village</strong> (or code 79102) is shown on the receipt slip.</li>
                    <li>Your desired donation amount was properly charged.</li>
                  </ul>
                  <div style={styles.stepMahalo}>
                    <span>MAHALO NUI LOA FOR YOUR GENEROSITY!</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Original Cashier Sheet View */
            <div style={styles.flyerContainer}>
              <div style={styles.flyerCard}>
                <div style={styles.flyerHeader}>
                  <div>
                    <h3 style={styles.flyerTitle}>Support Hawaii's Plantation Village through GIVE ALOHA!</h3>
                    <p style={styles.flyerSubtitle}>Official Friends of Waipahu Cultural Garden Park Walkthrough Sheet</p>
                  </div>
                  <div style={styles.flyerActions}>
                    <button 
                      onClick={() => setActiveModalImg(walkthroughImg)} 
                      style={styles.flyerActionBtn}
                    >
                      <ZoomIn size={15} /> Enlarge Flyer
                    </button>
                    <a 
                      href={walkthroughImg} 
                      download="Give-Aloha-HPV-Walkthrough.png" 
                      style={styles.flyerActionBtn}
                    >
                      <Download size={15} /> Download
                    </a>
                  </div>
                </div>

                <div 
                  style={styles.flyerImgWrap}
                  onClick={() => setActiveModalImg(walkthroughImg)}
                  title="Click to zoom in"
                >
                  <img 
                    src={walkthroughImg} 
                    alt="Hawaii's Plantation Village Give Aloha Walkthrough document with 3-step checkout instructions" 
                    style={styles.flyerImg}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Redirect / Foodland Info Hub */}
      <section style={styles.foodlandHubSection}>
        <div className="editorial-shell" style={styles.foodlandHubGrid}>
          <div style={styles.foodlandHubContent}>
            <div style={styles.foodlandLogoRow}>
              <span className="ink-stamp rust">Partner Spotlight</span>
              <span style={styles.matchingTag}>Foodland Super Market, Ltd.</span>
            </div>

            <h2 style={styles.foodlandHubTitle}>Foodland’s Give Aloha Program</h2>
            
            <p style={styles.foodlandHubLead}>
              Give Aloha was established in 1999 to honor Foodland founder Maurice J. "Sully" Sullivan and continue his legacy of giving back to the community.
            </p>

            <p style={styles.foodlandHubBody}>
              Each year during September, Foodland and the Western Union Foundation contribute matching funds to help make customer donations go even further. Since the program’s inception, tens of millions of dollars have been directed to Hawaiʻi non-profits.
            </p>

            <div style={styles.redirectBox}>
              <div style={styles.redirectTextGroup}>
                <strong style={styles.redirectCallout}>Looking for full program rules or participating locations?</strong>
                <p style={styles.redirectSubtext}>
                  Visit Foodland’s official Give Aloha portal for complete details, participating stores, and matching gift FAQs.
                </p>
              </div>
              <a 
                href={FOODLAND_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-accent" 
                style={styles.redirectBtn}
              >
                <span>Visit Foodland.com/Give-Aloha</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Quick Recap Card */}
          <div style={styles.recapCard}>
            <h3 style={styles.recapTitle}>Quick Checkout Cheat-Sheet</h3>
            <div style={styles.recapDivider} />

            <div style={styles.recapRow}>
              <span style={styles.recapLabel}>Beneficiary</span>
              <strong style={styles.recapValue}>Hawaii’s Plantation Village</strong>
            </div>

            <div style={styles.recapRow}>
              <span style={styles.recapLabel}>Organization Code</span>
              <div style={styles.recapCodeBadge}>
                <strong>{ORG_CODE}</strong>
                <button 
                  onClick={handleCopyCode} 
                  style={styles.miniCopyBtn} 
                  title="Copy 79102"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>
            </div>

            <div style={styles.recapRow}>
              <span style={styles.recapLabel}>Organization Entity</span>
              <span style={styles.recapValue}>Friends of Waipahu Cultural Garden Park</span>
            </div>

            <div style={styles.recapRow}>
              <span style={styles.recapLabel}>Participating Stores</span>
              <span style={styles.recapValue}>Foodland, Sack N Save, Foodland Farms</span>
            </div>

            <div style={styles.recapRow}>
              <span style={styles.recapLabel}>Program Duration</span>
              <span style={styles.recapValue}>September 1 – September 30</span>
            </div>

            <div style={styles.recapRow}>
              <span style={styles.recapLabel}>Max Donation per Member</span>
              <span style={styles.recapValue}>Up to $249 matched</span>
            </div>

            <div style={styles.recapBtnWrap}>
              <a 
                href={FOODLAND_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.recapExternalLink}
              >
                Official Program Info at foodland.com <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section style={styles.faqSection}>
        <div className="editorial-shell" style={styles.faqInner}>
          <div style={styles.sectionHeader}>
            <p className="ink-stamp teal">Got Questions?</p>
            <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>

          <div style={styles.faqList}>
            {faqs.map((faq, index) => (
              <div key={index} style={styles.faqItem}>
                <button 
                  onClick={() => toggleFaq(index)} 
                  style={styles.faqQuestionBtn}
                  aria-expanded={expandedFaq === index}
                >
                  <span style={styles.faqQuestionText}>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    style={{ 
                      transform: expandedFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0
                    }} 
                  />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={styles.faqAnswerText}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mahalo & Return Home Footer */}
      <section style={styles.footerSection}>
        <div className="editorial-shell" style={styles.footerInner}>
          <h2 style={styles.footerMahalo}>Mahalo Nui Loa!</h2>
          <p style={styles.footerDesc}>
            Your generous contributions protect and share the cultural history, ethnic artifacts, and personal stories of Hawaiʻi’s plantation workers and their descendants.
          </p>

          <div style={styles.footerCtas}>
            <Link to="/" style={styles.returnHomeBtn}>
              <ArrowLeft size={16} /> Return to Main Website
            </Link>
            <a 
              href={FOODLAND_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.footerFoodlandBtn}
            >
              Foodland Give Aloha <ExternalLink size={15} />
            </a>
          </div>

          <p style={styles.footerLegal}>
            Hawaii's Plantation Village • Friends of Waipahu Cultural Garden Park • 94-695 Waipahu Street, Waipahu, HI 96797 • A registered 501(c)(3) non-profit organization.
          </p>
        </div>
      </section>

      {/* Lightbox Modal for Enlarge Image */}
      <AnimatePresence>
        {activeModalImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={styles.modalBackdrop}
            onClick={() => setActiveModalImg(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              style={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveModalImg(null)} 
                style={styles.modalCloseBtn}
                aria-label="Close enlarged preview"
              >
                <X size={20} />
              </button>
              <img 
                src={activeModalImg} 
                alt="Enlarged Give Aloha campaign graphic" 
                style={styles.modalImg} 
              />
              <div style={styles.modalCaption}>
                <span>Hawaii’s Plantation Village • Give Aloha Code <strong>{ORG_CODE}</strong></span>
                <a 
                  href={activeModalImg} 
                  download="give-aloha-hpv.jpg" 
                  style={styles.modalDownloadLink}
                >
                  <Download size={15} /> Download Image
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  pageWrap: {
    backgroundColor: 'var(--paper-light)',
    color: 'var(--text-dark)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    backgroundColor: 'var(--plantation-ink)',
    color: 'var(--sugarcane-cream)',
    padding: '0.6rem 0',
    fontSize: '0.85rem',
    borderBottom: '1px solid var(--hairline)',
  },
  topBarInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  topBarText: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  topBarLink: {
    color: 'var(--heritage-gold)',
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: 500,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },
  heroSection: {
    padding: 'clamp(2.5rem, 5vw, 4.5rem) 0',
    background: 'linear-gradient(180deg, rgba(250,246,236,1) 0%, rgba(240,233,216,0.6) 100%)',
    borderBottom: '1px solid var(--hairline)',
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
    gap: 'clamp(2rem, 5vw, 4rem)',
    alignItems: 'center',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  heroBadgeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  datePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
    color: 'var(--terracotta-clay-deep)',
    backgroundColor: 'rgba(181, 80, 46, 0.08)',
    padding: '4px 10px',
    borderRadius: 'var(--border-radius-sm)',
    border: '1px solid rgba(181, 80, 46, 0.25)',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
    lineHeight: 1.15,
    margin: 0,
    fontWeight: 600,
  },
  titleHighlight: {
    color: 'var(--terracotta-clay)',
  },
  heroLead: {
    fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
    lineHeight: 1.6,
    color: 'var(--plantation-ink-soft)',
    margin: 0,
  },
  codeCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '2px solid var(--heritage-gold)',
    borderRadius: 'var(--border-radius-md)',
    padding: '1.1rem 1.4rem',
    boxShadow: '0 4px 16px rgba(217, 142, 4, 0.12)',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  codeCardLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  codeLabel: {
    fontSize: '0.72rem',
    letterSpacing: '0.14em',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: 'var(--muted-sage)',
  },
  codeRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
    flexWrap: 'wrap',
  },
  codeDigits: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.4rem',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '0.04em',
    color: 'var(--plantation-ink)',
  },
  codeOrgName: {
    fontSize: '0.82rem',
    color: 'var(--muted-sage)',
    fontStyle: 'italic',
  },
  copyBtn: {
    backgroundColor: 'var(--heritage-gold)',
    color: 'var(--plantation-ink)',
    border: 'none',
    borderRadius: 'var(--border-radius-sm)',
    padding: '0.65rem 1.1rem',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.18s ease',
  },
  copyBtnSuccess: {
    backgroundColor: 'var(--ocean-teal)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--border-radius-sm)',
    padding: '0.65rem 1.1rem',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.18s ease',
  },
  heroActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    marginTop: '0.5rem',
  },
  primaryActionBtn: {
    padding: '0.85rem 1.5rem',
    fontSize: '1rem',
  },
  foodlandActionBtn: {
    padding: '0.85rem 1.3rem',
    fontSize: '0.95rem',
  },
  codeHelpText: {
    fontSize: '0.84rem',
    color: 'var(--muted-sage)',
    margin: 0,
  },
  heroPosterContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  posterFrame: {
    backgroundColor: '#fff',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--border-radius-md)',
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '430px',
  },
  posterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1.1rem',
    backgroundColor: 'var(--sugarcane-cream)',
    borderBottom: '1px solid var(--hairline)',
  },
  posterBadge: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--plantation-ink)',
  },
  zoomButton: {
    background: 'none',
    border: 'none',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--terracotta-clay)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  posterImgWrap: {
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: '#f8f5ee',
    lineHeight: 0,
  },
  posterImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
    objectFit: 'contain',
  },
  posterOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(28, 43, 34, 0.45)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    opacity: 0,
    transition: 'opacity 0.2s ease',
  },
  posterOverlayText: {
    color: '#fff',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
  },
  posterFooter: {
    padding: '0.8rem 1.1rem',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.82rem',
    color: 'var(--plantation-ink)',
    borderTop: '1px solid var(--hairline)',
    backgroundColor: '#fff',
  },
  posterFooterItem: {
    display: 'flex',
    gap: '5px',
  },
  highlightsStrip: {
    backgroundColor: 'var(--sand)',
    borderBottom: '1px solid var(--hairline)',
    padding: '1.8rem 0',
  },
  highlightsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  highlightItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  highlightIconWrap: {
    backgroundColor: '#fff',
    border: '1px solid var(--hairline)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  highlightTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    margin: '0 0 2px',
  },
  highlightDesc: {
    fontSize: '0.85rem',
    color: 'var(--muted-sage)',
    margin: 0,
    lineHeight: 1.4,
  },
  walkthroughSection: {
    padding: 'clamp(3rem, 6vw, 5rem) 0',
    borderBottom: '1px solid var(--hairline)',
  },
  sectionHeader: {
    textAlign: 'center',
    maxWidth: '680px',
    margin: '0 auto 2.5rem',
  },
  sectionTitle: {
    fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
    marginTop: '0.8rem',
    marginBottom: '0.6rem',
  },
  sectionSubtitle: {
    fontSize: '1.05rem',
    color: 'var(--muted-sage)',
    lineHeight: 1.5,
    margin: 0,
  },
  tabBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '2.5rem',
  },
  tabBtn: {
    padding: '0.6rem 1.4rem',
    borderRadius: 'var(--border-radius-sm)',
    border: '1px solid var(--hairline-strong)',
    backgroundColor: 'transparent',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--plantation-ink)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  tabBtnActive: {
    backgroundColor: 'var(--plantation-ink)',
    color: 'var(--sugarcane-cream)',
    borderColor: 'var(--plantation-ink)',
  },
  stepsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    maxWidth: '820px',
    margin: '0 auto',
  },
  stepCard: {
    display: 'flex',
    gap: '1.5rem',
    backgroundColor: '#fff',
    border: '1px solid var(--hairline)',
    borderRadius: 'var(--border-radius-md)',
    padding: 'clamp(1.2rem, 3vw, 1.8rem)',
    boxShadow: 'var(--shadow-md)',
  },
  stepCardHighlight: {
    display: 'flex',
    gap: '1.5rem',
    backgroundColor: '#fff',
    border: '2px solid var(--terracotta-clay)',
    borderRadius: 'var(--border-radius-md)',
    padding: 'clamp(1.2rem, 3vw, 1.8rem)',
    boxShadow: '0 6px 20px rgba(181, 80, 46, 0.1)',
  },
  stepNumberBadge: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: 'var(--sugarcane-cream)',
    border: '2px solid var(--plantation-ink)',
    color: 'var(--plantation-ink)',
    fontSize: '1.2rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepNumberBadgeHighlight: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: 'var(--terracotta-clay)',
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  stepHeaderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  stepHeading: {
    fontSize: '1.2rem',
    fontWeight: 600,
    margin: 0,
  },
  stepText: {
    fontSize: '0.98rem',
    lineHeight: 1.55,
    margin: 0,
  },
  stepTip: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    backgroundColor: 'var(--sand)',
    padding: '0.6rem 0.9rem',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: '0.85rem',
    color: 'var(--muted-sage)',
    marginTop: '0.4rem',
  },
  quoteBox: {
    backgroundColor: 'var(--sugarcane-cream)',
    borderLeft: '4px solid var(--terracotta-clay)',
    padding: '1rem 1.2rem',
    borderRadius: '0 var(--border-radius-sm) var(--border-radius-sm) 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    margin: '0.4rem 0',
  },
  quoteText: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.15rem',
    lineHeight: 1.45,
    color: 'var(--plantation-ink)',
    margin: 0,
    fontStyle: 'italic',
  },
  quoteOrg: {
    color: 'var(--ocean-teal)',
    fontWeight: 600,
  },
  quoteCode: {
    color: 'var(--terracotta-clay)',
    fontWeight: 700,
    fontFamily: 'var(--font-sans)',
  },
  quoteCopyBtn: {
    backgroundColor: '#fff',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--border-radius-sm)',
    padding: '0.45rem 0.85rem',
    fontSize: '0.82rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    color: 'var(--plantation-ink)',
  },
  stepFootnote: {
    fontSize: '0.82rem',
    color: 'var(--muted-sage)',
    fontStyle: 'italic',
    margin: 0,
  },
  receiptChecklist: {
    margin: '0.2rem 0 0.5rem 1.2rem',
    fontSize: '0.94rem',
    lineHeight: 1.6,
  },
  stepMahalo: {
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: 'var(--ocean-teal)',
    marginTop: '0.4rem',
  },
  flyerContainer: {
    maxWidth: '680px',
    margin: '0 auto',
  },
  flyerCard: {
    backgroundColor: '#fff',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--border-radius-md)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
  },
  flyerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.2rem 1.5rem',
    backgroundColor: 'var(--sugarcane-cream)',
    borderBottom: '1px solid var(--hairline)',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  flyerTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    margin: '0 0 2px',
  },
  flyerSubtitle: {
    fontSize: '0.82rem',
    color: 'var(--muted-sage)',
    margin: 0,
  },
  flyerActions: {
    display: 'flex',
    gap: '8px',
  },
  flyerActionBtn: {
    backgroundColor: '#fff',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--border-radius-sm)',
    padding: '0.5rem 0.9rem',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--plantation-ink)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    textDecoration: 'none',
  },
  flyerImgWrap: {
    cursor: 'pointer',
    backgroundColor: '#faf6ec',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
  },
  flyerImg: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 'var(--border-radius-sm)',
    border: '1px solid var(--hairline)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  },
  foodlandHubSection: {
    padding: 'clamp(3rem, 6vw, 5rem) 0',
    backgroundColor: 'var(--sand)',
    borderBottom: '1px solid var(--hairline)',
  },
  foodlandHubGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
    gap: 'clamp(2rem, 5vw, 3.5rem)',
    alignItems: 'center',
  },
  foodlandHubContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.1rem',
  },
  foodlandLogoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  matchingTag: {
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--muted-sage)',
  },
  foodlandHubTitle: {
    fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
    margin: 0,
  },
  foodlandHubLead: {
    fontSize: '1.05rem',
    lineHeight: 1.6,
    color: 'var(--plantation-ink)',
    margin: 0,
  },
  foodlandHubBody: {
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: 'var(--muted-sage)',
    margin: 0,
  },
  redirectBox: {
    backgroundColor: '#fff',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--border-radius-md)',
    padding: '1.4rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    boxShadow: 'var(--shadow-md)',
  },
  redirectTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  redirectCallout: {
    fontSize: '0.98rem',
    color: 'var(--plantation-ink)',
  },
  redirectSubtext: {
    fontSize: '0.85rem',
    color: 'var(--muted-sage)',
    margin: 0,
    lineHeight: 1.4,
  },
  redirectBtn: {
    alignSelf: 'flex-start',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0.75rem 1.4rem',
  },
  recapCard: {
    backgroundColor: '#fff',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 'var(--border-radius-md)',
    padding: 'clamp(1.5rem, 3vw, 2rem)',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  recapTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    margin: 0,
  },
  recapDivider: {
    height: '1px',
    backgroundColor: 'var(--hairline)',
  },
  recapRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem',
    paddingBottom: '0.6rem',
    borderBottom: '1px solid var(--hairline)',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  recapLabel: {
    color: 'var(--muted-sage)',
    fontSize: '0.85rem',
  },
  recapValue: {
    fontWeight: 600,
    color: 'var(--plantation-ink)',
    textAlign: 'right',
  },
  recapCodeBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--sugarcane-cream)',
    padding: '2px 8px',
    borderRadius: 'var(--border-radius-sm)',
    border: '1px solid var(--hairline)',
    color: 'var(--terracotta-clay)',
  },
  miniCopyBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 2,
    color: 'var(--plantation-ink)',
    display: 'flex',
  },
  recapBtnWrap: {
    marginTop: '0.5rem',
    textAlign: 'center',
  },
  recapExternalLink: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--ocean-teal)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    textDecoration: 'underline',
  },
  faqSection: {
    padding: 'clamp(3rem, 6vw, 5rem) 0',
    backgroundColor: 'var(--paper-light)',
    borderBottom: '1px solid var(--hairline)',
  },
  faqInner: {
    maxWidth: '780px',
  },
  faqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  faqItem: {
    backgroundColor: '#fff',
    border: '1px solid var(--hairline)',
    borderRadius: 'var(--border-radius-md)',
    overflow: 'hidden',
  },
  faqQuestionBtn: {
    width: '100%',
    padding: '1.1rem 1.4rem',
    background: 'none',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    textAlign: 'left',
    gap: '1rem',
  },
  faqQuestionText: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--plantation-ink)',
  },
  faqAnswerText: {
    padding: '0 1.4rem 1.2rem',
    fontSize: '0.92rem',
    lineHeight: 1.6,
    color: 'var(--muted-sage)',
    borderTop: '1px solid var(--hairline)',
    paddingTop: '0.8rem',
  },
  footerSection: {
    padding: 'clamp(3.5rem, 7vw, 5.5rem) 0',
    backgroundColor: 'var(--plantation-ink)',
    color: 'var(--sugarcane-cream)',
    textAlign: 'center',
  },
  footerInner: {
    maxWidth: '680px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.2rem',
  },
  footerMahalo: {
    color: 'var(--sugarcane-cream)',
    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
    margin: 0,
  },
  footerDesc: {
    fontSize: '1.05rem',
    lineHeight: 1.65,
    color: 'rgba(250, 246, 236, 0.82)',
    margin: 0,
  },
  footerCtas: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '0.8rem',
  },
  returnHomeBtn: {
    backgroundColor: 'transparent',
    color: 'var(--sugarcane-cream)',
    border: '1px solid rgba(250, 246, 236, 0.3)',
    borderRadius: 'var(--border-radius-md)',
    padding: '0.75rem 1.3rem',
    fontSize: '0.92rem',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    transition: 'border-color 0.2s ease',
  },
  footerFoodlandBtn: {
    backgroundColor: 'var(--heritage-gold)',
    color: 'var(--plantation-ink)',
    borderRadius: 'var(--border-radius-md)',
    padding: '0.75rem 1.3rem',
    fontSize: '0.92rem',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
  },
  footerLegal: {
    fontSize: '0.78rem',
    color: 'rgba(250, 246, 236, 0.5)',
    margin: '1.5rem 0 0',
    lineHeight: 1.5,
  },
  modalBackdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(16, 26, 20, 0.85)',
    backdropFilter: 'blur(6px)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.5rem',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 'var(--border-radius-md)',
    maxWidth: 'min(90vw, 550px)',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalImg: {
    maxWidth: '100%',
    maxHeight: '76vh',
    objectFit: 'contain',
    backgroundColor: '#f8f5ee',
  },
  modalCaption: {
    padding: '0.85rem 1.2rem',
    backgroundColor: 'var(--sugarcane-cream)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
    borderTop: '1px solid var(--hairline)',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  modalDownloadLink: {
    color: 'var(--ocean-teal)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: 600,
    textDecoration: 'none',
  },
};
