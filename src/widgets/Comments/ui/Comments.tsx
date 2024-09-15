import Comment from "@/components/Comment/ui/Comment";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useEffect } from "react";
import { fetchComments } from "../api/fetchComments";
import InputComment from "@/components/InputComment/ui/InputComment";

const Comments = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comments.comments);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div className="comments">
      <InputComment />
      {comments.map((comment) => {
        return <Comment key={comment.id} {...comment} />;
      })}
    </div>
  );
};

export default Comments;
