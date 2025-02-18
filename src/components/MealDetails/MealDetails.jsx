import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Categories/Loader/Loader";
import NotFound404 from "./../NotFound/NotFound404";

export default function MealDetails() {
  const { id } = useParams();
  //   console.log(id);
  function getMealDetails() {
    return axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: ["mealDetail", id],
    queryFn: getMealDetails,
  });

  const mealDetailsData = data?.data?.meals[0];
  //   console.log(mealDetailsData);
  let ingredients = "";
  if (mealDetailsData) {
    ingredients = Object.keys(mealDetailsData).reduce((acc, key) => {
      if (
        key.startsWith("strIngredient") &&
        mealDetailsData[key].trim() !== ""
      ) {
        const index = key.replace("strIngredient", ""); // استخراج الرقم
        const measureKey = `strMeasure${index}`; // مفتاح المقدار
        if (mealDetailsData[measureKey]?.trim()) {
          acc.push({
            ingredient: mealDetailsData[key],
            measure: mealDetailsData[measureKey],
          });
        }
      }
      return acc;
    }, []);
  }

  if (isLoading) {
    return <Loader />;
  }
  console.log("isError", mealDetailsData);
  if (isError || mealDetailsData == "I") {
    return <NotFound404 />;
  }
  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-9">
        <div>
          <div className="titel">
            <h2>{mealDetailsData?.strMeal}</h2>
          </div>
          <img
            className="w-full rounded-2xl mb-8"
            src={mealDetailsData?.strMealThumb}
            alt={mealDetailsData?.strMeal}
          ></img>
          <ul className="flex gap-4 justify-center">
            <li className="bg-red-600  text-white py-2 px-4 rounded-lg ">
              <a
                target="_blank"
                href={mealDetailsData?.strYoutube}
                className="flex gap-2 justify-center items-center"
              >
                {" "}
                <i className="fa-brands fa-youtube"></i> youtube{" "}
              </a>
            </li>
            <li className="bg-green-500  text-white py-2 px-4 rounded-lg ">
              <a
                target="_blank"
                href={mealDetailsData?.strSource}
                className="flex gap-2 justify-center items-center"
              >
                <i className="fa-solid fa-globe"></i>
                Source
              </a>
            </li>
          </ul>
        </div>
        <div id="desc" className="text-center">
          {mealDetailsData?.strInstructions}
        </div>
        <div>
          <ul id="gredients" className="bg-white rounded-2xl py-4 px-4">
            <h3 className="text-2xl font-semibold mb-4 border-b-4 p-2">
              ingredients
            </h3>
            {ingredients?.map((gerdient, index) => {
              return (
                <li
                  key={index}
                  className="flex justify-between p-2 border-b-2 last-of-type:border-b-0 "
                >
                  <span>{gerdient?.ingredient}</span>
                  <span>{gerdient?.measure} </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
