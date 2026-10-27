import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mdx-heading" {...props} />,
    h3: (props) => <h3 className="mdx-subheading" {...props} />,
    p: (props) => <p className="mdx-paragraph" {...props} />,
    ul: (props) => <ul className="mdx-list" {...props} />,
    li: (props) => <li {...props} />,
    ...components,
  };
}
