# **データベース設計書 - hatsumei**



## **1. テーブル一覧**
- User
- Idea_post
- Meto
- Form


### **2.1 user（ユーザー情報）**
**目的**: アプリユーザーの基本情報を管理  
**主キー**: `id`  

| カラム名      | データ型          | 説明                   |
|-------------|---------------|------------------------|
| id          | INT           | 主キー                 |
| email       | VARCHAR(255)  | ユーザーのメールアドレス   |
| firebase_uid| VARCHAR(255)  | Firebase認証用UID   　　|
| first_name  | VARCHAR(100)  | ユーザー名（氏）      |
| last_name   | VARCHAR(100)  | ユーザー名 (名)            |

---

### **2.2 Idea_post（投稿管理）**
**目的**: 投稿管理  
**主キー**: `id`  
**外部キー**: `user_id` → user(id)  

| カラム名      | データ型          | 説明                   |
|-------------|---------------|------------------------|
| id          | INT           | 主キー                 |
| user_id     | INT           | ユーザーID（外部キー）   |
| title       | VARCHAR(255)  | タイトル     |
| massage　   | VARCHAR(255)  | 内容               |
| date 　　　 | DATETIME      | 更新日時               |
| main_category  | VARCHAR(255)| カテゴリー（大）       |
| sub_category  | VARCHAR(255) | カテゴリー（小）       |

---

### **2.3 Meto（お気に入り機能）**
**目的**: ユーザーのお気に入り管理  
**主キー**: `id`  
**外部キー**: `user_id` → user(id)  、`Idea_post_id` →　Idea_post(id)

| カラム名      | データ型          | 説明                   |
|-------------|---------------|------------------------|
| id          | INT           | 主キー                 |
| user_id     | INT           | ユーザーID（外部キー）   |
| Idea_post_id| INT　　　      |  Idea_post_id （外部キー）  |

---

### **2.4 Form（日記録）**
**目的**: お問い合わせフォーム 
**主キー**: `id`  
**外部キー**: `user_id` → user(id)  

| カラム名      | データ型          | 説明                   |
|-------------|---------------|------------------------|
| id          | INT           | 主キー                 |
| user_id     | INT           | ユーザーID（外部キー）   |
| date  | DATE          |              |
| text  |  VARCHAR(255)      | 問い合わせ内容              |
| title  |  VARCHAR(255)      | 問い合わせ題名            |

---


**備考:**  
- `user_id`はNOT NULL  


---

## **3. リレーション**
- **user** は他の全テーブルに関連。  
- **Meto** は **Idea_post**に依存。  

---
