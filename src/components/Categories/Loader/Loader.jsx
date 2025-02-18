import React from "react";
import { FadeLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="absolute h-screen w-screen flex justify-center items-center bg-slate-400 opacity-35">
      <FadeLoader />
    </div>
  );
}
