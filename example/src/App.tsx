import * as React from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import HighlightedText, { Highlight } from 'react-native-highlighter';

export default function App() {
  const headers = new Highlight({
    keywords: ['Use a little—or a lot'],
    style: { fontWeight: 'bold' },
    onPress: (keyword) => Alert.alert(keyword),
    className: 'main-keywords',
  });

  const mainKeywords = new Highlight({
    keywords: ['react native', 'javascript'],
    style: { color: '#6C00FF', fontWeight: 'bold' },
    onPress: (keyword) => Alert.alert(keyword),
  });

  const osKeywords = new Highlight({
    keywords: ['android', 'ios'],
    style: { color: '#E90064', fontWeight: 'bold' },
    onPress: () => {},
  });

  const extraMarkers = new Highlight({
    keywords: ['user interface', 'highlight'],
    style: { backgroundColor: '#F7DB6A' },
    onPress: () => {},
  });

  const text = `React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.
Use a little—or a lot. You can use React Native today in your existing Android and iOS projects or you can create a whole new app from scratch.
For more please visit https://reactnative.dev or read latest posts from @reactnative.
If you have any question about highlighter please feel free to send me mail at shapouran@gmail.com.

#react #reactnative #javascript`;

  /*const html = formatedHtml({
    text,
    highlights: [headers, mainKeywords, osKeywords],
    hashtags: true,
    hashtagUrl: (hashtag) => `https://twitter.com/${hashtag.replace('@', '')}`,
  });*/

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.header}>Normal Text</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.header}>Highlighted Text</Text>
        <HighlightedText
          style={styles.text}
          highlights={[headers, mainKeywords, osKeywords, extraMarkers]}
          hashtags={true}
          hashtagStyle={styles.hashtagStyle}
          mentions={true}
          mentionStyle={styles.mentionStyle}
          emails={true}
          emailStyle={styles.emailStyle}
          links={true}
          onMentionPress={(hashtag) =>
            Alert.alert(`https://twitter.com/${hashtag.replace('@', '')}`)
          }
        >
          {text}
        </HighlightedText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F1F1',
  },
  box: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  header: {
    //fontFamily: 'Apple SD Gothic Neo',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    //fontFamily: 'Apple SD Gothic Neo',
  },
  hashtagStyle: {
    color: '#F54291',
  },
  mentionStyle: { color: '#379237', fontWeight: 'bold' },
  emailStyle: { color: '#FF6D28', fontWeight: 'bold' },
});
