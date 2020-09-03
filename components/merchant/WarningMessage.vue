<template>
    <div class="warning-message">
        <i class="far fa-question-circle warning-message-icon"></i> <span class="warning-message-desc">{{description}}</span>
    </div>
</template>

<script>
export default {
    props: {
        description: {
            type: String,
            default: () => ''
        }
    }
}
</script>

<style lang="scss">
.warning-message {
    display: flex;
    align-items: center;
    padding: 0 24px;
    background: rgba(#FB6340, .1);
    border-radius: 5px;
    height: 48px;
    &-desc {
        font-size: 16px;
        color: #BD081C;
        padding-left: 12px;
    }
    &-icon {
        font-size: 20px;
        color: #BD081C;
    }
}
</style>