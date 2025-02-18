import { useState } from "react";
import CategoriesTitles from "./categoriesTitles/categoriesTitles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categoruParam, setcategoruParam] = useState("");

  function getAllMeals() {
    return axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=");
  }
  const allMealsRespose = useQuery({
    queryKey: ["GetAllMeals"],
    queryFn: getAllMeals,
  });
  //   console.log(allMealsRespose.data?.data.meals);

  const allMealsResposeData = allMealsRespose.data?.data.meals;

  function getCategoryMeals() {
    return axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoruParam}`
    );
  }
  const categoryMealsRespose = useQuery({
    queryKey: ["categoryMeals", categoruParam],
    queryFn: getCategoryMeals,
  });
  //   console.log(categoruParam);
  //   console.log(categoryMealsRespose.data?.data.meals);
  const categoryMealsResposeData = categoryMealsRespose.data?.data.meals;
  return (
    <div id="categories" className="p-5">
      <h1 className="">Learn, Cook, Eat Your Food</h1>
      <CategoriesTitles
        categoruParam={categoruParam}
        setcategoruParam={setcategoruParam}
      />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-16 pb-5 px-5 gap-x-8 gap-y-14">
          {categoruParam == ""
            ? allMealsResposeData?.map((meal) => {
                return (
                  <div
                    key={meal.idMeal}
                    className="meal text-center hover:shadow-xl group hover:scale-105 duration-300 transition-all bg-white p-12 pb-4 rounded-[35px]"
                  >
                    <img
                      src={meal?.strMealThumb}
                      className="w-full group-hover:rotate-[360deg] duration-700 transition-all rounded-full drop-shadow-xl -translate-y-20 shadow-2xl"
                      alt
                    />
                    <h3 className="font-semibold -mt-8 font-Pacifico tracking-wider text-xl">
                      {meal?.strMeal}
                    </h3>
                    <h5 className="flex justify-center items-center gap-2 text-emerald-600">
                      <i className="fa-solid fa-earth-americas"></i>
                      {meal?.strArea}
                    </h5>
                    <button className="text-white bg-emerald-500 mt-4 bg-secondary hover:bg-emerald-600 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 px-8 py-2 rounded-full">
                      <Link to={`/mealdetails/${meal.idMeal}`}>
                        {" "}
                        View Recipe
                      </Link>
                    </button>
                  </div>
                );
              })
            : categoryMealsResposeData?.map((meal) => {
                return (
                  <div
                    key={meal.idMeal}
                    className="meal text-center hover:shadow-xl group hover:scale-105 duration-300 transition-all bg-white p-12 pb-4 rounded-[35px]"
                  >
                    <img
                      src={meal?.strMealThumb}
                      className="w-full group-hover:rotate-[360deg] duration-700 transition-all rounded-full drop-shadow-xl -translate-y-20 shadow-2xl"
                      alt
                    />
                    <h3 className="font-semibold -mt-12 font-Pacifico tracking-wider text-xl">
                      {meal?.strMeal}
                    </h3>

                    <button className="text-white bg-emerald-500 mt-4 bg-secondary hover:bg-emerald-600 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 px-8 py-2 rounded-full">
                      <Link to={`/mealdetails/${meal.idMeal}`}>
                        {" "}
                        View Recipe
                      </Link>
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
