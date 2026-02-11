export const CategoryTag = ({ category }: { category: string }) => {
  return (
    <span className="text-app-sub-text dark:text-app-dark-sub-text text-sm bg-app-sub-bg dark:bg-app-dark-sub-bg px-xs rounded-md">
      {category}
    </span>
  );
};
