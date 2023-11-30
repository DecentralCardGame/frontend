<template>
  <transition name="modal-fade">
    <div
      class="modal__backdrop"
      style="z-index: 1000;"
    >
      <div
        aria-describedby="modalDescription"
        aria-labelledby="modalTitle"
        class="modal"
        role="dialog"
      >
        <header
          id="modalTitle"
          class="modal__header"
        >
          <slot name="header">
            Grant Authz Rights
          </slot>
          <button
            aria-label="Close modal"
            type="button"
            class="btn--close"
            @click="close"
          >
            x
          </button>
        </header>
        <div class="modal__body input--transfer">
          Query Grants to
          <input
            v-model="qgrantee"
            type="text"
          >
          <button
            class="btn--default"
            @click="getGrants"
          >
            Get
          </button>
          <div align="left">
            <div
              v-for="(gt, i) in grants"
              :key="gt"
              class="grantBox"
            >
              <div
                class="clickBox"
                @click="show_extra[i] = !show_extra[i]"
              >
                Grant
                <a>{{ getShowName(gt.authorization.msg) }}</a>
              </div>
              <button
                class="btn--default"
                @click="revoke(gt.authorization.msg)"
              >
                Rewoke
              </button>
              <div
                v-show="show_extra[i]"
              >
                Expires at: <a>{{ gt.expiration }}</a>
              </div>
            </div>
          </div>
          <br>
          Grant action
          <select v-model="grant">
            <option
              v-for="option, i in options"
              :key="i"
              :value="option[1]"
            >
              {{ option[0] }}
            </option>
          </select>
          to
          <input
            v-model="grantee"
            type="text"
          >
          <button
            class="btn--default"
            @click="send"
          >
            Send
          </button>
          <a
            v-show="warningText"
            class="warning"
          >
            <br>{{ warningText }}
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { useAddress } from "@/def-composables/useAddress";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useTx } from "@/def-composables/useTx";
import { useQuery } from "@/def-composables/useQuery";
import { validAddress } from "@/utils/validation";

export default {
  name: 'GrantModal',
  props: {
  },
  data() {
    return {
      options: [
        ["vote", "/DecentralCardGame.cardchain.cardchain.MsgVoteCard"],
        ["add artwork", "/DecentralCardGame.cardchain.cardchain.MsgAddArtwork"],
        ["save card content", "/DecentralCardGame.cardchain.cardchain.MsgSaveCardContent"],
        ["play game", "/DecentralCardGame.cardchain.cardchain.MsgConfirmMatch"]],
      grant: "",
      grantee: this.getGrantee(),
      qgrantee: this.getGrantee(),
      warningText: "",
      grants: new Array<any>(),
      show_extra: new Array<boolean>(),
      saved_grantee: "",
    }
  },
  setup() {
    const { loggedIn } = useLoggedIn()
    const { address } = useAddress()
    const { queryGrants, queryGranterGrants, queryGranteeGrants } = useQuery()
    const { grantAuthz, revokeAuthz } = useTx()

    return { loggedIn, address, queryGrants, queryGranterGrants, queryGranteeGrants, grantAuthz, revokeAuthz }
  },
  watch: {
    loggedIn() {
      this.init()
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.loggedIn) {
        if (this.getGrantee()) {
          this.getGrants()
        }
      }
    },
    getShowName(name: string) {
      for (var i = 0; i<this.options.length; i++) {
        if (this.options[i][1] == name) {
          return this.options[i][0]
        }
      }
      return ""
    },
    revoke(msg:string) {
      this.revokeAuthz(this.address, this.saved_grantee, msg, res => {
        console.log("revoke res", res)
        this.getGrants()
      }, _=> {})
    },
    getGrants() {
      if (!validAddress(this.qgrantee)) {
        this.warningText = "Input a proper address!"
        return
      }
      this.queryGranteeGrants(this.qgrantee)
      .then(grants => {
        console.log("grants", grants)
        this.grants = grants.grants
        this.saved_grantee = this.qgrantee
        this.show_extra = []
        for (var i = 0; i<this.grants.length; i++) {
          this.show_extra.push(false)
        }
      })
    },
    close() {
      this.$emit('close')
    },
    send() {
      if (! this.grant) {
        this.warningText = "Choose an action!"
        return
      }
      if (!validAddress(this.grantee)) {
        this.warningText = "Input a proper address!"
        return
      }
      this.warningText = ""
      localStorage.authzAddress = this.grantee
      console.log("authz address from localstorage", localStorage.authzAddress)

      
      this.grantAuthz(this.address, this.grantee, this.grant, 
        res => {
          if (this.getGrantee()) {
            this.getGrants()
          }
          console.log(res)
        },
        err => {
          console.error(err)
        })
    },
    getGrantee() {
      return localStorage.authzAddress
    }
  }
}

</script>
