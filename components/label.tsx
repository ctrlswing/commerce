import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      className={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      <div className="flex items-center rounded-full border bg-off-white/70 p-1 text-xs font-semibold text-text-dark backdrop-blur-md dark:border-dark-pink dark:bg-text-dark/70 dark:text-off-white">
        <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">{title}</h3>
        <Price
          className="flex-none rounded-full bg-flamingo-pink p-2 text-off-white"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
