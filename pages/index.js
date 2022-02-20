import Cards from "../Components/Cards";
import Newsletter from "../Components/Newsletter";
import MainLayout from "../Layouts/MainLayout";

const HomePage = ({ posts }) => {
  return (
    <MainLayout>
      <div className="md:px-16 md:py-10 px-5 py-7">
        <h2 className="font-bold text-2xl mb-8">Featured Posts</h2>
        <Cards data={posts} />
        {/* <Newsletter /> */}
      </div>
    </MainLayout>
  );
};

export default HomePage;

function removeDuplicateAuthors(array) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (!newArray.find((p) => p.userId === array[i].userId)) {
      newArray.push(array[i]);
    }
  }

  return newArray;
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  const noDuplicateAuthors = removeDuplicateAuthors(posts);

  return {
    props: {
      posts: noDuplicateAuthors,
    },
  };
}
