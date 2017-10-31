const Thing = require("./Thing")

const DEFAULT_SENSES = {
  SIGHT: { acuity: 50 },
  HEARING: { acuity: 50 },
  TOUCH: { acuity: 50 },
  SMELL: { acuity: 50 },
  TASTE: { acuity: 50 }
}

const Character = Thing.define({
  attributes: {
    isAlive: true,
    isAwake: true,
    senses: DEFAULT_SENSES,
    messages: []
  },
  methods: {
    send: function(event) { this.messages.push(event) }
  }
})

module.exports = Character
