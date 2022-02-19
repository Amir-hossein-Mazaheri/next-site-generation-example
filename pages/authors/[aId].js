import Cards from "../../Components/Cards";
import MainLayout from "../../Layouts/MainLayout";

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

function AuthorSinglePage({ authorPosts: posts, authorId: id }) {
  return (
    <MainLayout>
      <div className="md:px-16 md:py-10 px-5 py-7">
        <h2 className="md:text-2xl text-lg mb-8 ml-3 font-black text-gray-700 capitalize">
          all of {users[id - 1]} posts so far!
        </h2>
        <Cards data={posts} />
      </div>
    </MainLayout>
  );
}

export default AuthorSinglePage;

export async function getServerSideProps({ params }) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  const authorId = Number(params.aId.slice(1));

  const authorPosts = posts.filter((post) => post.userId === authorId);

  return {
    props: {
      authorPosts,
      authorId,
    },
  };
}
