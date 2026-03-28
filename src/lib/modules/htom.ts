import { unified } from 'unified';
import remarkStringify from 'remark-stringify';
import rehypeRemark from 'rehype-remark';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

const rehypeParse = (await import('rehype-parse')).default;

export const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeSanitize)
  .use(rehypeRemark)
  .use(remarkGfm)
  .use(remarkStringify, {
    bullet: '-',
    bulletOther: '+',
    rule: '-',
  });
