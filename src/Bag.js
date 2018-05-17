const Thing = require("./Thing")
const Container = require("./traits/container")

const Bag = Thing.define({
  traits: [Container]
})

module.exports = Bag
