import { MotionIcon } from "motion-icons-react";

interface Category {
  category_id: string;
  name: string;
  icon: string;
}

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string;
  handleCategoryChange: (categoryId: string) => void;
}

const CategoryList = ({
  categories,
  selectedCategory,
  handleCategoryChange,
}: CategoryListProps) => {
  return (
    <div className="flex gap-5 overflow-x-auto pb-3">
      <button
        type="button"
        onClick={() => handleCategoryChange("")}
        aria-pressed={selectedCategory === ""}
        className="flex min-w-[76px] shrink-0 flex-col items-center gap-2"
      >
        <span
          className={`flex h-16 w-16 items-center justify-center rounded-full transition cursor-pointer ${
            selectedCategory === ""
              ? "bg-slate-900 text-white ring-4 ring-slate-200"
              : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
          }`}
        >
          <MotionIcon name="LucideUtensils" />
        </span>

        <span className="text-xs font-semibold text-slate-700">Todos</span>
      </button>

      {categories.map((category) => (
        <button
          key={category.category_id}
          type="button"
          onClick={() => handleCategoryChange(category.category_id)}
          aria-pressed={selectedCategory === category.category_id}
          className="flex min-w-[76px] shrink-0 flex-col items-center gap-2"
        >
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-full transition cursor-pointer ${
              selectedCategory === category.category_id
                ? "bg-slate-900 text-white ring-4 ring-slate-200"
                : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
            }`}
          >
            <MotionIcon name={category.icon} />
          </span>

          <span className="max-w-24 text-center text-xs font-semibold text-slate-700">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryList;