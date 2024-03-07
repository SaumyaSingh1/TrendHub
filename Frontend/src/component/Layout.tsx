import NavBar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode; // Define children prop
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
