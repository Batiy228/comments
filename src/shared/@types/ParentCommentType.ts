export type ParentCommentType = {
  id: string;
  text: string;
  author: {
    id: string;
    nick: string;
    picture: {
      url: string;
    };
  };
};
