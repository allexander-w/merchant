<template>
    <div class="retail-reviews">
        <div class="retail-reviews-companies">
            <div class="retail-reviews-company" 
                v-for = '(item,index) in reviews'
                :key = 'index'
                :class="{'active-company': item.active}"
                @click = 'chooseReview(item)'
            >
                <img :src="require(`../assets/img/${item.logo}.png`)" alt="">
            </div>
        </div>

        <div class="retail-reviews-text" v-if='currentReview===1'>
            <p class="retail-reviews-text-value">Merchant really helped us get our infrastructure set up for reporting and analytics, through their replication from Salesforce, Marketo and other platforms to our PostgreSQL instance. Their interface is easy to use and allows for easy selection of fields for replication from various objects. Their support and customer service is great too!</p>
            <p class="retail-reviews-name">Фамилия Имя</p>
            <p class="retail-reviews-position">Генеральный директор ТОО Vendor</p>
        </div>

        <div class="retail-reviews-text" v-if='currentReview===2'>
            <p class="retail-reviews-text-value"> up for reporting and analytics, through their replication from Salesforce, Marketo and other platforms to our PostgreSQL instance. Their interface is easy to use and allows for easy selection of fields for replication from various objects. Their support and customer service is great too!</p>
            <p class="retail-reviews-name">Фамилия Имя</p>
            <p class="retail-reviews-position">Генеральный директор ТОО Vendor</p>
        </div>

        <div class="retail-reviews-text" v-if='currentReview===3'>
            <p class="retail-reviews-text-value">Merchant really helped us get our infrastructu other platforms to our PostgreSQL instance. Their interface is easy to use and allows for easy selection of fields for replication from various objects. Their support and customer service is great too!</p>
            <p class="retail-reviews-name">Фамилия Имя</p>
            <p class="retail-reviews-position">Генеральный директор ТОО Vendor</p>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        reviews: [
            {id: 1, logo: 'vector', active: false},
            {id: 2, logo: 'vector', active: true},
            {id: 3, logo: 'vector', active: false}
        ],
        currentReview: 2
    }),
    methods: {
        chooseReview(item) {
            this.reviews.map (item => {
                item.active = false
            })

            item.active = true
            this.currentReview = item.id
        }
    }
}
</script>