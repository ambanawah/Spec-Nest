import './globals.css';

export const metadata = {
  title: 'SpecNest | Precision Tech Editorial',
  description: 'Precision-engineered computer hardware curated for builders.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
