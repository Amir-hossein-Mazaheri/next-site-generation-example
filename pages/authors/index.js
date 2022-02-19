import MainLayout from "../../Layouts/MainLayout";
import Link from "next/link";

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

function AuthorsPage({ authors }) {
  return (
    <MainLayout>
      <h2 className="text-2xl font-black text-gray-700 mt-5 ml-12 mb-0 capitalize">
        all of our authors :
      </h2>
      <div className="md:grid grid-cols-5 space-y-5 md:px-10 px-5 py-7 text-center gap-5">
        {authors.map((author, index) => (
          <Link key={author} href={`/authors/a${index + 1}`} passHref>
            <div className="px-5 py-3 cursor-pointer bg-white shadow-md rounded-full text-lg font-semibold text-gray-500 hover:text-white hover:bg-blue-600 hover:shadow-blue-300 transition-colors duration-200">
              {author}
            </div>
          </Link>
        ))}
      </div>
    </MainLayout>
  );
}

export default AuthorsPage;

function removeDuplicate(array) {
  const noDuplicateArray = [];
  for (let i = 0; i < array.length; i++) {
    if (!noDuplicateArray.includes(array[i])) {
      noDuplicateArray.push(array[i]);
    }
  }
  return noDuplicateArray;
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  const authors = removeDuplicate(posts.map((post) => users[post.userId - 1]));

  return {
    props: {
      authors,
    },
    revalidate: 60 * 60 * 2 // regenerates every 2 hours
  };
}
