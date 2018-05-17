const _ = require("lodash")

function assignAttributes(attributes, options) {
  const unknownAttributes = _.difference(_.keys(options), _.keys(attributes))

  if(_.isEmpty(unknownAttributes)) {
    return _.merge(_.cloneDeep(attributes), options)
  } else {
    throw(`Unknown attributes: ${_.join(unknownAttributes, ", ")}`)
  }
}

function combineObjects(sources) {
  return _.reduce(sources, function(attributes, source) {
    return _.merge(attributes, _.cloneDeep(source))
  })
}

function define({ traits = [], attributes = {}, actions = {} }) {
  const attributesFromTraits = _.map(traits, (trait) => (trait.attributes))
  const actionsFromTraits = _.map(traits, (trait) => (trait.actions))
  const combinedAttributes = combineObjects(_.concat(attributesFromTraits, attributes))
  const combinedActions = combineObjects(_.concat(actionsFromTraits, actions))

  return {
    build: function(options) {
      return _.create(combinedActions, assignAttributes(combinedAttributes, options))
    }
  }
}

const Thing = {
  define
}

module.exports = Thing
