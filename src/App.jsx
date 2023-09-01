import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Footer from "./components/Layouts/Footer/Footer";
import Header from "./components/Layouts/Header/Header";
import Maps from "./components/Maps/Maps";

const fetchURL = import.meta.env.VITE_NASA_EONET_URL;
const controller = new AbortController();

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header title="Natural Event Tracker" />
      <Maps sourceObject={{ fetchURL, controller: controller.signal }} />
      <Footer url="https://github.com/vzan2012" username="vzan2012" />
    </QueryClientProvider>
  );
};

export default App;
