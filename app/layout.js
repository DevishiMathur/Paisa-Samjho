import "./globals.css";

export const metadata = {
  title: "Paisa Samjho — Learn Money by Living It",
  description: "Voice-first, interactive financial learning for India."
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}