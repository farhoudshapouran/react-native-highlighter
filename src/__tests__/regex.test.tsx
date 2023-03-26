import {
  mentionRegexTester,
  hashtagRegexTester,
  emailRegexTester,
  urlRegexTester,
} from '../regexes';

it('Check the input is a Mention', () => {
  expect(mentionRegexTester.test('@farhoodme')).toBeTruthy();
});

it('Check the input is a Hashtag', () => {
  expect(hashtagRegexTester.test('#test')).toBeTruthy();
  expect(hashtagRegexTester.test('#şikayet')).toBeTruthy();
  expect(hashtagRegexTester.test('تست#')).toBeTruthy();
  expect(hashtagRegexTester.test('#测试')).toBeTruthy();
  expect(hashtagRegexTester.test('#тест')).toBeTruthy();
  expect(hashtagRegexTester.test('#prüfen')).toBeTruthy();
});

it('Check the input not a Hashtag', () => {
  expect(hashtagRegexTester.test('test#test')).toBeFalsy();
});

it('Check the input is an Email Address', () => {
  expect(emailRegexTester.test('shapouran@gmail.com')).toBeTruthy();
});

it('Check the input is an Url', () => {
  expect(
    urlRegexTester.test(
      'https://www.asd.google.com/search?q=some+text&param=3#dfsdf'
    )
  ).toBeTruthy();
  expect(urlRegexTester.test('http://www.google.com')).toBeTruthy();
  expect(urlRegexTester.test('www.google.com')).toBeTruthy();
  expect(
    urlRegexTester.test('https://google.com/?q=some+text&param=3#dfsdf')
  ).toBeTruthy();
  expect(urlRegexTester.test('https://www.google.com/api/')).toBeTruthy();
  expect(
    urlRegexTester.test('https://www.google.com/api/login.php')
  ).toBeTruthy();
});
