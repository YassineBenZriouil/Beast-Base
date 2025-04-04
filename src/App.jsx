import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./static/Header";
import Home from "./components/Home";
import Footer from "./static/Footer";
import AnimalPage from "./components/ui/AnimalPage";
import "./index.css";
import About from "./components/About";
import Discover from "./components/Discover";
import Search from "./components/search";

function App() {
    return (
        <Router>
            <Header />
            <div className="overflow-y-scroll custom-scrollbar">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/animal/:id" element={<AnimalPage />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
