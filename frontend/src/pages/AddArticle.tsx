import {
  RefObject,
  LegacyRef,
  useEffect,
  useRef,
  useState,
  useContext,
  createContext,
} from 'react';
import axiosInstance from '../utils/axiosConfig';

interface CategoryType {
  id: number;
  nom: String;
}

function generateColor() {
  const r = Math.floor(Math.random() * 256); // Red component (0-255)
  const g = Math.floor(Math.random() * 256); // Green component (0-255)
  const b = Math.floor(Math.random() * 181) + 75; // Blue component (75-255)

  return `rgb(${r}, ${g}, ${b})`;
}

const CategoryContext = createContext<{
  chosenCategory: CategoryType | null;
  setChosenCategory: React.Dispatch<
    React.SetStateAction<CategoryType | null>
  >;
} | null>(null);

const Category = (category: {
  category: { nom: String; id: number };
}) => {
  const setChosenCategory = useContext(CategoryContext);
  const [color, setColor] = useState(generateColor());
  return (
    <div
      className="flex m-2 items-center justify-center cursor-pointer"
      onClick={() =>
        setChosenCategory?.setChosenCategory(category.category)
      }
    >
      <span
        style={{
          display: 'flex',
          backgroundColor: `${color}`,
          width: '2rem',
          height: '2rem',
        }}
        className="rounded-2xl m-1"
      ></span>
      <p className="font-medium">{category.category.nom}</p>
    </div>
  );
};

const AddArticle = () => {
  const title: RefObject<HTMLInputElement> = useRef(null);
  const image: RefObject<HTMLInputElement> = useRef(null);
  const content: LegacyRef<HTMLTextAreaElement> = useRef(null);
  const category: RefObject<HTMLInputElement> = useRef(null);
  const publish: RefObject<HTMLInputElement> = useRef(null);
  const [categories, setCategories] = useState<
    {
      nom: String;
      id: number;
    }[]
  >([
    {
      nom: 'Loading ...',
      id: 0,
    },
  ]);
  const [chosenCategory, setChosenCategory] =
    useState<CategoryType | null>(null);
  const getCategories = () => {
    try {
      axiosInstance
        .get('/categorie')
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          throw Error('Error fetching categories');
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      getCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = (e: React.MouseEvent, published: boolean) => {
    const article = {
      userId: 1,
      titre: title.current?.value,
      image: image.current?.value,
      contenu: content.current?.value,
      categorie: chosenCategory?.id,
      published: published,
    };
    if (
      !title.current?.value ||
      !image.current?.value ||
      !content.current?.value ||
      !chosenCategory?.id ||
      !published
    ) {
      return console.log('the Field are insufissant');
    }
    // try {
    axiosInstance
      .post('/article', article)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw Error('Error adding article');
      });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <section className="p-6 h-full border-gray-300">
      <div className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
        <fieldset className=" p-6 rounded-md shadow-sm ">
          <div className="grid grid-cols-2 gap-4 lg:col-span-3">
            <div className="  ">
              <label
                htmlFor="username"
                className="font-medium text-lg"
              >
                Title
              </label>
              <input
                id="Titre"
                ref={title}
                type="text"
                placeholder="Titre"
                className="appearance-none  block w-full px-3 py-2 border text-base border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500  "
              />
            </div>
            <div className="">
              <label
                htmlFor="website"
                className="font-medium text-lg"
              >
                Image
              </label>
              <input
                id="Image Link"
                ref={image}
                type="text"
                placeholder="Image Link"
                className="appearance-none block w-full px-3 py-2 border text-base border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="bio" className="font-medium text-lg">
                Content
              </label>
              <textarea
                id="bio"
                placeholder="Content..."
                ref={content}
                rows={8}
                className="appearance-none block w-full px-3 py-2 border text-base border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500  "
              ></textarea>
            </div>

            <CategoryContext.Provider
              value={{ chosenCategory, setChosenCategory }}
            >
              <div className="flex items-center mb-4 col-span-full">
                {categories
                  ? categories.map((category) => (
                      <Category category={category} />
                    ))
                  : 'Error loading categories'}
              </div>
            </CategoryContext.Provider>
            <div>
              <button
                onClick={(e) => {
                  handleSubmit(e, false);
                }}
                className="inline-flex justify-center m-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:border-gray-500 "
              >
                Save
              </button>
              <button
                onClick={(e) => {
                  handleSubmit(e, true);
                }}
                className="inline-flex justify-center  m-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:border-blue-500 "
              >
                Puplish
              </button>{' '}
            </div>
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default AddArticle;
