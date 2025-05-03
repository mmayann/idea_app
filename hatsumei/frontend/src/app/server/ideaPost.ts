import { IdeaPostType } from "../../types/types";

//--------------------GET---------------------
export const fetchIdeaPosts = async (): Promise<IdeaPostType[]> => {
  const response = await fetch("http://localhost:5000/idea_posts");
  if (!response.ok) {
    throw new Error(`データの取得に失敗しました：${await response.text()}`);
  }

  const data = await response.json();
  console.log("----------バックエンドからのUseeデータ---------------");
  console.log(data);
  return data;
};

//--------------------GET/id---------------------
export const fetchIdeaPostId = async (id: number) => {
  const response = await fetch("http://localhost:5000/idea_posts/${id}");
  console.log("----------バックエンドからのUseeデータ---------------");
  console.log(response);

  if (!response.ok) {
    throw new Error(`データの取得に失敗しました: ${await response.text()}`);
  }
  const IdData = await response.json();
  return IdData;
};

//--------------------PUT---------------------
export const updateIdeaPost = async (id: number, data: IdeaPostType) => {
  const response = await fetch(`http://localhost:5000/idea_posts/${id}`, {
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
export const addIdeaPost = async (data: Omit<IdeaPostType, "id">) => {
  const response = await fetch(`http://localhost:5000/idea_posts`, {
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

