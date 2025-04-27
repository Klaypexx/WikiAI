//all files code UTF-8!!!!
import "./App.css"
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./components/AuthContext/AuthContext"; // Импортируем AuthProvider

function App() {
  return (
  <AuthProvider> {/* Обернули приложение в AuthProvider */}
    <div className="hm">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  </AuthProvider>
  );
}

export default App;
