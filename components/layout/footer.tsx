import Link from 'next/link';

import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded-sm bg-light-pink dark:bg-dark-pink';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm text-text-dark dark:text-off-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-light-pink px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-dark-pink">
        <div>
          <Link className="flex items-center gap-2 text-text-dark md:pt-1 dark:text-off-white" href="/">
            <LogoSquare size="sm" />
            <span className="uppercase">{SITE_NAME}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
        <div className="md:ml-auto">
          <a
            className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-light-pink bg-off-white text-xs text-text-dark dark:border-dark-pink dark:bg-text-dark dark:text-off-white"
            aria-label="Deploy on Vercel"
            href="https://vercel.com/templates/next.js/nextjs-commerce"
          >
            <span className="px-3">▲</span>
            <hr className="h-full border-r border-light-pink dark:border-dark-pink" />
            <span className="px-3">Deploy</span>
          </a>
        </div>
      </div>
      <div className="border-t border-light-pink py-6 text-sm dark:border-dark-pink">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-flamingo-pink md:inline-block" />
          <p>
            <a href="https://github.com/vercel/commerce" className="text-pink-fucsia hover:text-flamingo-pink">View the source</a>
          </p>
          <p className="md:ml-auto">
            <a href="https://vercel.com" className="text-text-dark dark:text-off-white">
              Created by ▲ Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
