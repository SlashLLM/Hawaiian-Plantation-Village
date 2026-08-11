import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, image = '/og-image.png' }) {
  let pathname = '';
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();
    pathname = location?.pathname || '';
  } catch {
    pathname = '';
  }
  const siteTitle = "Hawaii's Plantation Village";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const canonicalUrl = `https://www.hawaiiplantationvillage.org${pathname}`;
  
  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
    </>
  );
}
