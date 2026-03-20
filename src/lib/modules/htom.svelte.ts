import { unified, type Processor } from 'unified';
import remarkStringify from 'remark-stringify';
import rehypeRemark from 'rehype-remark';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import type * as Hast from 'hast';
import type * as Mdast from 'mdast';

type Proc = Processor<Hast.Root, Hast.Root, Mdast.Root, Mdast.Root, string>;

let processor: Proc | null = null;

export const getProcessor = async () => {
  const rehypeParse = (await import('rehype-parse')).default;
  if (!processor) {
    processor = unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeSanitize)
      .use(rehypeRemark)
      .use(remarkGfm)
      .use(remarkStringify, {
        bullet: '-',
        bulletOther: '+',
        rule: '-',
      });
  }

  return processor;
};
