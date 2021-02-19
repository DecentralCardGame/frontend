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
                Vue.prototype.$cardRules = rules.Card
              }
            })
        }
    }