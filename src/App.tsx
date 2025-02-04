import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Landing from "components/Landing";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            // Navigate home page to '/scheduler' per wireframes
            <Navigate to="/scheduler" replace />
          } />
          <Route path="/scheduler" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
