import { QueryClient } from "@tanstack/react-query";
import "./App.css";
import Footer from "./components/Layouts/Footer/Footer";
import Header from "./components/Layouts/Header/Header";
import Maps from "./components/Maps/Maps";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

const fetchURL = import.meta.env.VITE_NASA_EONET_URL;
const controller = new AbortController();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 6, // 6 hours
      gcTime: 1000 * 60 * 60 * 6, // 6 hours
      retry: 3,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const App = () => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 6, // 6 hours
      }}
    >
      <Header title="Natural Event Tracker" />
      <Maps sourceObject={{ fetchURL, controller: controller.signal }} />
      <Footer url="https://github.com/vzan2012" username="vzan2012" />
    </PersistQueryClientProvider>
  );
};

export default App;
