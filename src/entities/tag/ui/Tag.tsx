interface Props {
  tag: string;
}

export const Tag = ({ tag }: Props) => {
  return (
    <span className="inline-block text-sm bg-app-sub-bg dark:bg-app-dark-sub-bg px-sm py-xs rounded-full">
      #{tag}
    </span>
  );
};
