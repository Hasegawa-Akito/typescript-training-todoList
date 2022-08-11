import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import AddTodo from "./components/Todo/AddTodo";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<AddTodo />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
