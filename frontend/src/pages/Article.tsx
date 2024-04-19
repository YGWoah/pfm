import { Link, useLoaderData } from 'react-router-dom';
import '../style/Article.css';

const Reply = (props: {
  userName: string;
  role: string;
  replyImage: string;
  content: string;
}) => {
  const profileImg = 'https://picsum.photos/200/300';
  const replyImage = 'https://picsum.photos/300/300';

  return (
    <div className="post">
      <div>
        <div>
          <Link to={`/profile/${props.userName}`}>
            <div>
              <img src={profileImg} alt="" />
            </div>
            <div>
              <h5>{props.userName}</h5>
              <p>{props.role}</p>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <p>{props.content}</p>
      </div>
      <div>
        <img src={replyImage} alt="" />
      </div>
    </div>
  );
};

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
  categorie: {
    id: number;
    nom: string;
  };
  User: {
    id: number;
    nom: string;
    email: string;
  };
}

function Article({ article }: { article: ArticleType }) {
  return (
    <Link to={`/home/article/${article.id}`}>
      <div className="m-5">
        <p className="ax-w-lg text-xl leading-normal text-gray-900">
          {' '}
          <span className="font-semibold">{article.User.nom} </span>
          shared an article
        </p>

        <div className="w-full p-4 shadow-md  text-black">
          <div className="flex justify-between pb-4 border-bottom">
            <div className="flex items-center">
              <Link
                rel="noopener noreferrer"
                to="#"
                className="mb-0 capitalize  "
              >
                {article?.categorie?.nom}
              </Link>
            </div>
            <Link rel="noopener noreferrer" to="#">
              See All
            </Link>
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
                  <span>{article.published}</span>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className=" mt-4 space-y-4">
              <Link
                rel="noopener noreferrer"
                to="#"
                className="block"
              >
                <h3 className="text-xl font-semibold  ">
                  {article.titre}
                </h3>
              </Link>
              <p className="mb-3 text-gray-500 dark:text-gray-400">
                {article.contenu}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

const ArticlesContainer = (props: any) => {
  const atricles: ArticleType[] | unknown =
    useLoaderData() as ArticleType[];

  if (!Array.isArray(atricles)) {
    return <div>Something went Wrong</div>;
  } else
    return (
      <div className="flex flex-col p-9 overflow">
        {atricles &&
          atricles.map((article: ArticleType) => {
            return <Article article={article} />;
          })}
      </div>
    );
};

export default ArticlesContainer;
