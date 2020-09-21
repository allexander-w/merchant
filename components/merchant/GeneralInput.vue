<template>
    <div class="general-input" :class="{'general-input-invalid': valid}">
            <input :disabled='dis' :type="inputType" @focus='onFocus' v-bind="classKey" @blur='onBlur' class="general-input-self" :value = 'vModel' @change='postModel'>
            <p @click='activateForm' class="general-input-placeholder blur-placeholder" :class='{"active-placeholder": vModel}' v-bind="classKey">
                {{placeholder}} <i class="far fa-question-circle" v-if="iconInfo && needInfo"></i>
            </p>
            <div class="more-functional" v-if='func'>
                <div v-if='!button' class="icon" @click='copyText'> <i class="fal fa-copy general-input-icon"></i> </div>
                <button v-else class="standart-btn yellow-standart-button general-input-btn" @click = 'eventButton'>Подключить</button>
            </div>
            <div v-if='inputType==="password"' class="icon" @click='showPass'> <i class="far fa-eye general-input-icon"></i> </div>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: () => 'Placeholder text'
        },
        vModel: {
            type: String,
            default: () => ''
        },
        numberKey: {
            type: Number,
            default: () => 1
        },
        needInfo: {
            type: Boolean,
            default: () => false
        },
        button: {
            type: Boolean,
            default: () => false
        },
        inputType: {
            type: String,
            default: () => 'text'
        },
        func: {
            type: Boolean,
            default:  () => true
        },
        dis: {
            type: Boolean,
            default: false
        },
        valid: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
       innerModel: '',
       iconInfo: true
    }),
    computed: {
      classKey(){
          return {"data-key": `input${this.numberKey}`}
      }

    },
    methods: {
        postModel(e) {
           this.$emit('vModel', e.target.value)
        },
        showPass(e) {
            const input = document.querySelectorAll('.general-input-self')

            input.forEach(item => {
                if(item.getAttribute('data-key') === `input${this.numberKey}`){
                    item.type === 'password' ? item.type = 'text' : item.type = 'password'
                }
            })
        },
        activateForm(){
            this.onFocus()

            const input = document.querySelectorAll('.general-input-self')

            input.forEach(item => {
                if(item.getAttribute('data-key') === `input${this.numberKey}`){
                    item.focus()
                }
            })
        },
        copyText(){
            navigator.clipboard.writeText(this.vModel)
            .then(() => {
                console.log('copy!')
            })
            .catch(err => {
                console.log('Something went wrong', err)
            })
        },
        onFocus() {

            const placeholder = document.querySelectorAll('.general-input-placeholder')
            placeholder.forEach(item => {
                if(item.getAttribute('data-key') === `input${this.numberKey}`){
                    item.classList.add('active-placeholder')
                }
            })

            this.iconInfo = true

        },
        onBlur() {

            if (this.vModel) {
                return
            }
            const placeholder = document.querySelectorAll('.general-input-placeholder')
            placeholder.forEach(item => {
                if(item.getAttribute('data-key') === `input${this.numberKey}`){
                    item.classList.remove('active-placeholder')
                }
            })
             this.iconInfo = false
        },
        eventButton() {
            this.$emit('buttonHandler')
        }
        
    }
}
</script>

<style lang="scss" scoped>

.general-input {
    margin: 32px 0;
    height: 56px;
    border: 1px solid rgba(#0E6CDD, .2);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 24px;
    position: relative;
    background-color: #fff;
    &-invalid {
      border: 1px solid red;
    }
    &-btn {
        margin-right: -16px;
        height: 40px;
    }
    &-icon {
        color: rgba(0, 92, 204, 0.5);
        font-size: 20px;
        transition: all .3s ease;
    }
    &-placeholder {
        transform: translate(0,0);
        position: absolute;
        left: 25px;
        font-size: 16px;
        color: rgba(#005CCC, .5);
        transition: .3s ease;
        z-index: 2;

    }

    &:focus-within {
        border: 1px solid rgba(#0E6CDD, .5);
        .general-input-placeholder {
            color: rgba(#005CCC, 1);
        }
    }
    &-self {
        border: none;
        width: calc(100% - 24px);
        outline: none;
        font-size: 16px;
        color: #333333;
    }
}
.icon {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(#005CCC, 0);
    transition: all .3s ease;

    &:hover {
        background-color: rgba(#005CCC, .1);
        .general-input-icon {
            color: rgba(0, 92, 204, 1);
        }

    }
}

.active-placeholder {
    transform: translate(0, -30px);
    padding: 0 8px;
    margin: 0 -8px;
    font-size: 14px;
    z-index: 4;
    background-color: #fff;
}

</style>
