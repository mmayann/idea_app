const users = [
  {
    id: 1,
    email: "user1@example.com",
    firebase_uid: "1a2s3d1f4g5f1d5s1s515",
    first_name: "gouda",
    last_name: "takeshi",
    nickname: "ジャイアン",
  },
  {
    id: 2,
    email: "user2@example.com",
    firebase_uid: "hjkhjkhjkhjk131313",
    first_name: "花子",
    last_name: "佐藤",
    nickname: "はな",
  },
  {
    id: 3,
    email: "user3@example.com",
    firebase_uid: "jijijijiji56565656",
    first_name: "健一",
    last_name: "高橋",
    nickname: "けんけん",
  },
  {
    id: 4,
    email: "user4@example.com",
    firebase_uid: "kokokokok56565656",
    first_name: "美咲",
    last_name: "田中",
    nickname: "みさ",
  },
];

const idea_posts = [
  {
    id: "1",
    user_id: "1",
    title: "音声で買い物リストを作成",
    message: "音声で買い物リストを作成してくれるアプリが欲しいです。",
    date: "2025-03-18T10:00:00",
    main_category: "グッズ",
    sub_category: "アプリ",
  },
  {
    id: "2",
    user_id: "2",
    title: "ミニトマトを1個売り",
    message: "ミニトマトを1個から買えるようにしてほしい",
    date: "2025-03-18T11:00:00",
    main_category: "食",
    sub_category: "野菜",
  },
  {
    id: "3",
    user_id: "3",
    title: "ベビーフードの販売機",
    message: "ベビーフードの販売機が欲しいです。",
    date: "2025-03-18T12:00:00",
    main_category: "育児",
    sub_category: "食事",
  },
  {
    id: "4",
    user_id: "1",
    title: "子供用レンタサイクル",
    message: "子供を乗せられるレンタサイクルが欲しいです。",
    date: "2025-03-18T13:00:00",
    main_category: "育児",
    sub_category: "交通",
  },
  {
    id: "5",
    user_id: "1",
    title: "遮音性イヤホン",
    message:
      "遮音性って言っても遮音できないものが多いので室内用でいいから凄く遮音してくれるものが欲しい。",
    date: "2025-03-18T13:00:00",
    main_category: "育児",
    sub_category: "交通",
  },
  {
    id: "6",
    user_id: "2",
    title: "歌がうまくなるマイク",
    message: "---------------------",
    date: "2025-03-18T13:00:00",
    main_category: "育児",
    sub_category: "交通",
  },
  {
    id: "7",
    user_id: "3",
    title: "自動計算買い物かご",
    message: "---------------------",
    date: "2025-03-18T13:00:00",
    main_category: "育児",
    sub_category: "交通",
  },
  {
    id: "8",
    user_id: "1",
    title: "傷み具合判定機能",
    message: "------------------",
    date: "2025-03-18T13:00:00",
    main_category: "育児",
    sub_category: "交通",
  },
];

const metos = [
  { id: "1", user_id: "1", idea_post_id: "2" , firebase_uid: "121212121212212kokokokokokoko"},
  { id: "2", user_id: "2", idea_post_id: "3" },
  { id: "3", user_id: "3", idea_post_id: "4" },
  { id: "4", user_id: "1", idea_post_id: "1" , firebase_uid: "1a2s3d1f4g5f1d5s1s515},
];

const forms = [
  {
    id: 1,
    user_id: 1,
    title: "機能が使いにく",
    message: "もう少し読みやすいフォントにしてほしい",
    date: "2025-03-18T13:00:00",
  },
  {
    id: 2,
    user_id: 1,
    title: "ポイント還元がおそい",
    message: "1か月くらいでもらえませんか",
    date: "2025-03-18T13:00:00",
  },
  {
    id: 3,
    user_id: 1,
    title: "子供の意見",
    message: "大人だけでなく子供の意見もくみ取ってほしい",
    date: "2025-03-18T13:00:00",
  },
];

export { users, idea_posts, metos };
