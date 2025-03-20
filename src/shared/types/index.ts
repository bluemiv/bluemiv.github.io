import { PropsWithChildren } from 'react';

export type PropsWithClassName<T = unknown> = T & { className?: string };

export type PropsWithComponent<T = unknown> = T & PropsWithClassName & PropsWithChildren;
