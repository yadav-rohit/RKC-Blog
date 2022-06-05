import { GraphQLClient, gql } from "graphql-request";
import moment from "moment";

const graphcms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl3pp4ebr7hlu01xk0mud6n9b/master"
);

const styles = {
  blog : "my-10 mx-[4vw] md:mx-[18vw] flex flex-col",
  cover: "rounded-3xl shadow-xl h-[40vh] md:h-[70vh] my-4" ,
  authdetails : "drop-shadow-xl p-1 rounded-lg  ml-2",
  authtext: " mx-2 flex flex-row  justify-around items-center font-bold font-mono text-sm text-zinc-600",
  content: "mt-4 mx-4 antialiased text-lg"

}
const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datepublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;
const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 30,
  };
}

export default function BlogPost({ post }) {
  return (
    <main className={styles.blog}>
      <h2 className="flex items-center text-3xl antialiased tracking-wide uppercase self-center">{post.title}</h2>
      <img
        className={styles.cover}
        src={post.coverPhoto.url}
        alt={post.title}
      />
      <div className={styles.title}>
        <div className={styles.authdetails}>
          <div className={styles.authtext}>
          <div className="flex flex-row items-center"><img  className="mx-2 h-[3em] w-[3em] rounded-[50%]" src={post.author.avatar.url} alt={post.author.name} />
            <h6>By {post.author.name} </h6>
            </div>
            <h6 className={styles.date}>
              {moment(post.datepublished).format("MMMM d, YYYY")}
            </h6>
          </div>
        </div>
        
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      >
      </div>
    </main>
  );
}