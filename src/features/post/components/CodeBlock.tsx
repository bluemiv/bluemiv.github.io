'use client';

import { Children, isValidElement, type ReactNode, useEffect, useRef, useState } from 'react';

import { Check, Clipboard, X } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  children?: ReactNode;
  className?: string;
}

const getTextFromNode = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getTextFromNode).join('');

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getTextFromNode(node.props.children);
  }

  return '';
};

const fallbackCopy = (text: string) => {
  const textarea = document.createElement('textarea');

  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

export default function CodeBlock({ children, className, ...props }: Props) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const code = Children.toArray(children).map(getTextFromNode).join('').trimEnd();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copyCode = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        fallbackCopy(code);
      }

      setStatus('copied');
    } catch {
      try {
        fallbackCopy(code);
        setStatus('copied');
      } catch {
        setStatus('failed');
      }
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setStatus('idle'), 1600);
  };

  const isCopied = status === 'copied';
  const isFailed = status === 'failed';

  return (
    <div className="group/code relative">
      <pre className={clsx('pr-16', className)} {...props}>
        {children}
      </pre>
      <button
        type="button"
        aria-label={isCopied ? '코드 복사됨' : '코드 복사'}
        onClick={copyCode}
        className={clsx(
          'absolute right-3 top-3 z-10 inline-flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold',
          'bg-white/90 text-slate-600 shadow-[0_8px_22px_rgb(15_23_42_/_0.14)] backdrop-blur-md',
          'transition-[opacity,transform,border-color,color,background-color] duration-200 ease-out',
          'opacity-100 md:opacity-0 md:group-hover/code:opacity-100 md:group-focus-within/code:opacity-100',
          'hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/45',
          'dark:bg-slate-950/80 dark:text-slate-200 dark:shadow-[0_8px_22px_rgb(0_0_0_/_0.3)]',
          isCopied
            ? 'border-emerald-400/70 text-emerald-700 dark:border-emerald-400/60 dark:text-emerald-300'
            : 'border-white/50 hover:border-app-primary/50 hover:text-app-primary dark:border-white/10 dark:hover:border-app-dark-primary/60 dark:hover:text-app-dark-primary',
          isFailed && 'border-rose-400/70 text-rose-700 dark:border-rose-400/60 dark:text-rose-300',
          (isCopied || isFailed) && 'opacity-100 md:opacity-100',
        )}
      >
        {isCopied ? (
          <Check size={14} strokeWidth={2.4} aria-hidden="true" />
        ) : isFailed ? (
          <X size={14} strokeWidth={2.4} aria-hidden="true" />
        ) : (
          <Clipboard size={14} strokeWidth={2.2} aria-hidden="true" />
        )}
        <span>{isCopied ? '복사됨' : isFailed ? '실패' : '복사'}</span>
      </button>
    </div>
  );
}
