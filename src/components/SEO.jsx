import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, image = '/og-image.png' }) {
  const location = useLocation();
  const siteTitle = "Hawaii's Plantation Village";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const canonicalUrl = `https://www.hawaiiplantationvillage.org${location.pathname}`;
  
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
