import React from 'react'

export const metadata = {
  title: 'HPV CMS',
  description: 'Hawaiian Plantation Village content management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
