<template>
  <div class="add" v-if="isLogin">
    <h1>发起辩题</h1>
    <textarea name="content" auto-focus placeholder="例：该不该看情侣手机" v-model.lazy="postData.debateTopic" id="content" />
    </div>
</template>