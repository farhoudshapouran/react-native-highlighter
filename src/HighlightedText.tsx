import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { splitText } from './utils';
import type { HighlighterProps } from './utils';
import {
  mentionRegexTester,
  hashtagRegexTester,
  emailRegexTester,
  urlRegexTester,
} from './regexes';
import type { TextStyle, TextProps } from 'react-native';

interface HighlightTextProps extends HighlighterProps, TextProps {
  hashtagStyle?: TextStyle;
  onHashtagPress?: (hashtag: string) => void;
  mentionStyle?: TextStyle;
  onMentionPress?: (mention: string) => void;
  emailStyle?: TextStyle;
  onEmailPress?: (email: string) => void;
  linkStyle?: TextStyle;
  onLinkPress?: (link: string) => void;
}

const HighlightedText = ({
  children,
  highlights,
  caseSensitive,
  hashtags,
  hashtagStyle = { color: 'blue' },
  onHashtagPress = () => {},
  mentions,
  mentionStyle = { color: 'blue' },
  onMentionPress = () => {},
  emails,
  emailStyle = { color: 'blue' },
  onEmailPress = () => {},
  links,
  linkStyle = { color: 'blue' },
  onLinkPress = () => {},
  ...props
}: HighlightTextProps) => {
  let text = '';
  React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      text += child;
    }
  });
  const chunks = splitText({
    text,
    highlights,
    caseSensitive,
    hashtags,
    mentions,
    emails,
    links,
  });

  return (
    <Text {...props}>
      {chunks.map((chunk, index) => {
        let keyword: Element | null = null;
        if (highlights) {
          highlights.map((item) => {
            const itemRegex =
              item.regexSource.length > 0
                ? new RegExp(
                    `^${item.regexSource.join('|')}$`,
                    caseSensitive ? 'gm' : 'gmi'
                  )
                : null;

            if (itemRegex && itemRegex.test(chunk)) {
              keyword = (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => item.onPress(chunk)}
                >
                  <Text style={item.style}>{chunk}</Text>
                </TouchableWithoutFeedback>
              );
            }
          });
        }
        if (hashtags && hashtagRegexTester.test(chunk)) {
          console.log('1111111' + chunk);
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => onHashtagPress(chunk)}
            >
              <Text style={hashtagStyle}>{chunk}</Text>
            </TouchableWithoutFeedback>
          );
        }
        if (mentions && mentionRegexTester.test(chunk)) {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => onMentionPress(chunk)}
            >
              <Text style={mentionStyle}>{chunk}</Text>
            </TouchableWithoutFeedback>
          );
        }
        if (emails && emailRegexTester.test(chunk)) {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => onEmailPress(chunk)}
            >
              <Text style={emailStyle}>{chunk}</Text>
            </TouchableWithoutFeedback>
          );
        }
        if (links && urlRegexTester.test(chunk)) {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => onLinkPress(chunk)}
            >
              <Text style={linkStyle}>{chunk}</Text>
            </TouchableWithoutFeedback>
          );
        }
        if (keyword) {
          return keyword;
        }
        return <Text key={index}>{chunk}</Text>;
      })}
    </Text>
  );
};

export default HighlightedText;
