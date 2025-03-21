import { MDXRemote } from 'next-mdx-remote/rsc';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import moonLightTheme from '../../../../assets/moonlight-ii.json' with { type: 'json' };

interface Props {
  content: string;
}

export default async function MDXComponent({ content }: Props) {
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
          <h1
            className="font-bold text-4xl md:text-5xl mt-2xl mb-xl text-text-primary"
            {...props}
          />
        ),
        h2: (props) => (
          <h2 className="font-bold text-2xl md:text-3xl mt-xl mb-lg text-text-primary" {...props} />
        ),
        h3: (props) => (
          <h3
            className="font-semibold text-xl md:text-2xl mt-xl mb-md text-text-primary"
            {...props}
          />
        ),
        h4: (props) => (
          <h4
            className="font-semibold text-lg md:text-xl mt-lg mb-md text-text-primary"
            {...props}
          />
        ),
        h5: (props) => (
          <h5
            className="font-semibold text-base md:text-lg mt-lg mb-md text-text-primary"
            {...props}
          />
        ),
        h6: (props) => (
          <h6
            className="font-semibold text-sm md:text-base mt-lg mb-md text-text-primary"
            {...props}
          />
        ),
        hr: (props) => <hr className="my-xl border-bg-secondary" {...props} />,
        strong: (props) => <strong className="font-bold text-text-primary" {...props} />,
        p: (props) => {
          if (typeof props.children === 'object') {
            const isImage = !!props.children?.props?.src && !props.children?.props?.children;
            if (isImage) {
              return <>{props.children}</>;
            }
          }
          return <p className="mb-lg leading-6 md:leading-8" {...props} />;
        },
        img: (props) => (
          <figure>
            <Image
              width={768}
              height={300}
              {...(props as ImageProps)}
              className="block w-full h-auto rounded bg-white/60"
            />
            {props.alt && (
              <figcaption className="mt-sm text-center text-secondary italic">
                {props.alt}
              </figcaption>
            )}
          </figure>
        ),
        a: (props) => (
          <Link
            className="underline font-semibold md:transition-colors md:ease-in-out md:duration-150 md:hover:text-primary-hover md:active:text-primary-active cursor-pointer"
            {...props}
          />
        ),
        em: (props) => <em className="italic" {...props} />,
        u: (props) => <em className="underline" {...props} />,
        table: (props) => <table className="overflow-hidden w-full mb-lg text-left" {...props} />,
        thead: (props) => <thead className="bg-bg-secondary" {...props} />,
        th: (props) => (
          <th className="px-md py-sm font-semibold border border-secondary-200" {...props} />
        ),
        td: (props) => <td className="px-md py-sm border border-secondary-200" {...props} />,
        tr: (props) => <tr className="hover:bg-bg-hover" {...props} />,
        figure: (props) => <figure {...props} />,
        ul: (props) => (
          <ul className="list-disc pl-md md:pl-lg mb-md marker:text-text-secondary" {...props} />
        ),
        ol: (props) => (
          <ol className="list-decimal pl-md md:pl-lg mb-md marker:text-text-secondary" {...props} />
        ),
        li: (props) => <li className="pl-sm mb-sm leading-6 md:leading-8" {...props} />,
        blockquote: (props) => (
          <blockquote className="italic text-text-secondary border-l-2 pl-md" {...props} />
        ),
      }}
    />
  );
}
