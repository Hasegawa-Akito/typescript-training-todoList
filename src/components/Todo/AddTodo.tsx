import { useContext, createContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../App";
import { getTodos, addTodo } from "../../lib/firestore/firestore";
import ShowTodo from "./ShowTodo";
import "../../assets/css/Todo.css";

type Todo = {
  inputValue: string;
  id: number;
  checked: boolean;
};
// createContextの型宣言。setaStateと連携のために型を合わせる。
type TodoContextType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};
export const TodoContext = createContext<TodoContextType>({
  // 初期値は適当に設定
  todos: [],
  setTodos: (todos) => {},
});

function AddTodo() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  // 初期値のnullの後ろに「!」をつけて、null型ではないことを宣言
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    // データをfirestoreから取得
    const getDB = async () => {
      try {
        const todos_db = await getTodos(userInfo.uid);
        setTodos(todos_db);
      } catch (e) {
        alert("データが取得できませんでした");
      }
    };

    getDB();
  }, []);

  const submitTodo = () => {
    // 配列の中が空ならidは0、そうでないなら最後の次のidを設定
    const lastId = todos.length === 0 ? 0 : todos[todos.length - 1].id + 1;

    const addValues = {
      inputValue: inputRef.current.value,
      id: lastId,
      checked: false,
    };

    addTodo(userInfo.uid, addValues) // firestoreに追加
      .then(() => {
        setTodos([...todos, addValues]); // stateにセット
        inputRef.current.value = ""; // input内の初期化
      })
      .catch((e) => {
        console.log(e);
        alert("追加できませんでした");
      });
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
      <TodoContext.Provider value={{ todos, setTodos }}>
        <ShowTodo todos={todos} />
      </TodoContext.Provider>
    </div>
  );
}

export default AddTodo;
