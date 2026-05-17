import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

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
