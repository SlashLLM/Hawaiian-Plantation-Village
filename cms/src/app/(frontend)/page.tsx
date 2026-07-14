import React from 'react'

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Hawaiian Plantation Village CMS</h1>
      <p>
        This Next.js app hosts the Payload CMS admin panel and REST API for the HPV website.
      </p>
      <p>
        <a href="/admin">Open Admin Panel →</a>
      </p>
    </main>
  )
}
