import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  // 初期値のnullの後ろに「!」をつけて、null型ではないことを宣言
  const inputRef = useRef<HTMLInputElement>(null!);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const submitTodo = () => {
    setTodos([
      ...todos,
      {
        inputValue: inputRef.current.value,
        id: todos.length,
        checked: false,
      },
    ]);

    // input内の初期化
    inputRef.current.value = "";
  };

  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        <input type="text" ref={inputRef} className="inputText" />
        <input
          type="button"
          value="作成"
          className="submitButton"
          onClick={(e) => submitTodo()}
        />
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.inputValue}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
