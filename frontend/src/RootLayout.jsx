import { Footer, Header, Container } from './components'
import { Outlet } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from './components/index.js';

function RootLayout() {
  return (
    <HelmetProvider>
      <Toaster position='top-center' />
      <ScrollToTop />

    <Header />
    <Container>
        <Outlet />
    </Container>
    <Footer />
    </HelmetProvider>
  )
}

export default RootLayout