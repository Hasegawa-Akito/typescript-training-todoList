import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import "./App.css";
import AddTodo from "./components/Todo/AddTodo";
import Login from "./components/Login/Login";
type UserInfoType = {
  userName: string;
  uid: string;
  login: boolean;
};
type UserContextType = {
  userInfo: UserInfoType;
  setUserInfo: (userInfo: UserInfoType) => void;
};

export const UserContext = createContext<UserContextType>({
  userInfo: {
    userName: "",
    uid: "",
    login: false,
  },
  setUserInfo: (userInfo) => {},
});

function App() {
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    userName: "",
    uid: "",
    login: false,
  });

  const contextValue = { userInfo, setUserInfo };

  return (
    <div className="App">
      <UserContext.Provider value={contextValue}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/todo" element={<AddTodo />}></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
