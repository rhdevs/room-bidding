"use client";

import Link, { LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

interface LinkWithQPProps extends LinkProps {
  children?: ReactNode;
  className?: string;
  ref?: any;
  href: any;
}
export function LinkWithQP({
  ref,
  className,
  href,
  children,
}: LinkWithQPProps) {
  const searchParams = useSearchParams();

  const search = `?${searchParams.toString()}`;

  // handle and ids (#contact, #aboutUs) in the href
  const customHref = href.includes("#")
    ? href.split("#")[0] + search + "#" + href.split("#")[1]
    : href + search;
  return (
    <Link ref={ref} className={className} href={customHref}>
      {children}
    </Link>
  );
}
