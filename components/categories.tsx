"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoriesProps {
  data: Category[];
}

const Categories = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url); // => instalado con query-string
  };

  return (
    <div className="w-full overflow-x-auto space-x-2 flex p-1 scrollbar">
      <button
        onClick={() => onClick(undefined)}
        className={cn(
          "flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-2 rounded-md bg-primary/10 hover:opacity-75 transition",
          !categoryId ? "bg-primary/25" : "bg-primary/10"
        )}
      >
        Newest
      </button>
      {data.map((category) => {
        return (
          <button
            key={category.id}
            onClick={() => onClick(category.id)}
            className={cn(
              "flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-2 rounded-md bg-primary/10 hover:opacity-75 transition",
              category.id === categoryId ? "bg-primary/25" : "bg-primary/10"
            )}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
};
export default Categories;
