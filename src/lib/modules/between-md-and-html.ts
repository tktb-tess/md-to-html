import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypeParse from 'rehype-parse';
import remarkStringify from 'remark-stringify';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import rehypeRemark from 'rehype-remark';
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

export const htmlToMarkdown = async (html: string) => {
  const v = await unified()
    .use(rehypeParse)
    .use(rehypeSanitize)
    .use(rehypeRemark)
    .use(remarkGfm)
    .use(remarkStringify)
    .process(html);
  return v.toString();
};
