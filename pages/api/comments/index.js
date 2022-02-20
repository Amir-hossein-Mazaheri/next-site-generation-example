import path from "path";
import fs from "fs";

function generateId() {
  return new Date().toLocaleString();
}

function addCommentToFile(
  filePath,
  commentAuthor,
  commentContent,
  commentEmail,
  postId
) {
  const file = fs.readFileSync(filePath);
  const data = JSON.parse(file);
  if (!data[postId]) {
    data[postId] = [];
  }
  let postComments = data[postId];
  const commentObject = {
    id: generateId(),
    "comment-author": commentAuthor,
    "comment-content": commentContent,
    "comment-email": commentEmail,
  };
  postComments.push(commentObject);
  fs.writeFileSync(filePath, JSON.stringify(data));
}

function handleComments(req, res) {
  if (req.method === "POST") {
    const filePath = path.join(process.cwd(), "data", "comments.json");
    const postId = req.body.postId;
    const author = req.body.author;
    const content = req.body.content;
    const email = req.body.email;
    if (postId && author && content && email) {
      addCommentToFile(filePath, author, content, email, postId);
      res.status(201).json({ status: 201, message: "comment added" });
    } else {
      res.status(406).json({ status: 405, message: "invalid inputs" });
    }
  } else {
    res.status(405).json({ status: 406, message: "wrong method request" });
  }
}

export default handleComments;
