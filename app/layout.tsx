export const metadata = {
  title: "Nova Growth | Global SEO & Digital Marketing Agency",
  description: "Scale your organic traffic, high-intent leads, and revenue with custom SEO, web development, content marketing, and link building.",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="eeg9kD9YKpMbiK9peLhAiYLzjjS7nDfw3sonfKdFrrU"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}