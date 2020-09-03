<template>
    <div class="services-blocks-wrapper">
        <div class="services-block"
            v-for='(service,index) in services'
            :key = 'index'
            :style ='{backgroundColor: `rgba(${service.color}, .06`}'
        >
            <div class="service-soon" v-if = 'service.isSoon'>
                <p>Скоро</p>
            </div>
            <img :src="require(`../assets/img/${service.logo}.svg`)" alt="" v-if='!service.nologo'>
        </div>
       
        <div class="services-block-add">
            <div class="services-block-dots">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        services: [
            {logo: 'kaspi', color: '239, 70, 53', isSoon: true, nologo: false},
            {logo: '#', color: '65, 104, 158', isSoon: false, nologo: true},
            {logo: '#', color: '65, 104, 158', isSoon: false, nologo: true},
            {logo: '#', color: '65, 104, 158', isSoon: false, nologo: true},
            {logo: '#', color: '65, 104, 158', isSoon: false, nologo: true},
        ]
    })
}
</script>