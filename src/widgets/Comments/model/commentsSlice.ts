import { createSlice } from "@reduxjs/toolkit";
import { fetchComments } from "../api/fetchComments";
import { CommentType } from "@/shared/@types/CommentType";
import { Status } from "@/shared/@types/Status";
import { v4 as uuid } from "uuid";
import avatar from "@/shared/assets/avatar.jpg";

const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];
const date = new Date();

interface CommentsState {
  comments: CommentType[];
  status: Status;
}

const initialState: CommentsState = {
  comments: [],
  status: Status.LOADING,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      let parentComment;
      if (action.payload.repliedText) {
        parentComment = {
          id: action.payload.id,
          text: action.payload.repliedText,
          author: {
            id: action.payload.author.id,
            nick: action.payload.author.nick,
            picture: {
              url: action.payload.author.picture.url,
            },
          },
        };
      }
      const newComment = {
        id: uuid(),
        text: action.payload.value,
        published: {
          bunin: `${date.getDate()} ${months[date.getMonth()]}, ${String(
            date.getHours()
          ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`,
        },
        rating: {
          plus: 0,
          minus: 0,
        },
        author: {
          picture: {
            url: avatar,
          },
          nick: "Nikita",
          id: uuid(),
        },
        parentComment,
      };
      state.comments.unshift(newComment);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export const { addComment } = commentsSlice.actions;

export default commentsSlice.reducer;
