const _ = require("lodash")

const IRRELEVANT_PARTS = ["a", "an"]

function targetNameMatch(target, name) {
  const relevantParts = _.reject(_.split(target.name, " "), (part) => _.includes(IRRELEVANT_PARTS, part))

  return _.some(relevantParts, (part) => _.startsWith(_.lowerCase(part), _.lowerCase(name)))
}

const Finder = {
  create({ scope, target }) {
    return {
      find: function(actor, name) {
        const candidates = _.filter(actor[scope].contents, (thing) => thing.kindOf(target))

        return _.find(candidates, (candidate) => targetNameMatch(candidate, name))
      }
    }
  }
}

module.exports = Finder
