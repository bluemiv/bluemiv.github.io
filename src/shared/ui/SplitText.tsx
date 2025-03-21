import { PropsWithClassName } from '@/shared/types/props';
import clsx from 'clsx';

interface Props {
  startIndex?: number;
  text: string;
}

export default function SplitText({ startIndex = 0, text, className }: PropsWithClassName<Props>) {
  return (
    <span className={clsx('inline-block overflow-hidden', className)}>
      {text.split(' ').map((word, index) => (
        <span
          key={index + startIndex}
          className={`inline-block opacity-0 animate-split-text`}
          style={{ animationDelay: `${(index + startIndex) * 0.1}s` }}
        >
          {`${index === 0 ? '' : '\u00A0'}${word}`}
        </span>
      ))}
    </span>
  );
}
