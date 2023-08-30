import "./App.css";
import Footer from "./components/Layouts/Footer/Footer";
import Header from "./components/Layouts/Header/Header";
import Maps from "./components/Maps/Maps";

function App() {
  const controller = new AbortController();
  return (
    <>
      <Header title="Natural Event Tracker" />
      <Maps />
      <Footer url="https://github.com/vzan2012" username="vzan2012" />
    </>
  );
}

export default App;
