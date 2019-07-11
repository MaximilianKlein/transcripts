
const natural = require('natural')
const metaphone = natural.Metaphone
const jaroWinkler = natural.JaroWinklerDistance

module.exports = {
  findSimilar (list, what, itemExtractor, confidence) {
    confidence = confidence || 0.72
    var foundIdx = list.findIndex(
      item => itemExtractor(item).toLowerCase() === what.toLowerCase()
    )
    if (foundIdx === -1) {
      foundIdx = list.findIndex(
        item =>
          metaphone.compare(itemExtractor(item).replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
            what.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()) ||
          metaphone.compare(what.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(), itemExtractor(item).replace(/[^a-zA-Z0-9]/g, '').toLowerCase())
      )
    }
    if (foundIdx === -1) {
      const idMap = list.map((item, idx) => ({
        index: idx,
        value: itemExtractor(item),
        confidence: jaroWinkler(itemExtractor(item).replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
          what.replace(/[^a-zA-Z0-9]/g, '').toLowerCase())
      })).filter(i => i.confidence > confidence)
      if (idMap.length > 0) {
        idMap.sort((a, b) => b.confidence - a.confidence)
        foundIdx = idMap[0].index
      }
    }
    return foundIdx
  }
}
