import { MetoType } from "../../types/types";

//--------------------GET---------------------
export const fetchMetos = async (): Promise<MetoType[]> => {
  const response = await fetch("http://localhost:5000/metos");
  if (!response.ok) {
    throw new Error(`データの取得に失敗しました：${await response.text()}`);
  }

  const data = await response.json();
  console.log("----------バックエンドからのUseeデータ---------------");
  console.log(data);
  return data;
};

//--------------------GET/id---------------------
export const fetchMetoId = async (id: number) => {
  const response = await fetch("http://localhost:5000/metos/${id}");
  console.log("----------バックエンドからのUseeデータ---------------");
  console.log(response);

  if (!response.ok) {
    throw new Error(`データの取得に失敗しました: ${await response.text()}`);
  }
  const IdData = await response.json();
  return IdData;
};

//--------------------PUT---------------------
export const updateMeto = async (id: number, data: MetoType) => {
  const response = await fetch(`http://localhost:5000/metos/${id}`, {
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
export const addMeto = async (data: Omit<MetoType, "id">) => {
  const response = await fetch(`http://localhost:5000/metos`, {
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

export const deleteMeto = async (id: number) => {
  const response = await fetch(`http://localhost:5000/metos/id`, {
    method: `DELETE`,
  });

  if (!response.ok) {
    throw new Error(`削除に失敗しました`);
  }
};
