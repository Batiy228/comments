import { Author } from "./Author";
import { ParentCommentType } from "./ParentCommentType";

export type CommentType = {
  id: string;
  text: string;
  published: {
    bunin: string;
  };
  rating: {
    plus: number;
    minus: number;
  };
  author: Author;
  parentComment?: ParentCommentType;
};
