import { useRef, useState } from "react";
import ProductDetails from "./ProductDetails";
import BackGround from "./BackGround";

export default function ProductDetailsContainsCard({
  title,
  image,
  description,
}) {
  return (
    <>
      <article className="product-card w-60 md:w-full flex flex-col lg:flex-row lg:gap-2 items-center">
        <img
          className="w-10/12 mb-3 h-30 lg:w-6/12 md:h-44 product-card__image object-contain"
          src={image}
        />
        <div className="w-[12rem]">
          <h3 className="text-center lg:text-start font-medium text-xl">
            {title}
          </h3>
          <p className="product-card__description text-center lg:text-start mt-3 h-20 sm:11 h-fit">
            {description}
          </p>
        </div>
      </article>
    </>
  );
}
