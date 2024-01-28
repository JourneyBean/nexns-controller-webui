<script setup lang="ts">
import "./style.css";
import "element-plus/dist/index.css";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/modules/user";
import { useUserDomainsStore } from "@/modules/name";
import {
  getHomePageUrl,
  getDomainPageUrl,
  getNewDomainPageUrl,
  getZonePageUrl,
  getRecordPageUrl,
  getVariablePageUrl,
} from "@/modules/route";
import {
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElIcon,
} from "element-plus";
import { Collection, Link, MagicStick, Plus } from "@element-plus/icons-vue";

/* stores */

const router = useRouter();
const userStore = useUserStore();
const userDomainsStore = useUserDomainsStore();

/* data */

const menu = ref();

/* hooks */

watch(userDomainsStore, () => {
  menu.value.open("manage-records");
});
</script>

<template>
  <div class="main">
    <el-container class="relative">
      <el-header
        class="flex flex-row fixed top-0 left-0 w-full shadow-md items-center backdrop-blur-lg bg-white/50"
        style="z-index: 1000"
      >
        <p class="grow text-lg font-bold">NexNS Controller WebUI</p>
        <p class="text-sm text-gray-500">User ID: {{ userStore.user?.id }}</p>
      </el-header>

      <el-container class="relative">
        <el-aside
          width="200px"
          class="fixed left-0 h-full shadow-lg"
          style="top: 60px"
        >
          <el-menu
            ref="menu"
            mode="vertical"
            :collapse="false"
            default-active="dashboard"
            class="h-full py-2"
          >
            <el-menu-item
              index="dasboard"
              @click="router.push(getHomePageUrl())"
            >
              <el-icon><MagicStick /></el-icon>
              <span>状态看板</span>
            </el-menu-item>

            <el-sub-menu index="manage-records">
              <template #title>
                <el-icon><Collection /></el-icon>
                <span>记录管理</span>
              </template>

              <el-sub-menu
                v-for="domain in userDomainsStore.domains"
                :index="`manage-records-${domain.id}`"
              >
                <template #title>
                  <span>{{ domain.domain }}</span>
                </template>

                <el-menu-item
                  :index="`manage-domain-${domain.id}`"
                  @click="router.push(getDomainPageUrl(domain.id))"
                  >域名设置</el-menu-item
                >

                <el-menu-item
                  :index="`manage-zone-${domain.id}`"
                  @click="router.push(getZonePageUrl(domain.id))"
                  >区域管理</el-menu-item
                >
                <el-menu-item
                  :index="`manage-data-${domain.id}`"
                  @click="router.push(getRecordPageUrl(domain.id))"
                  >记录管理</el-menu-item
                >
              </el-sub-menu>

              <el-menu-item
                index="add-domain"
                class="text-gray-400"
                @click="router.push(getNewDomainPageUrl())"
              >
                <el-icon size="small"><Plus /></el-icon>
                <span class="text-sm">添加域名</span>
              </el-menu-item>
            </el-sub-menu>

            <el-menu-item
              index="manage-variables"
              @click="router.push(getVariablePageUrl())"
            >
              <el-icon><Link /></el-icon>
              <span>别名管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main
          class="bg-slate-100"
          style="
            margin-left: 200px;
            margin-top: 60px;
            min-height: calc(100vh - 60px);
          "
        >
          <div class="flex flex-row h-full w-full justify-center">
            <div class="w-full bg-white rounded-lg" style="max-width: 1200px">
              <router-view></router-view>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
