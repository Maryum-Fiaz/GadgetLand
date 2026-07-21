import { Footer, Header, ChatAssistant } from "./components";
import { Outlet } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "./components/index.js";

function RootLayout() {
  return (
    <HelmetProvider>
      <Toaster position="top-center" />
      <ScrollToTop />

      <Header />


        <Outlet />
        <ChatAssistant />


      <Footer />
    </HelmetProvider>
  );
}

export default RootLayout;
