import {
  query,
  where,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { db } from "../../firebase";

type Todo = {
  inputValue: string;
  id: number;
  checked: boolean;
};

// async関数では戻り値をPromise<>で設定
export const getTodos = async (uid: string): Promise<Todo[]> => {
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
