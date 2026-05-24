import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Orbitron, Cinzel } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Sanyam Sachan — Software Engineer · AI Builder · Full Stack Developer',
  description:
    'Portfolio of Sanyam Sachan — Software Engineer, AI Systems Builder, and Full Stack Developer. Crafting Digital Realities Across the Multiverse.',
  authors: [{ name: 'Sanyam Sachan' }],
  keywords: ['Sanyam Sachan', 'Software Engineer', 'AI Builder', 'Full Stack Developer', 'Portfolio'],
};

export const viewport = { themeColor: '#f97316' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${orbitron.variable} ${cinzel.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}