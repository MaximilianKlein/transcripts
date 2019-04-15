
import test from 'ava'
const { findSimilar } = require('../src/find_similar')

test('findSimilar matches equal names', t => {
  // given
  const word = 'Milch'
  const list1 = ['A', word, 'B']
  const list2 = [word]
  const list3 = [word, 'B']
  const list4 = ['B', 'A', word]
  // when
  const foundIdx1 = findSimilar(list1, word, x => x)
  const foundIdx2 = findSimilar(list2, word, x => x)
  const foundIdx3 = findSimilar(list3, word, x => x)
  const foundIdx4 = findSimilar(list4, word, x => x)
  // then
  t.is(foundIdx1, 1)
  t.is(foundIdx2, 0)
  t.is(foundIdx3, 0)
  t.is(foundIdx4, 2)
})

test('findSimilar returns -1 if nothing was found', t => {
  // given
  const word = 'Milch'
  const list = ['A', 'B']
  // when
  const foundIdx = findSimilar(list, word, x => x)
  // then
  t.is(foundIdx, -1)
})

test('findSimilar returns -1 if the list was empty', t => {
  // given
  const word = 'Milch'
  const list = []
  // when
  const foundIdx = findSimilar(list, word, x => x)
  // then
  t.is(foundIdx, -1)
})

test('findSimilar matches according to phonetic similarity', t => {
  // given
  const word = 'Mehl'
  const similarWord = 'Mail'
  const list = ['A', 'C', similarWord, 'B']
  // when
  const foundIdx = findSimilar(list, word, x => x)
  // then
  t.is(foundIdx, 2)
})

test('findSimilar ignores spaces when matching', t => {
  // given
  const word = 'Sommer Liste'
  const similarWord = 'Sommerliste'
  const list1 = ['A', 'C', similarWord, 'B']
  const list2 = ['A', 'C', word, 'B']
  // when
  const foundIdx1 = findSimilar(list1, word, x => x)
  const foundIdx2 = findSimilar(list2, similarWord, x => x)
  // then
  t.is(foundIdx1, 2)
  t.is(foundIdx2, 2)
})

test('findSimilar can handle numbers', t => {
  // given
  const word = 'Liste vom 3.'
  const similarWord = 'List vom 3'
  const list1 = ['A', 'C', word, 'B']
  const list2 = ['A', 'C', similarWord, 'B']
  // when
  const foundIdx1 = findSimilar(list1, word, x => x)
  const foundIdx2 = findSimilar(list1, similarWord, x => x)
  const foundIdx3 = findSimilar(list2, word, x => x)
  // then
  t.is(foundIdx1, 2)
  t.is(foundIdx2, 2)
  t.is(foundIdx3, 2)
})

test('uses string distance as fallback', t => {
  // given
  const word = 'von'
  const similarWord = 'vom'
  const list = [similarWord]
  // when
  const foundIdx = findSimilar(list, word, x => x)
  // then
  t.is(foundIdx, 0)
})

test('uses string distance as fallback and selects the most similar', t => {
  // given
  const word = 'von'
  const similarWord = 'vom'
  const list = ['vorm', similarWord]
  // when
  const foundIdx = findSimilar(list, word, x => x)
  // then
  t.is(foundIdx, 1)
})

test('things that should not be similar', t => {
  // given
  const word1 = '<list-id>'
  const notSimilar1 = 'id1'
  // when
  const foundIdx = findSimilar([word1], notSimilar1, x => x)
  // then
  t.is(foundIdx, -1)
})
