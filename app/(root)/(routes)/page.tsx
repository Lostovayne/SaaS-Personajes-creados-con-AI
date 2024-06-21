import Categories from "@/components/categories";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";

export default async function Home() {
  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
}
