import { useRouter } from "next/router";
import CommentInput from "./CommentInput";

function SendComment() {
  const route = useRouter();

  const handleSendComment = async (event) => {
    event.preventDefault();

    const author = event.target[1].value;
    const email = event.target[0].value;
    const content = event.target[2].value;

    const response = await fetch("/api/comments", {
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

    const data = await response.json();
    console.log(data);
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
          />
          <CommentInput
            label="Enter your name"
            name="comment-author"
            id="comment-author"
            placeholder="Name"
            className="grow"
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
