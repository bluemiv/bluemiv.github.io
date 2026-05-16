export const CategoryTag = ({ category }: { category: string }) => {
  return (
    <span className="text-app-primary dark:text-app-dark-primary text-xs font-semibold bg-app-primary-soft dark:bg-app-dark-primary-soft px-xs py-[2px] rounded-md">
      {category}
    </span>
  );
};
