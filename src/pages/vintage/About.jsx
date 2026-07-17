import React, { useMemo, useState } from 'react';
import { 
  Compass, BookOpen, Users, Calendar, ArrowRight, Briefcase, Mail, 
  Search, MapPin, Phone, Clock, FileText, CheckCircle, X, 
  ChevronRight, ChevronDown, Send, Printer, User
} from 'lucide-react';
import bangoImage from '../../assets/bango_lunch_tin.png';
import { useSiteSettings, usePageSection, usePageListSection, useContentCollection } from '../../context/ContentProvider.jsx';

export default function About({ activeTab: propActiveTab, setActiveTab: propSetActiveTab }) {
  const { settings } = useSiteSettings();
  const { section: header } = usePageSection('about', 'header', {});
  const { section: mission } = usePageSection('about', 'mission', {});
  const { section: timelineIntro } = usePageSection('about', 'timelineIntro', {});
  const { section: leadershipIntro } = usePageSection('about', 'leadershipIntro', {});
  const { section: newsIntro } = usePageSection('about', 'newsIntro', {});
  const { section: careersIntro } = usePageSection('about', 'careersIntro', {});
  const { section: contactIntro } = usePageSection('about', 'contactIntro', {});
  const { items: newsArticles } = useContentCollection('news');
  const { items: careersList } = useContentCollection('career');
  const { items: timeline } = usePageListSection('about', 'timeline');
  const { items: leadership } = usePageListSection('about', 'leadership');

  const contact = settings?.contact ?? {};
  const hours = settings?.hours ?? {};
  const subjectOptions = contactIntro?.subjectOptions ?? [
    'General Inquiry',
    'Educational Tours',
    'Private Events',
    'Donation/Sponsorship',
    'Volunteering',
  ];
  const newsCategories = useMemo(
    () => ['All', ...new Set(newsArticles.map((a) => a.category).filter(Boolean))],
    [newsArticles],
  );
  const [localActiveTab, setLocalActiveTab] = useState('history');
  const activeTab = propActiveTab || localActiveTab;
  const setActiveTab = propSetActiveTab || setLocalActiveTab;

  // News State
  const [newsSearch, setNewsSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Careers State
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);
  const [jobForm, setJobForm] = useState({ name: '', email: '', phone: '', statement: '', resume: '' });
  const [jobFormErrors, setJobFormErrors] = useState({});
  const [jobSubmitSuccess, setJobSubmitSuccess] = useState(false);
  const [appliedJobTitle, setAppliedJobTitle] = useState('');

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: subjectOptions[0] ?? 'General Inquiry', message: '' });
  const [contactFormErrors, setContactFormErrors] = useState({});
  const [contactSubmitSuccess, setContactSubmitSuccess] = useState(false);
  const [contactReceipt, setContactReceipt] = useState(null);

  // News Filtering
  const filteredArticles = newsArticles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(newsSearch.toLowerCase()) || 
                          art.summary.toLowerCase().includes(newsSearch.toLowerCase()) ||
                          art.content.toLowerCase().includes(newsSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle Career Application Submission
  const handleJobSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!jobForm.name.trim()) errors.name = 'Full name is required';
    if (!jobForm.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(jobForm.email)) {
      errors.email = 'Invalid email address';
    }
    if (!jobForm.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    if (!jobForm.statement.trim()) {
      errors.statement = 'Statement of interest is required';
    }
    if (Object.keys(errors).length > 0) {
      setJobFormErrors(errors);
      return;
    }
    setAppliedJobTitle(applyingJob.title);
    setJobSubmitSuccess(true);
    setJobFormErrors({});
  };

  // Reset Career Application Modal
  const closeJobModal = () => {
    setApplyingJob(null);
    setJobForm({ name: '', email: '', phone: '', statement: '', resume: '' });
    setJobFormErrors({});
    setJobSubmitSuccess(false);
  };

  // Handle Contact Form Submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!contactForm.name.trim()) errors.name = 'Full name is required';
    if (!contactForm.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Invalid email address';
    }
    if (!contactForm.message.trim()) errors.message = 'Message content is required';
    
    if (Object.keys(errors).length > 0) {
      setContactFormErrors(errors);
      return;
    }
    
    setContactReceipt({
      receiptId: 'HPV-INQ-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      ...contactForm
    });
    setContactSubmitSuccess(true);
    setContactFormErrors({});
  };

  // Reset Contact Success state
  const resetContactForm = () => {
    setContactSubmitSuccess(false);
    setContactReceipt(null);
    setContactForm({ name: '', email: '', subject: subjectOptions[0] ?? 'General Inquiry', message: '' });
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <div style={styles.headerBlock}>
        <div style={styles.container}>
          <span className={`ink-stamp ${header?.stampClass ?? 'green'}`} style={{ marginBottom: '0.5rem' }}>{header?.stamp ?? 'Preservation'}</span>
          <h1 style={styles.pageTitle}>{header?.title ?? 'About the Village'}</h1>
          <p style={styles.pageSubtitle}>{header?.subtitle ?? 'A cultural sanctuary in Waipahu preserving stories and memories of Oʻahu\'s plantation communities.'}</p>
        </div>
      </div>

      {/* Interactive Vintage Sub-Tabs Navigation */}
      <div style={styles.tabsContainer}>
        <div style={styles.container}>
          <div style={styles.tabsWrapper}>
            <button 
              onClick={() => setActiveTab('history')}
              style={{ ...styles.tabButton, ...(activeTab === 'history' ? styles.tabButtonActive : {}) }}
            >
              <BookOpen size={16} />
              <span>History & Mission</span>
              {activeTab === 'history' && <div style={styles.tabIndicator} />}
            </button>
            <button 
              onClick={() => setActiveTab('news')}
              style={{ ...styles.tabButton, ...(activeTab === 'news' ? styles.tabButtonActive : {}) }}
            >
              <Calendar size={16} />
              <span>News & Announcements</span>
              {activeTab === 'news' && <div style={styles.tabIndicator} />}
            </button>
            <button 
              onClick={() => setActiveTab('careers')}
              style={{ ...styles.tabButton, ...(activeTab === 'careers' ? styles.tabButtonActive : {}) }}
            >
              <Briefcase size={16} />
              <span>Careers</span>
              {activeTab === 'careers' && <div style={styles.tabIndicator} />}
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              style={{ ...styles.tabButton, ...(activeTab === 'contact' ? styles.tabButtonActive : {}) }}
            >
              <Mail size={16} />
              <span>Contact Us</span>
              {activeTab === 'contact' && <div style={styles.tabIndicator} />}
            </button>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        {/* TAB 1: HISTORY & MISSION (Original Content) */}
        {activeTab === 'history' && (
          <div>
            {/* Mission statement */}
            <section style={styles.aboutSection}>
              <div style={styles.twoColumnGrid}>
                <div style={styles.textCol}>
                  <span className="ledger-header" style={{ marginBottom: '0.5rem' }}>{mission?.stamp ?? 'MISSION & VISION'}</span>
                  <h2 style={styles.sectionTitle}>{mission?.title ?? 'Preserving the Roots of Modern Hawaiʻi'}</h2>
                  {(mission?.paragraphs ?? []).map((paragraph, idx) => (
                    <p key={idx} style={styles.bodyText}>{paragraph}</p>
                  ))}
                </div>
                <div style={styles.imgCol}>
                  <div style={styles.imgWrapper}>
                    <img src={bangoImage} alt="Vintage Bango tags and lunch tin" style={styles.featuredImg} />
                    <div style={styles.imgTextureOverlay} />
                  </div>
                </div>
              </div>
            </section>

            {/* Timeline */}
            <section style={styles.timelineSection}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span className={`ink-stamp ${timelineIntro?.stampClass ?? 'rust'}`} style={{ marginBottom: '1rem' }}>{timelineIntro?.stamp ?? 'CHRONICLES'}</span>
                <h2 style={styles.sectionTitle}>{timelineIntro?.title ?? 'Plantation Era Timeline'}</h2>
                <p style={{ ...styles.bodyText, maxWidth: '600px', margin: '0 auto' }}>
                  {timelineIntro?.description ?? 'Key historical milestones of immigration waves, industrial growth, and cultural synthesis in Hawaii.'}
                </p>
              </div>

              <div style={styles.timelineList}>
                {timeline.map((item, idx) => (
                  <div key={idx} style={styles.timelineItem}>
                    <div style={styles.timelineYear}>{item.year}</div>
                    <div style={styles.timelineBody}>
                      <p style={styles.timelineText}>{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Leadership */}
            <section style={styles.aboutSection}>
              <h2 style={{ ...styles.sectionTitle, textAlign: 'center', marginBottom: '2.5rem' }}>{leadershipIntro?.title ?? 'Leadership & Board'}</h2>
              <div style={styles.boardGrid}>
                {leadership.map((person) => (
                  <div key={person.name} className="paper-card" style={styles.boardCard}>
                    <h4 style={styles.boardName}>{person.name}</h4>
                    <span style={styles.boardRole}>{person.role}</span>
                    <p style={styles.boardDesc}>{person.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: NEWS & ANNOUNCEMENTS */}
        {activeTab === 'news' && (
          <div style={styles.tabContentArea}>
            <div style={styles.ledgerHeaderRow}>
              <div>
                <span className="ledger-header" style={{ marginBottom: '0.25rem' }}>{newsIntro?.stamp ?? 'LEDGER REPORTS'}</span>
                <h2 style={styles.sectionTitle}>{newsIntro?.title ?? 'News & Announcements'}</h2>
              </div>
              
              {/* Category Filter and Search */}
              <div style={styles.newsFilterControls}>
                <div style={styles.searchWrapper}>
                  <Search size={16} style={styles.searchIcon} />
                  <input 
                    type="text" 
                    placeholder="Search ledger..." 
                    value={newsSearch} 
                    onChange={(e) => setNewsSearch(e.target.value)} 
                    style={styles.searchInput}
                  />
                </div>
                <div style={styles.filterBtns}>
                  {newsCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        ...styles.filterBtn,
                        ...(selectedCategory === cat ? styles.filterBtnActive : {})
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Articles List */}
            {filteredArticles.length === 0 ? (
              <div style={styles.noResultsCard} className="paper-card">
                <p style={styles.noResultsText}>No announcements found matching the criteria.</p>
                <button onClick={() => { setNewsSearch(''); setSelectedCategory('All'); }} className="btn-secondary" style={{ marginTop: '0.5rem' }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div style={styles.newsGrid}>
                {filteredArticles.map(article => (
                  <div key={article.id} className="paper-card" style={styles.newsCard}>
                    <div style={styles.newsCardImageWrapper}>
                      <img src={article.image} alt={article.title} style={styles.newsCardImage} />
                      <span className="ink-stamp gold" style={styles.newsCardStamp}>{article.category}</span>
                    </div>
                    <div style={styles.newsCardBody}>
                      <span style={styles.newsCardDate}>{article.date}</span>
                      <h3 style={styles.newsCardTitle}>{article.title}</h3>
                      <p style={styles.newsCardSummary}>{article.summary}</p>
                      <button 
                        onClick={() => setSelectedArticle(article)}
                        className="btn-primary" 
                        style={styles.newsReadBtn}
                      >
                        Read Ledger Entry <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Article Detail Modal */}
            {selectedArticle && (
              <div style={styles.modalOverlay}>
                <div className="paper-card" style={styles.articleModal}>
                  <button onClick={() => setSelectedArticle(null)} style={styles.modalCloseBtn}>
                    <X size={20} />
                  </button>
                  <div style={styles.modalScrollContent}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={styles.modalDate}>{selectedArticle.date}</span>
                      <span className="ink-stamp rust">{selectedArticle.category}</span>
                    </div>
                    <h2 style={styles.modalTitle}>{selectedArticle.title}</h2>
                    <div style={styles.modalDivider} />
                    <img src={selectedArticle.image} alt={selectedArticle.title} style={styles.modalImage} />
                    <p style={styles.modalBodyText}>{selectedArticle.content}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CAREERS */}
        {activeTab === 'careers' && (
          <div style={styles.tabContentArea}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="ledger-header" style={{ marginBottom: '0.25rem' }}>{careersIntro?.stamp ?? 'LABOR & STEWARDSHIP'}</span>
              <h2 style={styles.sectionTitle}>{careersIntro?.title ?? 'Join the Preservation'}</h2>
              <p style={{ ...styles.bodyText, maxWidth: '600px', margin: '0 auto' }}>
                {careersIntro?.description ?? 'Help us keep the stories of Waipahu\'s immigrant communities alive. Discover our active career and volunteering opportunities below.'}
              </p>
            </div>

            {/* Accordion Listings */}
            <div style={styles.careersList}>
              {careersList.map(job => {
                const isExpanded = expandedJobId === job.id;
                return (
                  <div key={job.id} className="paper-card" style={styles.jobAccordionCard}>
                    <div 
                      onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                      style={styles.jobHeader}
                    >
                      <div style={styles.jobHeaderTitleCol}>
                        <h3 style={styles.jobTitle}>{job.title}</h3>
                        <div style={styles.jobMetaRow}>
                          <span style={styles.jobMetaTag}><Briefcase size={12} /> {job.type}</span>
                          <span style={styles.jobMetaTag}><Users size={12} /> {job.department}</span>
                          <span style={styles.jobMetaTag}><Clock size={12} /> {job.hours}</span>
                        </div>
                      </div>
                      <div style={styles.jobHeaderChevron}>
                        {isExpanded ? <ChevronDown size={24} style={{ color: 'var(--cane-green)' }} /> : <ChevronRight size={24} />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div style={styles.jobDetails}>
                        <div style={styles.jobDetailsGrid}>
                          <div>
                            <h4 style={styles.jobDetailsSectionHeader}>Job Description</h4>
                            <p style={styles.bodyText}>{job.summary}</p>

                            <h4 style={styles.jobDetailsSectionHeader}>Key Responsibilities</h4>
                            <ul style={styles.jobList}>
                              {job.responsibilities.map((resp, i) => (
                                <li key={i} style={styles.jobListItem}><ChevronRight size={12} style={styles.bulletIcon} /> {resp}</li>
                              ))}
                            </ul>
                          </div>

                          <div style={styles.jobDetailsRightCol}>
                            <div style={styles.compensationCard}>
                              <span style={styles.compLabel}>Compensation</span>
                              <span style={styles.compValue}>{job.compensation}</span>
                            </div>

                            <h4 style={styles.jobDetailsSectionHeader}>Requirements & Skills</h4>
                            <ul style={styles.jobList}>
                              {job.requirements.map((req, i) => (
                                <li key={i} style={styles.jobListItem}><ChevronRight size={12} style={styles.bulletIcon} /> {req}</li>
                              ))}
                            </ul>
                            
                            <button 
                              onClick={() => setApplyingJob(job)} 
                              className="btn-accent" 
                              style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                              <FileText size={16} /> Apply for Position
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Career Application Modal */}
            {applyingJob && (
              <div style={styles.modalOverlay}>
                <div className="paper-card" style={styles.jobModal}>
                  <button onClick={closeJobModal} style={styles.modalCloseBtn}>
                    <X size={20} />
                  </button>

                  {!jobSubmitSuccess ? (
                    <form onSubmit={handleJobSubmit} style={styles.modalForm}>
                      <div style={{ marginBottom: '1.25rem' }}>
                        <span className="ink-stamp green" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Official Application</span>
                        <h3 style={styles.modalTitle}>Application: {applyingJob.title}</h3>
                        <p style={{ ...styles.bodyText, fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                          Please fill out your details. Our administrative coordinator will contact you.
                        </p>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Full Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Keoni Kealoha"
                          value={jobForm.name} 
                          onChange={(e) => setJobForm({ ...jobForm, name: e.target.value })}
                          style={{ ...styles.formInput, ...(jobFormErrors.name ? styles.formInputError : {}) }}
                        />
                        {jobFormErrors.name && <span style={styles.errorText}>{jobFormErrors.name}</span>}
                      </div>

                      <div style={styles.formGroupGrid}>
                        <div style={styles.formGroup}>
                          <label style={styles.formLabel}>Email Address</label>
                          <input 
                            type="email" 
                            placeholder="name@domain.com"
                            value={jobForm.email} 
                            onChange={(e) => setJobForm({ ...jobForm, email: e.target.value })}
                            style={{ ...styles.formInput, ...(jobFormErrors.email ? styles.formInputError : {}) }}
                          />
                          {jobFormErrors.email && <span style={styles.errorText}>{jobFormErrors.email}</span>}
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.formLabel}>Phone Number</label>
                          <input 
                            type="tel" 
                            placeholder="(808) 555-0199"
                            value={jobForm.phone} 
                            onChange={(e) => setJobForm({ ...jobForm, phone: e.target.value })}
                            style={{ ...styles.formInput, ...(jobFormErrors.phone ? styles.formInputError : {}) }}
                          />
                          {jobFormErrors.phone && <span style={styles.errorText}>{jobFormErrors.phone}</span>}
                        </div>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Statement of Interest & Experience</label>
                        <textarea 
                          rows={4}
                          placeholder="Describe your background and why you want to work with Hawaiian Plantation Village..."
                          value={jobForm.statement} 
                          onChange={(e) => setJobForm({ ...jobForm, statement: e.target.value })}
                          style={{ ...styles.formTextArea, ...(jobFormErrors.statement ? styles.formInputError : {}) }}
                        />
                        {jobFormErrors.statement && <span style={styles.errorText}>{jobFormErrors.statement}</span>}
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Link to Resume / Portfolio (Optional)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. LinkedIn link or cloud doc address"
                          value={jobForm.resume} 
                          onChange={(e) => setJobForm({ ...jobForm, resume: e.target.value })}
                          style={styles.formInput}
                        />
                      </div>

                      <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                        <Send size={16} /> Submit Application
                      </button>
                    </form>
                  ) : (
                    <div style={styles.jobSuccessBlock}>
                      <div style={styles.successIcon}>
                        <CheckCircle size={32} style={{ color: 'white' }} />
                      </div>
                      <h3 style={styles.successTitle}>Application Submitted</h3>
                      <p style={styles.bodyText}>
                        Thank you for your interest in joining our team. Your application has been logged into the ledger system.
                      </p>

                      <div style={styles.receiptSummary}>
                        <div style={{ textAlign: 'center', borderBottom: '1px dashed var(--kraft-tan-dark)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                          <span style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--tin-rust)' }}>
                            LABOR ENTRY RECEIPT
                          </span>
                        </div>
                        <div style={styles.receiptRow}>
                          <span>Applicant:</span>
                          <strong>{jobForm.name}</strong>
                        </div>
                        <div style={styles.receiptRow}>
                          <span>Position:</span>
                          <strong>{appliedJobTitle}</strong>
                        </div>
                        <div style={styles.receiptRow}>
                          <span>Status:</span>
                          <span style={{ color: 'var(--cane-green)', fontWeight: 'bold' }}>PENDING REVIEW</span>
                        </div>
                        <div style={styles.receiptRow}>
                          <span>Logged:</span>
                          <strong>{new Date().toLocaleDateString()}</strong>
                        </div>
                      </div>

                      <button onClick={closeJobModal} className="btn-primary">
                        Close Ledger
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CONTACT US */}
        {activeTab === 'contact' && (
          <div style={styles.tabContentArea}>
            <div style={styles.contactContainerGrid}>
              
              {/* Left Column: Form */}
              <div className="paper-card" style={styles.contactFormCard}>
                {!contactSubmitSuccess ? (
                  <form onSubmit={handleContactSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <span className="ledger-header" style={{ marginBottom: '0.25rem' }}>{contactIntro?.stamp ?? 'INQUIRY REGISTRATION'}</span>
                      <h3 style={{ ...styles.sectionTitle, fontSize: '1.75rem', marginBottom: '0.5rem' }}>{contactIntro?.title ?? 'Send a Message'}</h3>
                      <p style={{ ...styles.bodyText, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {contactIntro?.description ?? 'Have questions about cottage history, schedules, or support? Fill out the registration form.'}
                      </p>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Your Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Malia Silva"
                        value={contactForm.name} 
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        style={{ ...styles.formInput, ...(contactFormErrors.name ? styles.formInputError : {}) }}
                      />
                      {contactFormErrors.name && <span style={styles.errorText}>{contactFormErrors.name}</span>}
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Email Address</label>
                      <input 
                        type="email" 
                        placeholder="malia@example.com"
                        value={contactForm.email} 
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        style={{ ...styles.formInput, ...(contactFormErrors.email ? styles.formInputError : {}) }}
                      />
                      {contactFormErrors.email && <span style={styles.errorText}>{contactFormErrors.email}</span>}
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Subject of Inquiry</label>
                      <select 
                        value={contactForm.subject} 
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        style={styles.formSelect}
                      >
                        {subjectOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Message</label>
                      <textarea 
                        rows={5}
                        placeholder="Write your message here..."
                        value={contactForm.message} 
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        style={{ ...styles.formTextArea, ...(contactFormErrors.message ? styles.formInputError : {}) }}
                      />
                      {contactFormErrors.message && <span style={styles.errorText}>{contactFormErrors.message}</span>}
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      <Send size={16} /> Submit Inquiry
                    </button>
                  </form>
                ) : (
                  <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <div style={styles.successIcon}>
                      <CheckCircle size={32} style={{ color: 'white' }} />
                    </div>
                    <h3 style={styles.successTitle}>Inquiry Logged</h3>
                    <p style={styles.bodyText}>
                      Aloha! Your message has been successfully stamped and delivered to our administrative logs.
                    </p>

                    <div style={styles.receiptSummary} className="stamp-border">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed var(--kraft-tan-dark)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                        <span style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.8rem', color: 'var(--tin-rust)', fontWeight: 'bold' }}>
                          OFFICIAL RECORD
                        </span>
                        <span className="ink-stamp green" style={{ fontSize: '0.65rem', transform: 'rotate(-5deg)' }}>RECEIVED</span>
                      </div>

                      <div style={styles.receiptRow}>
                        <span>Record ID:</span>
                        <strong>{contactReceipt?.receiptId}</strong>
                      </div>
                      <div style={styles.receiptRow}>
                        <span>Sender:</span>
                        <strong>{contactReceipt?.name}</strong>
                      </div>
                      <div style={styles.receiptRow}>
                        <span>Email:</span>
                        <strong>{contactReceipt?.email}</strong>
                      </div>
                      <div style={styles.receiptRow}>
                        <span>Subject:</span>
                        <strong>{contactReceipt?.subject}</strong>
                      </div>
                      <div style={styles.receiptRow}>
                        <span>Date Stamped:</span>
                        <strong>{contactReceipt?.date}</strong>
                      </div>
                      <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--kraft-tan-dark)', paddingTop: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Message Summary:</span>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-dark)', margin: 0, fontStyle: 'italic', lineHeight: '1.4' }}>
                          "{contactReceipt?.message.substring(0, 120)}{contactReceipt?.message.length > 120 ? '...' : ''}"
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                      <button onClick={resetContactForm} className="btn-primary">
                        Submit Another
                      </button>
                      <button onClick={() => window.print()} className="btn-secondary">
                        <Printer size={14} /> Print Receipt
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Contact Info & Map */}
              <div style={styles.contactInfoCol}>
                
                {/* Office info card */}
                <div className="paper-card" style={styles.infoCard}>
                  <span className="ink-stamp rust" style={{ float: 'right', fontSize: '0.65rem' }}>DIRECTORIES</span>
                  <h3 style={styles.infoCardHeader}>Village Headquarters</h3>
                  <div style={styles.ledgerDivider} />

                  <div style={styles.infoItem}>
                    <MapPin size={18} style={styles.infoIcon} />
                    <div>
                      <h5 style={styles.infoLabel}>Location Address</h5>
                      <p style={styles.infoText}>
                        {contact.address?.line1}<br />
                        {contact.address?.line2}
                      </p>
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <Phone size={18} style={styles.infoIcon} />
                    <div>
                      <h5 style={styles.infoLabel}>Telephone Connection</h5>
                      <p style={styles.infoText}>
                        <a href={contact.phoneHref ?? 'tel:8086770110'} style={styles.contactAnchor}>{contact.phone ?? '(808) 677-0110'}</a>
                      </p>
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <Mail size={18} style={styles.infoIcon} />
                    <div>
                      <h5 style={styles.infoLabel}>Electronic Mailing Address</h5>
                      <p style={styles.infoText}>
                        <a href={contact.emailHref ?? 'mailto:info@hawaiianplantationvillage.org'} style={styles.contactAnchor}>{contact.email ?? 'info@hawaiianplantationvillage.org'}</a>
                      </p>
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <Clock size={18} style={styles.infoIcon} />
                    <div>
                      <h5 style={styles.infoLabel}>Hours of Operation</h5>
                      <p style={styles.infoText}>
                        {hours.schedule ?? 'Tuesday through Saturday'}<br />
                        {hours.toursNote ?? 'Guided tours at 10:00 AM & 12:00 PM'}<br />
                        <span style={{ fontSize: '0.75rem', color: 'var(--tin-rust)', fontWeight: 'bold' }}>{hours.closedNote ?? '*Closed Sundays, Mondays & Major Holidays'}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Wrapper */}
                <div className="paper-card" style={styles.mapCard}>
                  <div style={styles.mapFrameBorder}>
                    <iframe 
                      src={contact.mapEmbed ?? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.141857904033!2d-158.00941912384777!3d21.38428548035626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c0065961d6fbcd7%3A0x7d27e7f6e2b17a19!2sHawaiian%20Plantation%20Village!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus'} 
                      width="100%" 
                      height="260" 
                      style={{ border: 0, display: 'block' }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Hawaiian Plantation Village Map"
                    />
                  </div>
                  <div style={styles.mapTag}>
                    <span style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.7rem' }}>PLATE N-14: WAIPAHU PLOT COORDINATES</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}
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
    marginBottom: '0'
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
  // Sub-navigation tabs
  tabsContainer: {
    backgroundColor: 'var(--paper-dark)',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    position: 'sticky',
    top: '78px', // offset from navbar height
    zIndex: 90,
    marginBottom: '3rem'
  },
  tabsWrapper: {
    display: 'flex',
    overflowX: 'auto',
    gap: '4px',
    padding: '0.5rem 0 0 0',
    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none' // Chrome/Safari
    }
  },
  tabButton: {
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '0.75rem 1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    position: 'relative',
    transition: 'color 0.2s ease',
    borderRadius: '4px 4px 0 0',
    border: '1px solid transparent',
    borderBottom: 'none'
  },
  tabButtonActive: {
    color: 'var(--cane-green)',
    backgroundColor: 'var(--paper-light)',
    borderColor: 'var(--kraft-tan-dark)'
  },
  tabIndicator: {
    position: 'absolute',
    bottom: '-1px',
    left: 0,
    right: 0,
    height: '2px',
    backgroundColor: 'var(--paper-light)',
    zIndex: 10
  },
  // Sections
  aboutSection: {
    padding: '2rem 0'
  },
  tabContentArea: {
    padding: '1rem 0',
    animation: 'fadeIn 0.4s ease'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    '@media (max-width: 800px)': {
      gridTemplateColumns: '1fr',
      gap: '2.5rem'
    }
  },
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  sectionTitle: {
    fontSize: '2.2rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '1.25rem'
  },
  bodyText: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: 'var(--text-dark)',
    marginBottom: '1.25rem'
  },
  imgCol: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  imgWrapper: {
    position: 'relative',
    borderRadius: '4px',
    border: '3px solid var(--koa-wood)',
    padding: '6px',
    backgroundColor: 'var(--paper-light)',
    boxShadow: 'var(--shadow-lg)',
    width: '100%',
    maxWidth: '450px'
  },
  featuredImg: {
    width: '100%',
    height: '320px',
    objectFit: 'cover',
    display: 'block'
  },
  imgTextureOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
    pointerEvents: 'none'
  },
  // Timeline styles
  timelineSection: {
    padding: '4rem 0',
    backgroundColor: 'var(--paper-dark)',
    margin: '3rem -1.5rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem'
  },
  timelineList: {
    position: 'relative',
    maxWidth: '800px',
    margin: '0 auto',
    paddingLeft: '2rem',
    borderLeft: '2px dashed var(--kraft-tan-dark)'
  },
  timelineItem: {
    position: 'relative',
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  timelineYear: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'var(--tin-rust)',
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  timelineBody: {
    backgroundColor: 'var(--paper-light)',
    padding: '1rem 1.25rem',
    borderRadius: '4px',
    border: '1px solid var(--kraft-tan-dark)',
    boxShadow: 'var(--shadow-sm)'
  },
  timelineText: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: 'var(--text-dark)',
    margin: 0
  },
  // Board styles
  boardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2.5rem'
  },
  boardCard: {
    padding: '1.75rem',
    borderRadius: '4px'
  },
  boardName: {
    fontSize: '1.25rem',
    color: 'var(--koa-wood)',
    marginBottom: '2px'
  },
  boardRole: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: 'var(--tin-rust)',
    textTransform: 'uppercase',
    display: 'inline-block',
    marginBottom: '12px'
  },
  boardDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5'
  },

  // News Styles
  ledgerHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginBottom: '2.5rem',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    paddingBottom: '1.5rem'
  },
  newsFilterControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'flex-end',
    width: '100%',
    maxWidth: '500px',
    '@media (max-width: 600px)': {
      alignItems: 'stretch'
    }
  },
  searchWrapper: {
    position: 'relative',
    width: '100%'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)'
  },
  searchInput: {
    width: '100%',
    padding: '0.6rem 0.6rem 0.6rem 2.2rem',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'var(--font-typewriter)',
    backgroundColor: 'white',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
  },
  filterBtns: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap'
  },
  filterBtn: {
    background: 'none',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    padding: '4px 10px',
    cursor: 'pointer',
    color: 'var(--text-muted)',
    transition: 'all 0.15s ease',
    backgroundColor: 'var(--paper-dark)'
  },
  filterBtnActive: {
    backgroundColor: 'var(--cane-green)',
    color: 'white',
    borderColor: 'var(--cane-green)'
  },
  noResultsCard: {
    textAlign: 'center',
    padding: '4rem 2rem',
    borderRadius: '4px'
  },
  noResultsText: {
    fontFamily: 'var(--font-typewriter)',
    color: 'var(--text-muted)',
    fontSize: '1rem',
    margin: 0
  },
  newsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2.5rem'
  },
  newsCard: {
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    padding: '0'
  },
  newsCardImageWrapper: {
    position: 'relative',
    height: '200px',
    width: '100%'
  },
  newsCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  newsCardStamp: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    fontSize: '0.65rem',
    backgroundColor: 'rgba(251, 249, 245, 0.95)',
    boxShadow: 'var(--shadow-sm)'
  },
  newsCardBody: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  newsCardDate: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    color: 'var(--tin-rust)',
    marginBottom: '6px',
    fontWeight: 'bold'
  },
  newsCardTitle: {
    fontSize: '1.35rem',
    color: 'var(--koa-wood)',
    marginBottom: '10px',
    lineHeight: '1.25'
  },
  newsCardSummary: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '1.5rem',
    flex: 1
  },
  newsReadBtn: {
    alignSelf: 'flex-start',
    fontSize: '0.75rem',
    padding: '0.5rem 1rem'
  },

  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(33, 28, 24, 0.6)',
    backdropFilter: 'blur(3px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1.5rem'
  },
  articleModal: {
    width: '100%',
    maxWidth: '700px',
    maxHeight: '90vh',
    borderRadius: '4px',
    padding: '2.5rem 2rem 2rem 2rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  modalCloseBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '50%',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: 'var(--paper-dark)'
    }
  },
  modalScrollContent: {
    overflowY: 'auto',
    paddingRight: '6px'
  },
  modalDate: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.85rem',
    color: 'var(--tin-rust)',
    fontWeight: 'bold'
  },
  modalTitle: {
    fontSize: '1.8rem',
    color: 'var(--koa-wood-dark)',
    marginBottom: '1rem'
  },
  modalDivider: {
    height: '1px',
    backgroundColor: 'var(--kraft-tan-dark)',
    marginBottom: '1.5rem'
  },
  modalImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '1.5rem',
    border: '1px solid var(--kraft-tan-dark)'
  },
  modalBodyText: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: 'var(--text-dark)'
  },

  // Careers Styles
  careersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    maxWidth: '900px',
    margin: '0 auto'
  },
  jobAccordionCard: {
    borderRadius: '4px',
    overflow: 'hidden',
    transition: 'all 0.2s ease'
  },
  jobHeader: {
    padding: '1.5rem 1.75rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: 'var(--paper-dark)'
    }
  },
  jobHeaderTitleCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  jobTitle: {
    fontSize: '1.35rem',
    color: 'var(--koa-wood)',
    margin: 0
  },
  jobMetaRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  },
  jobMetaTag: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  jobHeaderChevron: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%'
  },
  jobDetails: {
    borderTop: '1px dashed var(--kraft-tan-dark)',
    padding: '2rem 1.75rem',
    backgroundColor: 'rgba(240, 234, 225, 0.3)'
  },
  jobDetailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: '2.5rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '2rem'
    }
  },
  jobDetailsSectionHeader: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.8rem',
    color: 'var(--tin-rust)',
    textTransform: 'uppercase',
    borderBottom: '1px solid var(--kraft-tan-dark)',
    paddingBottom: '4px',
    marginBottom: '10px',
    fontWeight: 'bold',
    marginTop: '1.5rem',
    '&:first-of-type': {
      marginTop: 0
    }
  },
  jobDetailsRightCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  compensationCard: {
    backgroundColor: 'var(--paper-dark)',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    padding: '1rem',
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  compLabel: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  compValue: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    color: 'var(--cane-green)',
    fontWeight: 'bold'
  },
  jobList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  jobListItem: {
    fontSize: '0.9rem',
    color: 'var(--text-dark)',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '6px',
    lineHeight: '1.4'
  },
  bulletIcon: {
    marginTop: '4px',
    color: 'var(--tin-rust)',
    flexShrink: 0
  },

  // Job Application Modal
  jobModal: {
    width: '100%',
    maxWidth: '550px',
    maxHeight: '92vh',
    borderRadius: '4px',
    padding: '2.5rem 1.75rem 1.75rem 1.75rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    paddingRight: '4px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '1rem'
  },
  formGroupGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    '@media (max-width: 500px)': {
      gridTemplateColumns: '1fr'
    }
  },
  formLabel: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: 'var(--koa-wood)',
    fontFamily: 'var(--font-typewriter)',
    textTransform: 'uppercase'
  },
  formInput: {
    padding: '0.65rem 0.75rem',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    outline: 'none',
    fontSize: '0.95rem',
    backgroundColor: 'white',
    transition: 'border-color 0.15s ease',
    '&:focus': {
      borderColor: 'var(--cane-green)'
    }
  },
  formInputError: {
    borderColor: 'var(--tin-rust)',
    backgroundColor: '#fffcfb'
  },
  formTextArea: {
    padding: '0.65rem 0.75rem',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    outline: 'none',
    fontSize: '0.95rem',
    backgroundColor: 'white',
    fontFamily: 'inherit',
    resize: 'vertical',
    transition: 'border-color 0.15s ease',
    '&:focus': {
      borderColor: 'var(--cane-green)'
    }
  },
  formSelect: {
    padding: '0.65rem 0.75rem',
    border: '1px solid var(--kraft-tan-dark)',
    borderRadius: '4px',
    outline: 'none',
    fontSize: '0.95rem',
    backgroundColor: 'white',
    fontFamily: 'inherit',
    cursor: 'pointer'
  },
  errorText: {
    fontSize: '0.75rem',
    color: 'var(--tin-rust)',
    fontFamily: 'var(--font-typewriter)'
  },
  jobSuccessBlock: {
    textAlign: 'center',
    padding: '1.5rem 0'
  },
  successIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'var(--cane-green)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.25rem auto',
    boxShadow: '0 4px 8px rgba(27, 56, 35, 0.2)'
  },
  successTitle: {
    fontSize: '1.6rem',
    color: 'var(--cane-green)',
    marginBottom: '0.5rem'
  },
  receiptSummary: {
    border: '1px solid var(--kraft-tan-dark)',
    padding: '1.25rem',
    textAlign: 'left',
    backgroundColor: 'white',
    marginBottom: '1.5rem',
    borderRadius: '4px',
    boxShadow: 'var(--shadow-sm)'
  },
  receiptRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
    marginBottom: '6px',
    fontFamily: 'var(--font-typewriter)',
    color: 'var(--text-dark)',
    '&:last-of-type': {
      marginBottom: 0
    }
  },

  // Contact Page Styles
  contactContainerGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '3.5rem',
    alignItems: 'start',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      gap: '2.5rem'
    }
  },
  contactFormCard: {
    padding: '2.25rem',
    borderRadius: '4px'
  },
  contactInfoCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  infoCard: {
    padding: '2.25rem 2rem',
    borderRadius: '4px'
  },
  infoCardHeader: {
    fontSize: '1.5rem',
    color: 'var(--koa-wood)',
    margin: 0
  },
  infoItem: {
    display: 'flex',
    gap: '16px',
    marginBottom: '1.5rem',
    '&:last-of-type': {
      marginBottom: 0
    }
  },
  infoIcon: {
    color: 'var(--tin-rust)',
    marginTop: '4px',
    flexShrink: 0
  },
  infoLabel: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  infoText: {
    fontSize: '0.95rem',
    lineHeight: '1.5',
    color: 'var(--text-dark)',
    margin: 0
  },
  contactAnchor: {
    color: 'var(--koa-wood)',
    fontWeight: 'bold',
    borderBottom: '1px dashed var(--kraft-tan-dark)',
    paddingBottom: '2px',
    transition: 'all 0.2s',
    '&:hover': {
      color: 'var(--cane-green)',
      borderBottomColor: 'var(--cane-green)'
    }
  },
  mapCard: {
    padding: '6px',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  mapFrameBorder: {
    border: '2px solid var(--koa-wood)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  mapTag: {
    textAlign: 'center',
    padding: '8px 0 4px 0',
    backgroundColor: 'var(--paper-dark)',
    color: 'var(--text-muted)',
    borderTop: '1px solid var(--kraft-tan-dark)'
  }
};

