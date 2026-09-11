import React from 'react';
import PageHeaderParallax from '../PageHeaderParallax.jsx';
import LearnMoreLink from '../LearnMoreLink.jsx';
import { backgroundClass, toVideoEmbedUrl } from '../../lib/content/pageBlocks.js';
import { blockStyles as s } from './blockStyles.js';

function Section({ block, children }) {
  return (
    <section className={backgroundClass(block.background)}>
      <div className="editorial-shell">{children}</div>
    </section>
  );
}

function Paragraphs({ items }) {
  return (items ?? [])
    .filter((p) => typeof p === 'string' && p.trim())
    .map((paragraph, index) => (
      <p key={index} style={s.body}>{paragraph}</p>
    ));
}

function HeroBlock({ block }) {
  return (
    <PageHeaderParallax
      image={block.image}
      stamp={block.stamp}
      title={block.title}
      subtitle={block.subtitle}
    />
  );
}

function RichTextBlock({ block }) {
  return (
    <Section block={block}>
      {block.eyebrow && <p className="editorial-eyebrow">{block.eyebrow}</p>}
      {block.title && <h2 className="editorial-title">{block.title}</h2>}
      <Paragraphs items={block.paragraphs} />
    </Section>
  );
}

function TwoColumnBlock({ block }) {
  const picture = block.image ? (
    <img src={block.image} alt={block.imageAlt ?? ''} style={s.plate} loading="lazy" />
  ) : null;
  const copy = (
    <div>
      {block.eyebrow && <p className="editorial-eyebrow">{block.eyebrow}</p>}
      {block.title && <h2 className="editorial-title">{block.title}</h2>}
      <Paragraphs items={block.paragraphs} />
    </div>
  );

  return (
    <Section block={block}>
      <div style={s.split}>
        {block.imageSide === 'right' ? (
          <>{copy}{picture}</>
        ) : (
          <>{picture}{copy}</>
        )}
      </div>
    </Section>
  );
}

function ImageBlock({ block }) {
  if (!block.image) return null;
  return (
    <Section block={block}>
      <figure style={{ margin: 0 }}>
        <img src={block.image} alt={block.imageAlt ?? ''} style={s.naturalImage} loading="lazy" />
        {block.caption && (
          <figcaption style={{ ...s.caption, textAlign: 'center' }}>{block.caption}</figcaption>
        )}
      </figure>
    </Section>
  );
}

function GalleryBlock({ block }) {
  const items = (block.items ?? []).filter((item) => item?.image);
  if (items.length === 0) return null;
  return (
    <Section block={block}>
      {block.title && <h2 className="editorial-title">{block.title}</h2>}
      <div className="archive-grid">
        {items.map((item, index) => (
          <figure key={index} style={{ margin: 0 }}>
            <div className="archive-figure">
              <img src={item.image} alt={item.imageAlt ?? ''} loading="lazy" />
            </div>
            {item.caption && <figcaption style={s.caption}>{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </Section>
  );
}

function DetailsBlock({ block }) {
  const items = (block.items ?? []).filter((item) => item?.label || item?.value);
  if (items.length === 0) return null;
  return (
    <Section block={block}>
      {block.title && <h2 className="editorial-title">{block.title}</h2>}
      <div className="paper-card" style={s.detailsCard}>
        {items.map((item, index) => (
          <div
            key={index}
            style={index === items.length - 1 ? { ...s.detailRow, borderBottom: 'none' } : s.detailRow}
          >
            <span style={s.detailLabel}>{item.label}</span>
            <span style={s.detailValue}>{item.value}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function QuoteBlock({ block }) {
  if (!block.quote) return null;
  return (
    <Section block={block}>
      <blockquote style={{ margin: 0 }}>
        <p style={s.quote}>{block.quote}</p>
        {block.attribution && <footer style={s.attribution}>{block.attribution}</footer>}
      </blockquote>
    </Section>
  );
}

function CtaBlock({ block }) {
  return (
    <Section block={block}>
      {block.title && <h2 className="editorial-title">{block.title}</h2>}
      {block.description && <p className="editorial-lede">{block.description}</p>}
      <div style={s.actions}>
        <LearnMoreLink
          link={block.link}
          className="btn-primary"
          style={{ marginTop: 0 }}
          iconSize={16}
        />
      </div>
    </Section>
  );
}

function VideoBlock({ block }) {
  const embedUrl = toVideoEmbedUrl(block.url);
  if (!embedUrl) return null;
  return (
    <Section block={block}>
      {block.title && <h2 className="editorial-title">{block.title}</h2>}
      <div style={s.videoFrame}>
        <iframe
          src={embedUrl}
          title={block.title || 'Video'}
          style={{ width: '100%', height: '100%', border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Section>
  );
}

const BLOCK_COMPONENTS = {
  hero: HeroBlock,
  richText: RichTextBlock,
  twoColumn: TwoColumnBlock,
  image: ImageBlock,
  gallery: GalleryBlock,
  details: DetailsBlock,
  quote: QuoteBlock,
  cta: CtaBlock,
  video: VideoBlock,
};

/** Renders one block. Unknown types render nothing, so old pages stay safe. */
export function Block({ block }) {
  const Component = BLOCK_COMPONENTS[block?.type];
  if (!Component) return null;
  return <Component block={block} />;
}

/** Renders an ordered list of blocks as a page body. */
export default function BlockRenderer({ blocks = [] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <Block key={block?.id ?? index} block={block} />
      ))}
    </>
  );
}
