<template>
    <div class="fast-start-steps">
        <div class="fast-start-step" 
            v-for = '(step, index) in steps'
            :key = 'index'
        >
            <h3 class="fast-start-step-number">{{step.number}}</h3>
            <p class="fast-start-step-desc" :class='{"active-fast-start-link": step.isLink}' @click='routeToReg(step.isLink)'>{{step.desc}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        steps: [
            {number: '1', desc: 'Зарегистрировать аккаунт', isLink: true},
            {number: '2', desc: 'Загрузить товары и ввести начальные остатки'},
            {number: '3', desc: 'Подключить маркетплейсы и торговые площадки'},
            {number: '4', desc: 'Запуск, продажи!'},
        ]
    }),
    methods: {
        routeToReg(link){
            if(link) {this.$router.push("/signup")}
            else {return}
        }
    }
}
</script>

<style lang="scss">
.active-fast-start-link {
    font-size: 20px;
    line-height: 24px;
    color: #005CCC;
    cursor: pointer;
}
.fast-start-step-number {
    display: inline-block;
    background-color: #fff;
    padding: 0 8px;
    margin: 0 -8px;
}
</style>
