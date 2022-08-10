type Todo = {
  inputValue: string;
  id: number;
  checked: boolean;
};
type Props = {
  todos: Todo[];
};
// propsの方宣言時は注意
function ShowTodo(props: Props) {
  return (
    <ul>
      {props.todos.map((todo) => (
        <li key={todo.id}>{todo.inputValue}</li>
      ))}
    </ul>
  );
}

export default ShowTodo;
