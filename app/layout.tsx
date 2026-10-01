import './globals.css';
import type { Metadata } from 'next';
import { Source_Serif_4, IBM_Plex_Sans } from 'next/font/google';

const serif = Source_Serif_4({ subsets: ['latin'], variable: '--font-serif' });
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Glycemic Treatment Navigator | ADA Standards of Care 2026, Section 9',
  description: 'Clinician decision support and learning module for pharmacologic glycemic treatment, based on ADA Standards of Care in Diabetes 2026, Section 9.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
