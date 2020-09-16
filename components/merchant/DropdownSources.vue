<template>
    <div class="general-dropdown" :class="{'active-body-dropdown': isOpen}" v-click-outside="hide" @click="isOpen = true">
            <p class="general-dropdown-self"> {{ dropdownTitle}} </p>
            <p class="general-dropdown-placeholder" :class="{'active-placeholder-dropdown': isOpen}">
                {{placeholder}}
            </p>
            <div class="icon">
                <i class="fas fa-caret-up general-dropdown-icon" v-if='isOpen'></i>
                <i class="fas fa-caret-down general-dropdown-icon" v-else></i>
            </div>
            <div class="general-dropdown-body" v-if='isOpen'>
                <div class="general-dropdown-body-item"
                    v-for='(item, index) in items'
                    :key = 'index'
                    @click="chooseItem(item)"
                >
                    {{item.name}}
                </div>
            </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
    props: {
        choosedElements:{
            type: Array,
            default: () =>[]
        },
        changing: {
            type: Boolean,
            default: false
        },
        items: {
            type: Array,
            default: () => []
        },
        placeholder: {
            type: String,
            default: () => 'placeholder'
        },
        dataObject: {
            type: Object,
            default: () => {}
        },
        name: {
            type: String,
            default: ''
        },
        emptyForm: {
            type: Boolean,
            default: false
        }
    },
    directives: {
        ClickOutside
    },
    data: () => ({
        dropdownTitle: '',
        isOpen: false
    }),
    computed: {
        change() {
            return this.$store.state.sources.change
        }
    },
    watch: {
        change(){
            if(this.changing){
                this.clearFields()
            }
        }
    },
    methods: {
        clearFields(){
            this.dropdownTitle = 'Выберите элемент'
        },
        chooseItem(item) {
            if(this.choosedElements.length){
                let flag = false
                this.choosedElements.map(arrItem => {
                    const isProp = arrItem.hasOwnProperty(this.name)
                    if(arrItem.id === item.id) {
                        alert('Нельзя выбирать одинаковые позиции')
                        flag = true
                        this.dropdownTitle = 'Выберите элемент'
                        this.$emit('deleteElem', this.name)
                        this.isOpen = false
                    }
                    if (isProp) {
                        this.dropdownTitle = 'Выберите элемент'
                        this.$emit('deleteElem', this.name)
                        this.isOpen = false
                    }
                })

                 if(!flag){
                    this.dropdownTitle = item.name,
                    this.$emit('choosedItem', {item, name: this.name})
                    this.isOpen = false
                }
            } else {
                this.dropdownTitle = item.name
                this.$emit('choosedItem', item)
                this.$emit('funnel', item)
                this.isOpen = false
            }
        },
        hide(){
            this.isOpen = false
        },
        currentElement(){
            if(!Object.keys(this.dataObject).length){
               this.dropdownTitle = 'Выберите элемент'
            } else {
                if(!this.name){
                    this.items.map(item => {
                        if (item.id === this.dataObject.params.category) {
                            this.dropdownTitle = item.name
                        }
                    })
                }
                else {
                    this.items.map(item => {
                        if (item.id.toString() === this.dataObject.params.statuses[this.name].toString()) {
                            this.dropdownTitle = item.name
                            this.$emit('beginChoose', {item, name: this.name})
                        }
                    })
                }
            }
        }
    },
    mounted(){
        this.currentElement()
    }
}
</script>

<style lang="scss">

.general-dropdown {
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
    cursor: pointer;
    background-color: #fff;
    &-icon {
        color: #0E6CDD;
        font-size: 16px;
    }
    &-body {
        position: absolute;
        background: #FFFFFF;
        box-shadow: 0px 0px 40px rgba(51, 51, 51, 0.08);
        border-radius: 5px;
        width: inherit;
        top: calc(56px + 8px);
        left: 0;
        min-height: 56px;
        padding: 8px;
        z-index: 99;
        
        &-item {
            height: 40px;
            display: flex;
            align-items: center;
            border-radius: 5px;
            transition: .5s;
            cursor: pointer;
            padding: 0 16px;
            &:hover {
                background: rgba(#0E6CDD, .06);
            }
        }
    }
    &-placeholder {
        position: absolute;
        left: 25px;
        transform: translate(0, -30px);
        padding: 0 8px;
        margin: 0 -8px;
        font-size: 14px;
        z-index: 4;
        color: rgba(#005CCC, .5);
        background-color: #fff;
    }
}
.active-placeholder-dropdown {
    color: #005CCC;
}
.active-body-dropdown {
    
    border: 1px solid rgba(#0E6CDD, .5);
}
</style>