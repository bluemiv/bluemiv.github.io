import { ReactNode } from 'react';

type Item = {
  title?: ReactNode;
  text?: ReactNode;
  childrenType?: 'ul' | 'ol';
  children?: Item[];
  extra?: ReactNode;
};

export const PrivacyList = ({ type = 'ul', items }: { type?: 'ul' | 'ol'; items: Item[] }) => {
  const renderItems = () =>
    items.map(({ title, text, childrenType, children, extra }, idx) => (
      <li key={idx}>
        <div>
          {!!title && <span className="font-semibold">{title}</span>}
          {!!title && !!text && ':'} {!!text && text}
        </div>
        {!!children && <PrivacyList type={childrenType || 'ul'} items={children}></PrivacyList>}
        {!!extra && extra}
      </li>
    ));

  if (type === 'ol') return <ol className="list-decimal ml-xl">{renderItems()}</ol>;
  return <ul className="list-disc ml-xl">{renderItems()}</ul>;
};
