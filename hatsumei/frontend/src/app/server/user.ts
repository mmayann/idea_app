import { UserType } from "../../types/types";

//--------------------GET---------------------
export const fetchUsers = async (): Promise<UserType[]> => {
  const response = await fetch("http://localhost:5000/users");
  if (!response.ok) {
    throw new Error(`データの取得に失敗しました：${await response.text()}`);
  }

  const data = await response.json();
  console.log("----------バックエンドからのUseeデータ---------------");
  console.log(data);
  return data;
};

export const fetchUsersId = async (firebaseUid: string) => {
  const response = await fetch(`http://localhost:5000/users/${firebaseUid}`);
  if (!response.ok) {
    throw new Error(`データの取得に失敗しました: ${await response.text()}`);
  }
  return await response.json();
};

export const updateUser = async (user: UserType) => {
    const response = await fetch("http://localhost:5000/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(`データの更新に失敗しました: ${await response.text()}`);
    }
    return await response.json();
  };

  
//--------------------POST---------------------
export const addUser = async (data: Omit<UserType, "id">) => {
  const response = await fetch(`http://localhost:5000/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`データの登録に失敗しました: ${response.statusText}`);
  }

  const newData = await response.json();

  return newData;
};

//--------------------DELETE---------------------

export const deleteUser = async (id: number) => {
  const response = await fetch(`http://localhost:5000/users/id`, {
    method: `DELETE`,
  });

  if (!response.ok) {
    throw new Error(`削除に失敗しました`);
  }
};
