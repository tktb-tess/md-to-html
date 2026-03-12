import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import remarkStringify from 'remark-stringify';
import rehypeRemark from 'rehype-remark';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

export const createHtoMProcessor = () => {
  const processor = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize)
    .use(rehypeRemark)
    .use(remarkGfm)
    .use(remarkStringify, {
      bullet: '-',
      bulletOther: '+',
      rule: '-',
    });

  return processor;
};

export type Processor = ReturnType<typeof createHtoMProcessor>;
