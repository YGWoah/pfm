import { useState, LegacyRef, useRef, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';

interface ArticleType {
  categorieId: number;
  contenu: string;
  createdAt: Date;
  id: number;
  image: string | undefined;
  published: boolean;
  titre: string;
  updatedAt: Date;
  userId: number;
}

interface ReplyType {
  email: string;
  contenu: string;
  articleId: number;

  User: {
    id: number;
    nom: string;
    role: string;
  };
}

function OneReply(props: { data: ReplyType } | undefined) {
  return (
    <article className="p-6 mb-6 text-base bg-white rounded-lg  ">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-base text-gray-900  ">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt="Michael Gough"
            />
            {props?.data.User.nom}
          </p>
          <p className="text-sm text-gray-600  ">
            <time dateTime="2022-02-08" title="February 8th, 2022">
              Feb. 8, 2022
            </time>
          </p>
        </div>
      </footer>
      <p className="text-gray-500">{props?.data.contenu}</p>
    </article>
  );
}

function Reply(props: { articleId: number }) {
  const [clickable, setClickable] = useState(true);
  const [comments, setComments] = useState<ReplyType[]>([]);
  const contenu: LegacyRef<HTMLTextAreaElement> = useRef(null);
  const handleSubmit = () => {
    console.log('submit');

    console.log(contenu.current);

    try {
      if (props.articleId === undefined) {
        console.log('the article id is undefined');
        return;
      }
      if (contenu.current?.value === undefined || !props.articleId) {
        console.log('the content is empty');

        return;
      }

      setClickable(false);
      let data = {
        contenu: contenu.current?.value,
        articleId: props.articleId,
      };
      axiosInstance.post('/comment/', data).then((res) => {
        setClickable(true);
      });
    } catch (error) {
      console.log(error);
      setClickable(true);
    }
  };

  const getComments = () => {
    try {
      axiosInstance
        .get(`/comment/article/${props.articleId}`)
        .then((res) => {
          setComments(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <section className="bg-white  py-8  ">
      <div className="   px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
            Discussion (20)
          </h2>
        </div>
        <div className="mb-6 w-full">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-base text-gray-900 border-0 focus:ring-0 focus:outline-none  "
              placeholder="Write a comment..."
              required
              ref={contenu}
              maxLength={1000}
            ></textarea>
          </div>
          <button
            onClick={(e) => {
              handleSubmit();
            }}
            className={
              'inline-flex justify-center m-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-gray-700 focus:ring-gray-500 focus:border-gray-500 ' +
              (clickable ? 'cursor-pointer' : 'cursor-not-allowed')
            }
          >
            Post Comment
          </button>
        </div>
      </div>
      {comments.map((comment: any) => (
        <OneReply data={comment} />
      ))}
    </section>
  );
}

export default function Article() {
  const article: ArticleType | undefined =
    useLoaderData() as ArticleType;
  console.log(article);

  return (
    <div className="   ">
      <div className="m-5  ">
        <p className="ax-w-lg text-xl leading-normal text-gray-900">
          <span className="font-semibold">Johe Piden</span> shared
          this article {article?.userId}
        </p>

        <div className="w-full p-4 shadow-md  text-black">
          <div className="flex justify-between pb-4 border-bottom">
            <div className="flex items-center">
              <a
                rel="noopener noreferrer"
                href="#"
                className="mb-0 capitalize  "
              >
                Joe Biden
              </a>
            </div>
            <a rel="noopener noreferrer" href="#">
              See All
            </a>
          </div>
          <div className="w-full ">
            {article.image ? (
              <div className="max-h-md  max-w-lg ">
                <div className=" w-full flex justify-center">
                  <img
                    src="https://picsum.photos/500/400"
                    alt=""
                    className="block object-cover object-center max-h-md  max-w-lg rounded-md h-72 "
                  />
                </div>

                <div className="flex items-center text-xs">
                  <span>{article?.published}</span>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="space-y-2">
              <a rel="noopener noreferrer" href="#" className="block">
                <h3 className="text-xl font-semibold  ">
                  {article?.titre}
                </h3>
              </a>
              <p className="mb-3 text-gray-500 dark:text-gray-400">
                {article?.contenu}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Reply articleId={article?.id} />
    </div>
  );
}
