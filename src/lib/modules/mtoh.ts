import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

export const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSanitize)
  .use(rehypeStringify);
