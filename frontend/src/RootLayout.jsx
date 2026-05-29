import { Footer, Header, Container } from './components'
import { Outlet } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';

function RootLayout() {
  return (
    <HelmetProvider>
    <Header />
    <Container>
        <Outlet />
    </Container>
    <Footer />
    </HelmetProvider>
  )
}

export default RootLayout