import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./modules/framework-exercise/views/List";
import SinglePokemon from "./modules/framework-exercise/views/SinglePokemon";
import Navbar from "./components/Navbar";
import Instructions from "./modules/Instructions";
import Response from "./modules/logical-exercise/views/Response";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/logical-exercise" element={<Response />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/pokemon/:id" element={<SinglePokemon />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
