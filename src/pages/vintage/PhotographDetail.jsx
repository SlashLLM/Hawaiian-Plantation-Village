import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  useContentCollection,
  usePageSection,
  usePageListSection,
} from '../../context/ContentProvider.jsx';
import { PHOTOGRAPH_COLLECTIONS } from '../../lib/content/fallbacks.js';
import { scrollIntoViewIfSupported } from '../../lib/scrollIntoViewIfSupported.js';
import AnalyzePhotographForm from '../../components/archives/AnalyzePhotographForm.jsx';

const collectionName = (id) =>
  PHOTOGRAPH_COLLECTIONS.find((collection) => collection.id === id)?.name ?? 'Archives';

function MetaRow({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default function PhotographDetail() {
  const { arkId } = useParams();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const { items: photographs, loading } = useContentCollection('photograph');
  const { section: analyze } = usePageSection('archives', 'analyze', {});
  const { items: howToSteps } = usePageListSection('archives', 'howToLook', 'steps');

  const photo = photographs.find((item) => item.arkId === arkId || item.slug === arkId);
  const related = (photo?.relatedArkIds ?? [])
    .map((id) => photographs.find((item) => item.arkId === id))
    .filter(Boolean);

  useEffect(() => {
    const target = hash ? document.querySelector(hash) : null;
    if (target) {
      scrollIntoViewIfSupported(target, { behavior: 'smooth', block: 'start' });
      return;
    }
    window.scrollTo({ top: 0 });
  }, [arkId, hash, photo?.arkId]);

  if (!photo) {
    return (
      <section className="editorial-section">
        <div className="editorial-shell">
          <h1 className="editorial-title">
            {loading ? 'Opening the archives…' : 'That photograph is not in the archives'}
          </h1>
          {!loading && (
            <p style={{ marginTop: '1.5rem' }}>
              <button type="button" className="btn-secondary" onClick={() => navigate('/archives')}>
                <ArrowLeft size={16} /> Back to archives
              </button>
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="editorial-section" style={{ paddingBottom: 0 }}>
        <div className="editorial-shell">
          <button
            type="button"
            className="btn-secondary no-print"
            onClick={() => navigate('/archives')}
            style={{ marginBottom: '2rem' }}
          >
            <ArrowLeft size={16} /> All photographs
          </button>

          <div className="archive-detail-grid">
            <div>
              <div className="archive-plate">
                <img src={photo.imageUrl || photo.thumbnailUrl} alt={photo.title} />
              </div>
              {photo.caption && (
                <p className="editorial-lede" style={{ maxWidth: '68ch' }}>{photo.caption}</p>
              )}
              {photo.provisional && (
                <p className="archive-note" style={{ marginTop: '1.25rem' }}>
                  This description was written from the image itself while the accession record is
                  being transcribed. Treat the dates and names as working notes, not archive fact.
                </p>
              )}
            </div>

            <div>
              <p className="editorial-eyebrow">{collectionName(photo.collection)}</p>
              <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', margin: '0 0 1.5rem' }}>
                {photo.title}
              </h1>
              <dl className="meta-list">
                <MetaRow label="Filing category" value={photo.filingCategory} />
                <MetaRow label="Subject" value={photo.subject} />
                <MetaRow label="Circa" value={photo.circaDate} />
                <MetaRow label="Photographer" value={photo.photographer} />
                <MetaRow label="Donor or origin" value={photo.donor} />
                <MetaRow label="Accession number" value={photo.accessionNumber} />
                <MetaRow label="Ark ID" value={photo.arkId} />
              </dl>

              {(photo.backImageUrl || photo.accessionCardUrl) && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                  {photo.backImageUrl && (
                    <a className="resource-label" href={photo.backImageUrl} target="_blank" rel="noreferrer">
                      Back of photograph
                    </a>
                  )}
                  {photo.accessionCardUrl && (
                    <a className="resource-label" href={photo.accessionCardUrl} target="_blank" rel="noreferrer">
                      Accession card
                    </a>
                  )}
                </div>
              )}

              {photo.studyNotes && (
                <div style={{ marginTop: '2rem' }}>
                  <p className="editorial-eyebrow">Looking at this photograph</p>
                  <p className="door-note">{photo.studyNotes}</p>
                </div>
              )}

              {howToSteps.length > 0 && (
                <ol style={{ marginTop: '2rem', paddingLeft: '1.1rem' }}>
                  {howToSteps.map((step) => (
                    <li key={step.title} className="door-note" style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--plantation-ink)' }}>{step.title}.</strong>{' '}
                      {step.note}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="editorial-section">
          <div className="editorial-shell">
            <p className="editorial-eyebrow">Related photographs</p>
            <h2 className="editorial-title">Seen in the same sequence</h2>
            <div className="related-strip">
              {related.map((item) => (
                <button
                  key={item.arkId}
                  type="button"
                  className="archive-card"
                  onClick={() => navigate(`/archives/${item.arkId}`)}
                >
                  <span className="archive-figure">
                    <img src={item.thumbnailUrl || item.imageUrl} alt={item.title} loading="lazy" />
                  </span>
                  <span className="archive-card-title">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="editorial-section on-sand" id="analyze">
        <div className="editorial-shell">
          <p className="editorial-eyebrow">{analyze?.eyebrow ?? 'Analyze a photograph'}</p>
          <h2 className="editorial-title">{analyze?.title ?? 'Work through one image'}</h2>
          <p className="editorial-lede">{analyze?.description}</p>

          <AnalyzePhotographForm
            arkId={photo.arkId}
            title={photo.title}
            prompts={analyze?.prompts ?? []}
          />
        </div>
      </section>
    </div>
  );
}
