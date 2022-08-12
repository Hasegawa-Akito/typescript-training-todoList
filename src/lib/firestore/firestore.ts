import {
  query,
  where,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { db } from "../../firebase";

type Todo = {
  inputValue: string;
  id: number;
  checked: boolean;
};

// todoデータを取得
export const getTodos = async (uid: string): Promise<Todo[]> => {
  // async関数では戻り値をPromise<>で設定
  const q = query(collection(db, "todoList"), where("uid", "==", uid));
  const docSnap = await getDocs(q);
  const todoDatas: Todo[] = [];

  docSnap.forEach((doc) => {
    const todoData: Todo = {
      inputValue: doc.data().todo,
      id: doc.data().id,
      checked: doc.data().checked,
    };
    todoDatas.push(todoData);
  });
  return todoDatas;
};

export const addTodo = async (uid: string, addValues: Todo): Promise<void> => {
  // async関数では戻り値をPromise<>で設定
  await addDoc(collection(db, "todoList"), {
    uid: uid,
    todo: addValues.inputValue,
    id: addValues.id,
  });
};
