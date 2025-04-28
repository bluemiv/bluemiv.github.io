import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import PostContentImage from '@/entities/post/ui/PostContentImage';
import moonLightTheme from '../../../../assets/moonlight-ii.json' with { type: 'json' };

interface Props {
  content: string;
}

export default async function PostMdxContent({ content }: Props) {
  return (
    <MDXRemote
      source={content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [rehypePrettyCode, { theme: moonLightTheme, keepBackground: false }],
            rehypeSlug,
          ],
          format: 'mdx',
        },
      }}
      components={{
        h1: (props) => (
          <Link
            href={`#${props.id}`}
            className="duration-150 ease-in-out hover:text-app-primary dark:hover:text-app-dark-primary"
          >
            <h1 className="font-bold text-4xl md:text-5xl mt-2xl mb-xl cursor-pointer" {...props} />
          </Link>
        ),
        h2: (props) => (
          <Link
            href={`#${props.id}`}
            className="duration-150 ease-in-out hover:text-app-primary dark:hover:text-app-dark-primary"
          >
            <h2 className="font-bold text-2xl md:text-3xl mt-2xl mb-lg cursor-pointer" {...props} />
          </Link>
        ),
        h3: (props) => (
          <Link
            href={`#${props.id}`}
            className="duration-150 ease-in-out hover:text-app-primary dark:hover:text-app-dark-primary"
          >
            <h3
              className="font-semibold text-xl md:text-2xl mt-2xl mb-md cursor-pointer"
              {...props}
            />
          </Link>
        ),
        h4: (props) => (
          <Link
            href={`#${props.id}`}
            className="duration-150 ease-in-out hover:text-app-primary dark:hover:text-app-dark-primary"
          >
            <h4
              className="font-semibold text-lg md:text-xl mt-xl mb-md cursor-pointer"
              {...props}
            />
          </Link>
        ),
        h5: (props) => (
          <Link
            href={`#${props.id}`}
            className="duration-150 ease-in-out hover:text-app-primary dark:hover:text-app-dark-primary"
          >
            <h5
              className="font-semibold text-base md:text-lg mt-lg mb-md cursor-pointer"
              {...props}
            />
          </Link>
        ),
        h6: (props) => (
          <Link
            href={`#${props.id}`}
            className="duration-150 ease-in-out hover:text-app-primary dark:hover:text-app-dark-primary"
          >
            <h6
              className="font-semibold text-sm md:text-base mt-lg mb-md cursor-pointer"
              {...props}
            />
          </Link>
        ),
        hr: (props) => (
          <hr className="my-xl border-t-app-sub-bg dark:border-t-app-dark-sub-bg" {...props} />
        ),
        strong: (props) => <strong className="font-bold" {...props} />,
        p: (props) => {
          if (typeof props.children === 'object') {
            const isImage = !!props.children?.props?.src && !props.children?.props?.children;
            if (isImage) {
              return <>{props.children}</>;
            }
          }
          return (
            <p className="break-all sm:break-words mb-lg leading-8 md:leading-10" {...props} />
          );
        },
        img: (props) => <PostContentImage imageProps={props} />,
        a: (props) => (
          <Link
            className="underline font-semibold md:transition-colors md:ease-in-out md:duration-150 cursor-pointer hover:text-app-primary dark:hover:text-app-dark-primary"
            {...props}
          />
        ),
        em: (props) => <em className="italic" {...props} />,
        u: (props) => <em className="underline" {...props} />,
        table: (props) => <table className="overflow-hidden w-full mb-lg text-left" {...props} />,
        thead: (props) => <thead className="bg-slate-50 dark:bg-slate-900" {...props} />,
        th: (props) => (
          <th
            className="px-md py-sm font-semibold border border-slate-300 dark:border-slate-700"
            {...props}
          />
        ),
        td: (props) => (
          <td className="px-md py-sm border border-slate-300 dark:border-slate-700" {...props} />
        ),
        tr: (props) => <tr className="hover:bg-slate-100 dark:hover:bg-slate-800" {...props} />,
        figure: (props) => <figure {...props} />,
        ul: (props) => (
          <ul className="list-disc pl-md md:pl-lg mb-md marker:text-text-secondary" {...props} />
        ),
        ol: (props) => (
          <ol className="list-decimal pl-md md:pl-lg mb-md marker:text-text-secondary" {...props} />
        ),
        li: (props) => <li className="pl-sm mb-sm leading-6 md:leading-8" {...props} />,
        blockquote: (props) => (
          <blockquote
            className="break-all sm:break-words italic text-text-secondary border-l-2 pl-md"
            {...props}
          />
        ),
      }}
    />
  );
}
