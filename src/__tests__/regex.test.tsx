import {
  mentionRegexTester,
  hashtagRegexTester,
  emailRegexTester,
  urlRegexTester,
} from '../regexes';

it('Check the input is a Mention', () => {
  expect('@farhoodme').toMatch(mentionRegexTester);
});

it('Check the input is a Hashtag', () => {
  expect('#test').toMatch(hashtagRegexTester);
  expect('#şikayet').toMatch(hashtagRegexTester);
  expect('تست#').toMatch(hashtagRegexTester);
  expect('#测试').toMatch(hashtagRegexTester);
  expect('#тест').toMatch(hashtagRegexTester);
  expect('#prüfen').toMatch(hashtagRegexTester);
});

it('Check the input not a Hashtag', () => {
  expect('test#test').not.toMatch(hashtagRegexTester);
});

it('Check the input is an Email Address', () => {
  expect('shapouran@gmail.com').toMatch(emailRegexTester);
  expect('farhood_sh@hotmail.com.tr').toMatch(emailRegexTester);
});

it('Check the input is an Url', () => {
  expect('https://www.asd.google.com/search?q=some+text&param=3#dfsdf').toMatch(
    urlRegexTester
  );
  expect('http://www.google.com').toMatch(urlRegexTester);
  expect('www.google.com').toMatch(urlRegexTester);
  expect('https://google.com/?q=some+text&param=3#dfsdf').toMatch(
    urlRegexTester
  );
  expect('https://www.google.com/api/').toMatch(urlRegexTester);
  expect('https://www.google.com/api/login.php').toMatch(urlRegexTester);
});
