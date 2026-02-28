import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

export const markdownToHtml = async (markdown: string) => {
  const v = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);
  return v.toString();
};
