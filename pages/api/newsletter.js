import path from "path";
import fs from "fs";

function isDuplicateEmail(array, email) {
  return Boolean(array.find((e) => e.email === email));
}

function generateId() {
  return new Date().toLocaleString();
}

function addEmailToFile(filePath, email) {
  const file = fs.readFileSync(filePath);
  const data = JSON.parse(file);
  const emailObject = {
    id: generateId(),
    email,
  };
  if (!isDuplicateEmail(data, email)) {
    data.push(emailObject);
  } else {
    return false;
  }
  fs.writeFileSync(filePath, JSON.stringify(data));
  return true;
}

function handleNewsletterSubmit(req, res) {
  if (req.method === "POST") {
    const filePath = path.join(process.cwd(), "data", "newsletter.json");
    const email = req.body.email;
    const status = addEmailToFile(filePath, email);
    if (status) {
      res.status(201).json({ status: 201, message: "email has been added 😊" });
    } else {
      res.status(406).json({ status: 406, message: "duplicate email 😢" });
    }
  } else {
    res.status(405).json({ status: 405, error: "wrong request method 😭" });
  }
}

export default handleNewsletterSubmit;
