import fs from "fs";
import path from "path";

function getPostComments(filePath, pId) {
  const file = fs.readFileSync(filePath);
  const data = JSON.parse(file);
  const postComments = data[pId];

  return postComments;
}

function handleShowComment(req, res) {
  if (req.method === "GET") {
    const { cId } = req.query;
    const filePath = path.join(process.cwd(), "data", "comments.json");
    const comments = getPostComments(filePath, cId);
    res.status(200).json({
      status: 200,
      message: "comments fetched",
      comments: comments,
    });
  } else {
    res.status(405).json({ status: 405, message: "wrong method request" });
  }
}

export default handleShowComment;
