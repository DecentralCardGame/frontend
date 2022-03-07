import $RefParser from 'json-schema-ref-parser'
import cardRules from './cardRules.json'

export default {
    install (Vue) {
        $RefParser.dereference(cardRules,
            (err, rules) => {
              if (err) {
                Vue.$cardRules = err
                console.error(err)
              } else {
                console.log("loaded cardrules:", rules.Card)
                Vue.config.globalProperties.$cardRules = rules.Card
                Vue.config.globalProperties.$rulesDefinitions = rules.definitions
                console.log("loaded definitions", rules.definitions)
              }
            })
        }
    }