import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import CodeBlock from '@/features/post/components/CodeBlock';
import PostContentImage from '@/features/post/components/PostContentImage';
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
            className="group duration-150 ease-in-out hover:text-app-primary dark:hover:text-app-dark-primary"
          >
            <h1
              className="scroll-mt-24 font-bold text-4xl md:text-5xl leading-tight mt-2xl mb-xl cursor-pointer"
              {...props}
            />
          </Link>
        ),
        h2: (props) => (
          <Link
            href={`#${props.id}`}
            className="group duration-150 ease-in-out hover:text-app-primary dark:hover:text-app-dark-primary"
          >
            <h2
              className="scroll-mt-24 font-bold text-2xl md:text-3xl leading-tight mt-2xl mb-lg cursor-pointer border-l-4 border-app-primary dark:border-app-dark-primary pl-md"
              {...props}
            />
          </Link>
        ),
        h3: (props) => (
          <Link
            href={`#${props.id}`}
            className="group duration-150 ease-in-out hover:text-app-primary dark:hover:text-app-dark-primary"
          >
            <h3
              className="scroll-mt-24 font-semibold text-xl md:text-2xl leading-tight mt-2xl mb-md cursor-pointer"
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
              className="scroll-mt-24 font-semibold text-lg md:text-xl mt-xl mb-md cursor-pointer"
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
              className="scroll-mt-24 font-semibold text-base md:text-lg mt-lg mb-md cursor-pointer"
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
              className="scroll-mt-24 font-semibold text-sm md:text-base mt-lg mb-md cursor-pointer"
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
          return <p className="break-all sm:break-words mb-lg leading-8 text-app-text-muted dark:text-app-dark-text-muted" {...props} />;
        },
        img: (props) => <PostContentImage imageProps={props} />,
        a: (props) => (
          <Link
            className="font-semibold text-app-primary dark:text-app-dark-primary underline decoration-app-primary/30 dark:decoration-app-dark-primary/30 underline-offset-4 md:transition-colors md:ease-in-out md:duration-150 cursor-pointer hover:decoration-app-primary dark:hover:decoration-app-dark-primary"
            {...props}
          />
        ),
        em: (props) => <em className="italic" {...props} />,
        u: (props) => <em className="underline" {...props} />,
        table: (props) => (
          <table
            className="overflow-hidden w-full mb-xl text-left rounded-xl border border-app-border dark:border-app-dark-border"
            {...props}
          />
        ),
        thead: (props) => <thead className="bg-app-surface-muted dark:bg-app-dark-surface-muted" {...props} />,
        th: (props) => (
          <th
            className="px-md py-sm font-semibold border border-app-border dark:border-app-dark-border"
            {...props}
          />
        ),
        td: (props) => (
          <td className="px-md py-sm border border-app-border dark:border-app-dark-border text-app-text-muted dark:text-app-dark-text-muted" {...props} />
        ),
        tr: (props) => <tr className="hover:bg-app-surface-muted/70 dark:hover:bg-app-dark-surface-muted/70" {...props} />,
        figure: (props) => <figure className="my-xl" {...props} />,
        pre: (props) => <CodeBlock {...props} />,
        ul: (props) => (
          <ul className="list-disc pl-md md:pl-lg mb-lg marker:text-app-primary dark:marker:text-app-dark-primary" {...props} />
        ),
        ol: (props) => (
          <ol className="list-decimal pl-md md:pl-lg mb-lg marker:text-app-primary dark:marker:text-app-dark-primary" {...props} />
        ),
        li: (props) => <li className="pl-sm mb-sm leading-7 text-app-text-muted dark:text-app-dark-text-muted" {...props} />,
        blockquote: (props) => (
          <blockquote
            className="my-xl break-all sm:break-words rounded-r-2xl border-l-4 border-app-primary dark:border-app-dark-primary bg-app-primary-soft/45 dark:bg-app-dark-primary-soft/45 px-md py-md italic text-app-text-muted dark:text-app-dark-text-muted"
            {...props}
          />
        ),
      }}
    />
  );
}
