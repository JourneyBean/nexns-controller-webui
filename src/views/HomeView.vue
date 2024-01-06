<script setup lang="ts">
import { useUserStore } from "@/modules/user";

const userStore = useUserStore();
</script>

<template>
  <div class="px-16 py-8">
    <h1 class="text-4xl pt-8">欢迎使用<br />NexNS Controller WebUI</h1>
    <h2 class="text-xl py-2">域名解析管理中心</h2>
    <p class="py-2">您现在已以{{ userStore.user.email }}的身份登录。</p>
    <p>在左侧点击域名以进行相关管理操作。</p>
  </div>
</template>
