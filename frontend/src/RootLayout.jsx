import { Footer, Header } from './components'
import { Outlet } from 'react-router';

function RootLayout() {
  return (
    <>
    <Header />
    <main className='container'>
    <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default RootLayout