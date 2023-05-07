import { User } from "./User";

export interface Post {
  img: string | File,
  content: string,
  user_id: User | string | null,
  createdAt: string
}