import * as React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import HighlightedText, {
  Highlight,
  formatedHtml,
} from 'react-native-highlighter';

export default function App() {
  const mainKeywords = new Highlight({
    keywords: ['text to'],
    style: { backgroundColor: 'blue', color: 'white' },
    onPress: (keyword) => Alert.alert(keyword),
    className: 'main-keywords',
  });

  const positiveKeywords = new Highlight({
    keywords: ['library'],
    style: { backgroundColor: 'green', color: 'white' },
    onPress: (keyword) => Alert.alert(keyword),
  });

  const negativeKeywords = new Highlight({
    keywords: ['email'],
    style: { backgroundColor: 'red', color: 'white' },
    onPress: () => {},
  });

  const text =
    'Text to highlight my email address is shapouran@gmail.com and you can access me @farhoodme with hashtag #awesome and #cool I create this library on 01-01-2021 test link https://stackoverflow.com/questions/42407785/regex-extract-email-from-strings another url www.google.com and some extra hashtag #şikayet تست# #测试';

  const html = formatedHtml({
    text,
    highlights: [mainKeywords, positiveKeywords, negativeKeywords],
    hashtags: true,
    hashtagUrl: (hashtag) => `twiter/${hashtag}`,
  });

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>{text}</Text>
      </View>
      <View style={styles.box}>
        <HighlightedText
          highlights={[mainKeywords, positiveKeywords, negativeKeywords]}
          hashtags={true}
          mentions={true}
          emails={true}
          links={true}
          //caseSensitive={true}
          //numberOfLines={2}
          onMentionPress={(value) =>
            Alert.alert(`https://github.com/${value.replace('@', '')}`)
          }
        >
          {text}
        </HighlightedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    padding: 20,
  },
});
