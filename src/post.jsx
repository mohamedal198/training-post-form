import React, { useEffect, useState } from "react";
import axios from "axios";

export const Post = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchUrl = `https://jsonplaceholder.typicode.com/comments`;
        const response = await axios.get(fetchUrl);
        setComments(response.data);
      } catch (error) {
        console.error(error);
        setError("Something went wrong...");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-8 px-4 bg-blue-300 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        Comments
      </h1>
      <div className="container mx-auto">
        {isLoading ? (
          <h2 className="text-center text-lg font-semibold text-gray-600">
            Loading...
          </h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {comments.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all"
              >
                <h5 className="text-lg font-semibold text-blue-700 mb-2">
                  {post.name}
                </h5>
                <p className="text-sm text-green-600 mb-1">{post.email}</p>
                <p className="text-gray-700">{post.body}</p>
              </div>
            ))}
          </div>
        )}

        {error && (
          <h2 className="text-center text-red-500 font-medium mt-4">{error}</h2>
        )}
      </div>
    </section>
  );
};
