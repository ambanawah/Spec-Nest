import './globals.css';

export const metadata = {
  title: 'SpecNest | Precision Tech Editorial',
  description: 'Precision-engineered computer hardware curated for builders.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
        <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </head>
      <body>
        {children}
        </body>
    </html>
  );
}
