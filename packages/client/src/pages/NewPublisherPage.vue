<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { State, Action, namespace } from 'vuex-class'

  const ModuleState = namespace('main', State)
  const ModuleAction = namespace('main', Action)

  @Component
  export default class NewPublisherPage extends Vue {
      @ModuleAction('newPublisher') newPublisher

      formInline= {
        name: '',
        code: '',
      }

      onSubmit() {
        this.newPublisher(this.formInline)
      }
  }
</script>

<template>
  <div class="content">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Name">
        <el-input v-model="formInline.name" placeholder="name"></el-input>
      </el-form-item>
      <el-form-item label="Code">
        <el-input v-model="formInline.code" placeholder="code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
  .content {
      padding: 80px;
      color: black;
      text-align: center;
  }
</style>
