<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import { State, Action, namespace } from 'vuex-class'
    import Publisher from '@/components/Publisher.vue'

    const ModuleState = namespace('main', State)
    const ModuleAction = namespace('main', Action)

    @Component
    export default class PublisherPage extends Vue {
        @ModuleState('publisher') publisher
        @ModuleState('getPublisherError') getPublisherError
        @ModuleAction('getPublisher') getPublisher

        created() {
            const id = this.$route.params['id']
            this.getPublisher(id)
        }
    }
</script>

<template>
    <div class="content" v-if="publisher">
      <p>id: {{publisher.id || ''}}</p>
      <p>name: {{publisher.name || ''}}</p>
      <p>code: {{publisher.code || ''}}</p>
    </div>
    <div class="error" v-else-if="getPublisherError">
      <p>{{getPublisherError.message}}</p>
    </div>
</template>

<style scoped>
    .content {
        padding: 80px;
        color: black;
        text-align: center;
    }

    .content {
        padding: 80px;
        color: red;
        text-align: center;
    }
</style>
