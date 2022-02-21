import { useRouter } from "next/router";
import { useRef } from "react";
import CommentInput from "./CommentInput";

function SendComment() {
  const route = useRouter();

  const authorInput = useRef(null);
  const emailInput = useRef(null);
  const contentInput = useRef(null);

  const handleSendComment = async (event) => {
    event.preventDefault();

    const author = authorInput.current.value;
    const email = emailInput.current.value;
    const content = contentInput.current.value;

    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        author,
        email,
        content,
        postId: route.query.pId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    authorInput.current.value = "";
    emailInput.current.value = "";
    contentInput.current.value = "";
  };

  return (
    <div className="px-10 py-5 bg-white rounded-lg shadow-xl shadow-gray-200">
      <form onSubmit={handleSendComment} action="">
        <div className="flex gap-5">
          <CommentInput
            label="Enter your email"
            name="comment-email"
            id="comment-email"
            placeholder="Email"
            className="grow"
            inputRef={emailInput}
          />
          <CommentInput
            label="Enter your name"
            name="comment-author"
            id="comment-author"
            placeholder="Name"
            className="grow"
            inputRef={authorInput}
          />
        </div>
        <div>
          <CommentInput
            type="textarea"
            label="Content"
            name="comment-content"
            id="comment-content"
            placeholder="Enter..."
            className="mt-5"
            inputRef={contentInput}
          />
        </div>
        <div>
          <button
            className="px-5 py-2 text-white font-medium rounded-full bg-sky-600 block ml-auto mt-5"
            type="submit"
          >
            Send Comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default SendComment;
