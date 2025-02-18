import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function CategoriesTitles({ setcategoruParam, categoruParam }) {
  function getCategoriesTitels() {
    return axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["categoriesTitels"],
    queryFn: getCategoriesTitels,
  });
  const categoriesData = data?.data.categories;
  //   console.log(data);
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p className="text-red-500">حدث خطأ أثناء تحميل البيانات</p>;
  }

  return (
    <>
      <div className="pb-5 border-b-2">
        <button
          onClick={() => setcategoruParam("")}
          type="button"
          className={
            categoruParam == ""
              ? "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mb-5"
              : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-300 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-full mb-5"
          }
        >
          All
        </button>
        <ul className="flex justify-center flex-wrap items-center gap-5">
          {categoriesData?.map((category) => {
            return (
              <li key={category.idCategory}>
                <button
                  onClick={() => setcategoruParam(category.strCategory)}
                  type="button"
                  className={
                    category.strCategory == categoruParam
                      ? "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-300 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  }
                >
                  {category?.strCategory}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
