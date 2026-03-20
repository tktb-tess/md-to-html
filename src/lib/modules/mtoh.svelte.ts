import { unified, type Processor } from 'unified';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import type * as Hast from 'hast';
import type * as Mdast from 'mdast';

type Proc = Processor<Mdast.Root, Mdast.Root, Hast.Root, Hast.Root, string>;

let processor: Proc | null = null;

export const getProcessor = () => {
  if (!processor) {
    processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSanitize)
      .use(rehypeStringify);
  }
  return processor;
};
