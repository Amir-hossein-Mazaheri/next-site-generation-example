import MainLayout from "../../Layouts/MainLayout";
import Image from "next/image";
import Link from "next/link";
import Comments from "../../Components/Comments";

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

function EventSinglePage({ post }) {
  return (
    <MainLayout>
      <div className="w-full min-h-[90vh]">
        <div className="w-full">
          <Image
            layout="responsive"
            src={`/images/0${(post.id % 5) + 1}.jpg`}
            alt={post.title}
            width="100%"
            height={24}
            priority={true}
          />
        </div>

        <div className="rounded-lg mb-5 bg-white -translate-y-10 space-y-5 shadow-md shadow-blue-100/80 md:px-10 md:py-7 px-8 py-5 mx-auto w-[92%] md:w-4/5">
          <div className="font-black capitalize font-serif md:text-3xl text-xl text-gray-700">
            <h2>{post.title}</h2>
          </div>
          <div className="text-gray-600 md:text-lg text-base md:leading-loose leading-relaxed">
            <p>{[1, 2, 3, 4, 5, 6, , 7, 8, 9, 10].map(() => post.body)}</p>
          </div>
        </div>

        <div className="mx-auto w-[92%] md:w-4/5 mb-14">
          <Comments />
        </div>

        <div className="fixed bottom-5 right-5 text-sm md:text-base bg-pink-500 text-white rounded-full px-10 py-3">
          Author :{" "}
          <span className="font-semibold">
            <Link href={`/authors/a${post.userId}`}>
              {users[post.userId - 1]}
            </Link>
          </span>
        </div>
      </div>
    </MainLayout>
  );
}

async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return posts;
}

export async function getServerSideProps({ params }) {
  const postId = Number(params.pId.slice(1));
  const posts = await getPosts();

  const currentPost = posts.find((post) => post.id === postId);

  return {
    props: {
      post: currentPost,
    },
  };
}

export default EventSinglePage;
