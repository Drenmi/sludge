const _ = require("lodash")

const IRRELEVANT_PARTS = ["a", "an"]

function alludesTo(target, name) {
  return _.startsWith(_.lowerCase(target), _.lowerCase(name))
}

function strongMatch(target, name) {
  return alludesTo(target.name, name)
}

function weakMatch(target, name) {
  const relevantParts = _.reject(_.split(target.name, " "), (part) => _.includes(IRRELEVANT_PARTS, part))

  return _.some(relevantParts, (part) => alludesTo(part, name))
}

function targetNameMatch(target, name) {
  return strongMatch(target, name) || weakMatch(target, name)
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
