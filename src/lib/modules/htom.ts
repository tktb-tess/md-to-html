import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import remarkStringify from 'remark-stringify';
import type { Options } from 'remark-stringify';
import rehypeRemark from 'rehype-remark';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

export const htmlToMd = async (
  html: string,
  remarkStringifyOptions: Options = {},
) => {
  remarkStringifyOptions.bullet ??= '-';
  remarkStringifyOptions.bulletOther ??= '+';
  remarkStringifyOptions.rule ??= '-';
  const p = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize)
    .use(rehypeRemark)
    .use(remarkGfm)
    .use(remarkStringify, remarkStringifyOptions);

  const v = await p.process(html);
  return v.toString();
};
