import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
