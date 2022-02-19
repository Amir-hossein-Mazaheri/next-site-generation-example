import { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import useSWR from "swr";
import Cards from "../../Components/Cards";

function PostsMainPage({ posts: initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    return res.json();
  };

  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return;

        // Only retry up to 10 times.
        if (retryCount >= 10) return;

        // Retry after 500 milliseconds.
        setTimeout(() => revalidate({ retryCount }), 500);
      },
    }
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  if (!posts || !data) {
    return (
      <MainLayout>
        <p className="text-center text-xl mt-10">Loading ...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-center text-xl mt-10">Something Went Wrong 😢</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="md:px-16 md:py-10 px-5 py-7">
        <h2 className="font-bold md:text-2xl text-lg md:mb-8 mb-5">
          All Events Are Shown Down Below
          <span className="font-medium text-lg float-right hidden md:block">
            {posts.length} total posts
          </span>
        </h2>
        <Cards data={posts} />
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return {
    props: {
      posts,
    },
    revalidate: 30,
  };
}

export default PostsMainPage;
