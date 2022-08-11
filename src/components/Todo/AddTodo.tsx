import React, { createContext, useEffect, useRef, useState } from "react";
import ShowTodo from "./ShowTodo";

type Todo = {
  inputValue: string;
  id: number;
  checked: boolean;
};
// createContextの型宣言。setaStateと連携のために型を合わせる。
type todoContextType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};
export const todoContext = createContext<todoContextType>({
  // 初期値は適当に設定
  todos: [],
  setTodos: (todos) => {},
});

function AddTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  // 初期値のnullの後ろに「!」をつけて、null型ではないことを宣言
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

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
    <div>
      <h2>Todoリスト with Typescript</h2>
      <input type="text" ref={inputRef} className="inputText" />
      <input
        type="button"
        value="作成"
        className="submitButton"
        onClick={(e) => submitTodo()}
      />
      <todoContext.Provider value={{ todos, setTodos }}>
        <ShowTodo todos={todos} />
      </todoContext.Provider>
    </div>
  );
}

export default AddTodo;
