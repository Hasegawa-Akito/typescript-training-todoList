import { useContext } from "react";
import { todoContext } from "./AddTodo";

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
  const { todos, setTodos } = useContext(todoContext);
  const handleChecked = (id: number, checked: boolean) => {
    setTodos(
      // mapでidの一致するとき更新。オブジェクトのcheckedのみ更新
      todos.map((todo) => (todo.id === id ? { ...todo, checked: true } : todo))
    );
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
        </li>
      ))}
    </ul>
  );
}

export default ShowTodo;
