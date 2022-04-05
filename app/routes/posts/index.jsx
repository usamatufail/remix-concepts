import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';
import { Link } from 'react-router-dom';

export const loader = async () => {
  const data = {
    posts: await db.post.findMany({
      take: 20,
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
  };
  return data;
};

function PostLists() {
  const { posts } = useLoaderData();

  return (
    <>
      <div className="page-header">
        <h1>Posts</h1>
        <Link to="/posts/new" className="btn">
          New Post
        </Link>
      </div>
      <ul className="posts-list">
        {posts?.map((post) => {
          return (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                {new Date(post.createdAt).toLocaleString()}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default PostLists;
