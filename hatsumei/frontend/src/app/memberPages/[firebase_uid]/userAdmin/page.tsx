"use client";

import React, { useState, useEffect } from "react";
import { deleteUser, updateProfile } from "firebase/auth";
import { auth } from "../../../../firebase";
import { UserType } from "../../../../types/types";
import { fetchUsersId, updateUser } from "../../../server/user";

const UserAdminPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const firebaseUid = auth.currentUser?.uid;
        if (firebaseUid) {
          const userData = await fetchUsersId(firebaseUid);
          setUsers([userData]); 
        } else {
          setError("ログインしていません。");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`ユーザーリストの取得に失敗しました: ${err.message}`);
        } else {
          setError("予期しないエラーが発生しました。");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (uid: string) => {
    if (window.confirm("このユーザーを削除しますか？")) {
      try {
        const user = auth.currentUser;
        if (user && user.uid === uid) {
          await deleteUser(user);
        } else {
          throw new Error("現在のユーザーのみ削除できます。");
        }
        setUsers(user.filter((user) => user.firebase_uid !== uid));
        alert("ユーザーを削除しました。");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`ユーザーの削除に失敗しました: ${err.message}`);
        } else {
          setError("ユーザーの削除に失敗しました。");
        }
      }
    }
  };

  const handleUpdateUser = async (updatedUser: UserType) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.uid === updatedUser.firebase_uid) {
        await updateProfile(currentUser, {
          displayName: updatedUser.email,
        });
      } else {
        throw new Error("現在のユーザーのみ更新できます。");
      }

      await updateUser(updatedUser);
      alert("ユーザー情報を更新しました。");

      // 更新後のデータを再取得
      const firebaseUid = auth.currentUser?.uid;
      if (firebaseUid) {
        const userData = await fetchUsersId(firebaseUid);
        setUsers([userData]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`ユーザー情報の更新に失敗しました: ${err.message}`);
      } else {
        setError("ユーザー情報の更新に失敗しました。");
      }
    }
  };

  if (loading) {
    return <p>ユーザーリストを読み込み中...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ユーザー管理</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.firebase_uid}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div>
              <input
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUsers((prev) =>
                    prev.map((u) =>
                      u.firebase_uid === user.firebase_uid
                        ? { ...u, email: e.target.value }
                        : u
                    )
                  )
                }
              />
            </div>
            <div>
              <button
                onClick={() => handleUpdateUser(user)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
              >
                更新
              </button>
              <button
                onClick={() => handleDeleteUser(user.firebase_uid)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAdminPage;
