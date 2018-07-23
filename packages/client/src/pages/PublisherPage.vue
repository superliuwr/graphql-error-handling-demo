<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import { State, Action, namespace } from 'vuex-class'
    import Publisher from '@/components/Publisher.vue'

    const ModuleState = namespace('main', State)
    const ModuleAction = namespace('main', Action)

    @Component
    export default class PublisherPage extends Vue {
        @ModuleState('publisher') publisher
        @ModuleAction('getPublisher') getPublisher

        created() {
            const id = this.$route.params['id']
            this.getPublisher(id)
        }
    }
</script>

<template>
    <div class="content">
      <p>id: {{publisher ? publisher.id : ''}}</p>
      <p>name: {{publisher ? publisher.name : ''}}</p>
      <p>code: {{publisher ? publisher.code : ''}}</p>
    </div>
</template>

<style scoped>
    .content {
        padding: 80px;
        color: black;
        text-align: center;
    }
</style>
