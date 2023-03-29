import type { Highlight } from './Highlight';
import {
  mentionRegex,
  mentionRegexTester,
  hashtagRegex,
  hashtagRegexTester,
  emailRegex,
  emailRegexTester,
  urlRegex,
  urlRegexTester,
} from './regexes';

export interface HighlighterProps {
  text?: string;
  highlights?: Highlight[];
  caseSensitive?: boolean;
  hashtags?: boolean;
  mentions?: boolean;
  emails?: boolean;
  links?: boolean;
}

interface HtmlProps extends HighlighterProps {
  hashtagClassName?: string;
  hashtagUrl?: (hashtag: string) => string;
  mentionClassName?: string;
  mentionUrl?: (mention: string) => string;
  emailClassName?: string;
  emailUrl?: (email: string) => string;
  linkClassName?: string;
}

export const splitText = ({
  text,
  highlights,
  caseSensitive,
  hashtags,
  mentions,
  emails,
  links,
}: HighlighterProps) => {
  const highlightRegex: string[] = [];

  highlights &&
    highlights.forEach((item) => {
      highlightRegex.push(...item.regexSource);
    });

  hashtags && highlightRegex.push(`(${hashtagRegex.source})`);
  mentions && highlightRegex.push(`(${mentionRegex.source})`);
  emails && highlightRegex.push(`(${emailRegex.source})`);
  links && highlightRegex.push(`(${urlRegex.source})`);

  const finalRegex = new RegExp(
    highlightRegex.join('|'),
    caseSensitive ? 'gm' : 'gmi'
  );

  const parts =
    text && highlightRegex.length > 0
      ? text.split(finalRegex).filter((i) => i !== undefined && i !== '')
      : text
      ? [text]
      : [];
  return parts;
};

export const formatedHtml = ({
  text,
  highlights,
  caseSensitive,
  hashtags,
  hashtagClassName,
  hashtagUrl,
  mentions,
  mentionClassName,
  mentionUrl,
  emails,
  emailClassName,
  emailUrl,
  links,
  linkClassName,
}: HtmlProps) => {
  const chunks = splitText({
    text,
    highlights,
    caseSensitive,
    hashtags,
    mentions,
    emails,
    links,
  });

  let html = '';
  chunks.map((chunk) => {
    let keyword = null;
    if (highlights) {
      highlights.map((item) => {
        const itemRegex = new RegExp(
          `^${item.regexSource.join('|')}$`,
          caseSensitive ? 'gm' : 'gmi'
        );

        if (itemRegex.test(chunk)) {
          keyword = `<span class=${item.className}>${chunk}</span>`;
        }
      });
    }
    if (keyword) {
      html += keyword;
    } else if (hashtagRegexTester.test(chunk)) {
      html += hashtagUrl
        ? `<a class=${hashtagClassName || ''} href=${hashtagUrl(
            chunk
          )}>${chunk}</a>`
        : `<span class=${hashtagClassName || ''}>${chunk}</span>`;
    } else if (mentionRegexTester.test(chunk)) {
      html += mentionUrl
        ? `<a class=${mentionClassName || ''} href=${mentionUrl(
            chunk
          )}>${chunk}</a>`
        : `<span class=${mentionClassName || ''}>${chunk}</span>`;
    } else if (emailRegexTester.test(chunk)) {
      html += emailUrl
        ? `<a class=${emailClassName || ''} href=${emailUrl(
            chunk
          )}>${chunk}</a>`
        : `<span class=${emailClassName || ''}>${chunk}</span>`;
    } else if (urlRegexTester.test(chunk)) {
      html += `<a class=${linkClassName || ''} href=${chunk}>${chunk}</a>`;
    } else html += `<span>${chunk}</span>`;
  });
  return html;
};
