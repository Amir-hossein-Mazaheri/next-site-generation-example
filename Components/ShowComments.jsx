import { useRouter } from "next/router";
import useSWR from "swr";

function ShowComment() {
  const route = useRouter();

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
  const { data } = useSWR(`/api/comments/${route.query.pId}`, fetcher);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h4 className="font-bold font-serif text-2xl text-gray-700 mb-3 mt-5">
        Comments
      </h4>
      <ul className="space-y-5 px-">
        {data.comments ? (
          data.comments.map((comment) => (
            <li
              className="bg-white shadow-lg shadow-gray-200 rounded-lg px-7 py-5"
              key={comment.id}
            >
              <div className="flex justify-between font-semibold">
                <div className="flex gap-2 items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>{comment["comment-author"]}</div>
                </div>

                <div className="flex gap-1 bg-slate-800 text-white rounded-lg px-4 py-1 text-xs items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <div>{comment["comment-email"]}</div>
                </div>
              </div>

              <div className="leading-relaxed text-gray-800 mt-4">
                <p>{comment["comment-content"]}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No Comments Found!</p>
        )}
      </ul>
    </div>
  );
}

export default ShowComment;
