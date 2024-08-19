//all files code UTF-8!!!!
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
  <>
    <div>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
    </div>
  </>
  );
}

export default App;
