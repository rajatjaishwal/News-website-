import { useState, useEffect } from "react";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import TopHeadlines from "./components/TopHeadlines";
import CountryNews from "./components/CountryNews";
import SearchNews from "./components/SearchNews";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState("dark-theme");

  useEffect(() => {
    // Apply theme class to document body for global generic styles if needed
    document.documentElement.className = theme === "dark-theme" ? "dark" : "";
  }, [theme]);

  // Define themes
  const bgClasses = theme === "dark-theme" 
    ? "bg-[radial-gradient(circle_at_top_left,_#1e1b4b_0%,_#0f172a_35%,_#31104e_65%,_#020617_100%)] text-white" 
    : "bg-slate-50 text-slate-900";

  const overlayClasses = theme === "dark-theme"
    ? "bg-black/20 backdrop-blur-[2px]"
    : "bg-white/50 backdrop-blur-sm";

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors ${bgClasses}`}>
        <div className={`min-h-screen ${overlayClasses}`}>
          <Header theme={theme} setTheme={setTheme} />

          <main className="min-h-[calc(100vh-140px)]">
            <Routes>
              <Route path="/" element={<AllNews theme={theme} />} />
              <Route path="/top-headlines/:category" element={<TopHeadlines theme={theme} />} />
              <Route path="/country/:iso" element={<CountryNews theme={theme} />} />
              <Route path="/search/:query" element={<SearchNews theme={theme} />} />
            </Routes>
          </main>

          <Footer theme={theme} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;