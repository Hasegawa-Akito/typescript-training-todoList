import {
  query,
  where,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
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

// todo追加用
export const addTodo = async (uid: string, addValues: Todo): Promise<void> => {
  await addDoc(collection(db, "todoList"), {
    uid: uid,
    todo: addValues.inputValue,
    id: addValues.id,
    checked: addValues.checked,
  });
};

// todoにチェック入れる用
export const checkTodo = async (
  uid: string,
  id: Number,
  checked: boolean
): Promise<void> => {
  const q = query(
    collection(db, "todoList"),
    where("uid", "==", uid),
    where("id", "==", id)
  );

  // whereの条件に合うドキュメントのIDを取得
  const docSnap = await getDocs(q);

  await setDoc(
    doc(db, "todoList", docSnap.docs[0].id),
    {
      checked: checked,
    },
    { merge: true } // merge: trueで一部のみ更新
  );
};

// todo削除用
export const deleteTodo = async (uid: string, id: Number): Promise<void> => {
  const q = query(
    collection(db, "todoList"),
    where("uid", "==", uid),
    where("id", "==", id)
  );

  // whereの条件に合うドキュメントのIDを取得
  const docSnap = await getDocs(q);
  await deleteDoc(doc(db, "todoList", docSnap.docs[0].id));
};
