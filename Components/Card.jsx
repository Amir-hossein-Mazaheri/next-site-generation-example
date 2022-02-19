import Btn from "./Button";
import Link from "next/link";
import Image from "next/image";

const users = [
  "Amirhossein",
  "Mamad",
  "Hamed",
  "Alireza",
  "Asghari",
  "Akbari",
  "Amir",
  "Hossein",
  "Negin",
  "Ali",
];

function Card({ title, description, author, id, showImage = true }) {
  return (
    <div className="relative flex flex-col overflow-hidden bg-white rounded-lg shadow-md shadow-slate-200">
      {showImage && (
        <div>
          <Image
            layout="responsive"
            src={`/images/0${(id % 5) + 1}.jpg`}
            alt={title}
            width="100%"
            height="50"
          />
        </div>
      )}

      <div className="px-5 py-5 flex flex-col gap-5 h-full">
        <div>{title}</div>
        <div className="grow">{description}</div>
        <div className="flex justify-between">
          <Btn
            className="hover:bg-pink-500 hover:shadow-md hover:shadow-pink-300 transition-all duration-200"
            id={`go-to-event-${id}`}
          >
            <Link href={`/posts/p${id}`}>Go to Event</Link>
          </Btn>
          <Btn className="hover:-translate-y-2 hover:scale-105 transition-all duration-200">
            <Link href={`/authors/a${author}`}>{users[author - 1]}</Link>
          </Btn>
        </div>
      </div>
    </div>
  );
}

export default Card;
