import { Footer, Header, Container } from './components'
import { Outlet } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "react-hot-toast";

function RootLayout() {
  return (
    <HelmetProvider>
      <Toaster position='top-center' />

    <Header />
    <Container>
        <Outlet />
    </Container>
    <Footer />
    </HelmetProvider>
  )
}

export default RootLayout