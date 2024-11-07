import Link from "next/link";

const Post = ({ post }: { post: { title: string, body: string,id:string ,category:string} }) => {
  return (
    <div>
      <Link className="hover:underline" href={"/blog/"+post.id}>
        <article className="p-5 flex flex-col gap-3 border mb-3">
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p>{post.body}</p>
          {/* <p>{post.body}</p>
          <p>{post.body}</p> */}
        </article>
      </Link>
    </div>
  );
};

export default Post;
