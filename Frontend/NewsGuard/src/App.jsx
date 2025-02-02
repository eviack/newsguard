import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import CheckNews from "./pages/CheckNews";
import Root from "./components/Root";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Root />}>
          <Route path="/home" element={<Home />} />
          <Route path="/check-news" element={<CheckNews />} />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
