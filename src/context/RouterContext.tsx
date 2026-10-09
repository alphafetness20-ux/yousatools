import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type RoutePath =
  | '/'
  | '/image-compressor'
  | '/about'
  | '/contact'
  | '/privacy-policy'
  | '/terms';

interface RouterContextType {
  currentPath: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

const ROUTE_METADATA: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'YousaTools - Free Online Tools',
    description:
      'Free browser-based online tools to make everyday tasks easier. Fast, private, client-side utilities with zero server uploads.',
  },
  '/image-compressor': {
    title: 'Free Image Compressor Online | YousaTools',
    description:
      'Compress JPEG, PNG, and WebP images directly in your browser. Adjust quality, compare file sizes, and download optimized images with zero server uploads.',
  },
  '/about': {
    title: 'About YousaTools',
    description:
      'Learn about YousaTools and our mission to provide fast, private, free browser utilities for everyday tasks without server uploads.',
  },
  '/contact': {
    title: 'Contact YousaTools',
    description:
      'Get in touch with YousaTools for feedback, questions, or tool suggestions.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | YousaTools',
    description:
      'Read the YousaTools privacy policy. All image processing occurs strictly client-side on your device with complete privacy.',
  },
  '/terms': {
    title: 'Terms of Use | YousaTools',
    description:
      'Review the terms of use and conditions for using YousaTools free browser-based utilities.',
  },
};

function normalizePath(path: string): string {
  // Strip trailing slashes unless root
  let clean = path.trim();
  if (clean.startsWith('#')) {
    clean = clean.slice(1);
  }
  if (!clean.startsWith('/')) {
    clean = '/' + clean;
  }
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean || '/';
}

function getInitialPath(): string {
  if (typeof window === 'undefined') return '/';
  if (window.location.hash) {
    const hash = window.location.hash.slice(1);
    return normalizePath(hash);
  }
  return normalizePath(window.location.pathname);
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  const navigate = (to: string) => {
    const target = normalizePath(to);
    if (target === currentPath) return;

    window.history.pushState({}, '', target);
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getInitialPath());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Update dynamic document title and meta description for SEO
  useEffect(() => {
    const meta = ROUTE_METADATA[currentPath] || {
      title: 'Page Not Found | YousaTools',
      description: 'The requested page could not be found on YousaTools.',
    };

    document.title = meta.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description);
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', meta.title);
    }

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', meta.description);
    }
  }, [currentPath]);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function Link({
  to,
  children,
  className = '',
  onClick,
  ...props
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: unknown;
}) {
  const { navigate, currentPath } = useRouter();
  const normalizedTo = normalizePath(to);
  const isActive = currentPath === normalizedTo;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
      data-active={isActive ? 'true' : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
