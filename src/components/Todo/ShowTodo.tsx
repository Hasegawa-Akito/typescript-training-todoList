import { useContext } from "react";
import { TodoContext } from "./AddTodo";
import { UserContext } from "../../App";
import { checkTodo, deleteTodo } from "../../lib/firestore/firestore";

type Todo = {
  inputValue: string;
  id: number;
  checked: boolean;
};
type Props = {
  todos: Todo[];
};

// propsの型宣言時は注意
function ShowTodo(props: Props) {
  const { todos, setTodos } = useContext(TodoContext);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleChecked = (id: number, checked: boolean) => {
    checkTodo(userInfo.uid, id, !checked)
      .then(() => {
        setTodos(
          // mapでidの一致するとき更新。オブジェクトのcheckedのみ更新
          todos.map((todo) =>
            todo.id === id ? { ...todo, checked: !checked } : todo
          )
        );
      })
      .catch((e) => {
        alert("変更できませんでした。");
      });
  };

  const handleDelete = (id: number) => {
    deleteTodo(userInfo.uid, id)
      .then(() => {
        setTodos(
          // filterでidが一致位するもののみ除外
          todos.filter((todo) => todo.id !== id)
        );
      })
      .catch((e) => {
        alert("除去できませんでした");
      });
  };

  return (
    <ul className="todoList">
      {props.todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() => handleChecked(todo.id, todo.checked)}
          />
          <div className="todoValue">{todo.inputValue}</div>
          <button onClick={() => handleDelete(todo.id)}>消</button>
        </li>
      ))}
    </ul>
  );
}

export default ShowTodo;
