![react-native-highlighter](https://user-images.githubusercontent.com/7857656/227882432-2d18c750-5c96-4838-8dfd-62bd44cfa18f.jpg)

# react-native-highlighter

A library for highlight what you want and interact with them

## Installation

```sh
npm install react-native-highlighter
```

OR

```sh
yarn add react-native-highlighter
```

## Basic Usage

```js
import HighlightedText, { Highlight } from 'react-native-highlighter';

export default function App() {
  const text = `React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces. You can use React Native today in your existing Android and iOS projects or you can create a whole new app from scratch.`;

  const mainKeywords = new Highlight({
    keywords: ['react native', 'javascript'],
    style: { color: '#6C00FF', fontWeight: 'bold' },
  });

  const extraMarkers = new Highlight({
    keywords: ['user interface', 'highlight'],
    style: { backgroundColor: '#F7DB6A' },
  });

  return (
    <HighlightedText highlights={[mainKeywords, extraMarkers]}>
      {text}
    </HighlightedText>
  );
}
// ...
```

## Full Example

```js
import { StyleSheet, Linking } from 'react-native';
import HighlightedText, { Highlight } from 'react-native-highlighter';

export default function App() {
  const text = `React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.
Use a little—or a lot. You can use React Native today in your existing Android and iOS projects or you can create a whole new app from scratch.
For more please visit https://reactnative.dev or read latest posts from @reactnative.

#react #reactnative #javascript`;

  const mainKeywords = new Highlight({
    keywords: ['react native', 'javascript'],
    style: { color: '#6C00FF', fontWeight: 'bold' },
    onPress: (keyword) => Alert.alert(keyword),
  });

  const extraMarkers = new Highlight({
    keywords: ['user interface', 'highlight'],
    style: { backgroundColor: '#F7DB6A' },
    onPress: () => {},
  });

  return (
    <HighlightedText
      highlights={[mainKeywords, extraMarkers]}
      caseSensitive={false}
      hashtags={true}
      hashtagStyle={styles.hashtagStyle}
      mentions={true}
      mentionStyle={styles.mentionStyle}
      onMentionPress={(mention) =>
        Linking.openURL(`https://twitter.com/${mention.replace('@', '')}`)
      }
      emails={true}
      emailStyle={styles.emailStyle}
      onEmailPress={(email) => Linking.openURL(`mailto:${email}`)}
      links={true}
      onLinkPress={(url) => Linking.openURL(url)}
    >
      {text}
    </HighlightedText>
  );
}

const styles = StyleSheet.create({
  hashtagStyle: { color: '#F54291' },
  mentionStyle: { color: '#379237', fontWeight: 'bold' },
  emailStyle: { color: '#FF6D28', fontWeight: 'bold' },
});
// ...
```

## Available props


| Name                     | Type            |   Default           | Description                                                                |
| ------------------------ | --------------- | ------------------- | ---------------------------------------------------------------------------|
| highlights               | `Highlight[]`   | `null`              | Array of Highlight object                                                  |
| caseSensitive            | `boolean`       | `false`             | Defines that uppercase and lowercase letters are treated as distinct       |    
| hashtags                 | `boolean`       | `false`             | Defines that all hashtags within the text are specified                    |
| hashtagStyle             | `TextStyle`     | `{ color: 'blue' }` | Defines the style of hashtags |
| onHashtagPress           | `func`          | `() => {}`          | Defines what action to take when pressing on the hashtags |
| mentions                 | `boolean`       | `false`             | Defines that all mentions within the text are specified |
| mentionStyle             | `TextStyle`     | `{ color: 'blue' }` | Defines the style of mentions |
| onMentionPress           | `func`          | `() => {}`          | Defines what action to take when pressing on the mentions |
| emails                   | `boolean`       | `false`             | Defines that all emails within the text are specified |
| emailStyle               | `TextStyle`     | `{ color: 'blue' }` | Defines the style of emails |
| onEmailPress             | `func`          | `() => {}`          | Defines what action to take when pressing on the emails |
| links                    | `boolean`       | `false`             | Defines that all links within the text are specified |
| linkStyle                | `TextStyle`     | `{ color: 'blue' }` | Defines the style of links |
| onLinkPress              | `func`          | `() => {}`          | Defines what action to take when pressing on the links |



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
