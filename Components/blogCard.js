// import style from "../styles/blogcard.css";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

const styles = {
    card: "flex flex-col  w-[] md:w-1/2 col-span-1 rounded-[2em] shadow-xl overflow-hidden m-2 bg-indigo-100 h-fit mx-6",
    details: "flex flex-row justify-between items-center mx-7 ",
    author: "flex flex-row p-2  text-sm text-zinc-600 items-center  justify-between font-bold font-mono" ,
    date: "font-bold font-mono text-sm text-zinc-600 mx-7",
    imgContainer: "h-[35vh] overflow-hidden"
}

function BlogPost({ title, author, coverPhoto, datePublished, slug }) {
  return (
    <div className="blogcard w-[] md:w-1/2 shadow-xl">
      <Link href={`/posts/${slug}`}>
        <div className="imgContainer">
          <img  className="shadow-xl" src={coverPhoto.url} alt="" />
        </div>
      </Link>
      <div className={styles.text}>
        <h1 className="flex font-bold  text-xl mx-7 justify-center uppercase items-center">{title}
        </h1>
        <div className="flex flex-row justify-between items-center mx-7 ">
          <div className="flex flex-row p-2  text-sm text-zinc-600 items-center  justify-between font-bold font-mono">
            <Image width="30vh" height="30vh" className=" drop-shadow-sm" style={ {borderRadius: "50%" }} src={author.avatar.url} alt={author.name} />
            <h3> &nbsp; {author.name} </h3>
            {/* <h3>{datePublished}</h3> */}
          </div>
          <div className="font-bold font-mono text-sm text-zinc-600 mx-7">
          <h3>{moment(datePublished).format("MMMM d, YYYY")}</h3>
            {/* <h3>{moment(datePublished).format("MMMM d, YYYY")}</h3> */}
          </div>
        </div>
      </div> 
    </div>
  );
}

{
  // <div dangerouslySetInnerHTML={{ __html: content.html }}></div> 
}
export default BlogPost;