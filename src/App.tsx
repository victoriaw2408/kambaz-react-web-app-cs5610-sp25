import Labs from "./Labs";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
function App() {
  return (
    <h1>
      Welcome to Web Dev!
    </h1>
    // <HashRouter>
    //   <div>
    //     <Routes>
    //     <Route path="/" element={<Navigate to="Labs" />} />
    //       <Route path="/Labs/*" element={<Labs />} />
    //     </Routes>
    //   </div>
    // </HashRouter>
  );
}

export default App
