import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import  Blogcard from "../Components/blogCard"

const graphcms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl3pp4ebr7hlu01xk0mud6n9b/master"
);

const styles = {
  container: "flex flex-col justify-center items-center",
  main: "flex flex-col md:flex-row space-around pt-5 md:p-10 md:px-20 "
}

const QUERY = gql`
  {
    posts {
      id ,
      title ,
      slug ,
      coverPhoto {
        publishedAt,
        url
      } ,
      datepublished ,
      content {
        html
      }
      author {
        name ,
        avatar {
          url
        }
      }
    }  
}`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 30,
  };
}

export default function Home({posts}) {

  return (
    <div className={styles.container}>
      <h1 className="mt-10 text-4xl">RKC-BLOG</h1>
      <Head>
        <title>RKC-BLOG</title>
        <meta name="description" content="A blog by Rohit or RohitKcode to share crazy and good content 
        about programming development and tech . learn the latest of tech and explore deep into them from the
        blog " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {posts.map((post) => (
          <Blogcard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datepublished}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
}
