import { FormType } from "../../types/types";

//--------------------GET---------------------
export const fetchForms = async (): Promise<FormType[]> => {
  const response = await fetch("http://localhost:5000/forms");
  if (!response.ok) {
    throw new Error(`データの取得に失敗しました：${await response.text()}`);
  }

  const data = await response.json();
  console.log("----------バックエンドからのUseeデータ---------------");
  console.log(data);
  return data;
};

//--------------------GET/id---------------------
export const fetchForm = async (id: number) => {
  const response = await fetch("http://localhost:5000/forms/${id}");
  console.log("----------バックエンドからのUseeデータ---------------");
  console.log(response);

  if (!response.ok) {
    throw new Error(`データの取得に失敗しました: ${await response.text()}`);
  }
  const IdData = await response.json();
  return IdData;
};

//--------------------PUT---------------------
export const updateForm = async (id: number, data: FormType) => {
  const response = await fetch(`http://localhost:5000/forms/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`データの更新に失敗しました:  ${await response.text()}`);
  }

  const renewalData = await response.json();
  return renewalData;
};

//--------------------POST---------------------
export const addForm = async (data: Omit<FormType, "id">) => {
  const response = await fetch(`http://localhost:5000/forms`, {
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

export const deleteForm = async (id: number) => {
  const response = await fetch(`http://localhost:5000/forms/id`, {
    method: `DELETE`,
  });

  if (!response.ok) {
    throw new Error(`削除に失敗しました`);
  }
};
