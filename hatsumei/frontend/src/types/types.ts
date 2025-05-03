export type UserType = {
  id: string;
  email: string;
  firebase_uid: string;
  first_name: string;
  last_name: string;
};

export type IdeaPostType = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  date: string;
  main_category: string;
  sub_category: string;
};

export type FormType = {
  id: string;
  user_id: string;
  date: string;
  message: string;
  title: string;
};

export type MetoType = {
  id: string;
  user_id: string;
  idea_post_id: string;
  firebase_uid: string;
};
export interface SearchResults {
  id: string; 
  title:string;
  text:string;
}