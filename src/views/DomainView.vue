<script setup lang="ts">
import { ref, watch } from "vue";
import {
  IDomain,
  requestDeleteDomain,
  requestRetrieveDomain,
  requestUpdateDomain,
} from "@/modules/name";
import { useRoute, useRouter } from "vue-router";
import { useUserDomainsStore } from "@/modules/name";
import { getHomePageUrl } from "@/modules/route";
import { ElButton, ElPopconfirm } from "element-plus";
import DomainForm from "./DomainForm.vue";

/* stores */

const route = useRoute();
const router = useRouter();
const userDomainsStore = useUserDomainsStore();

/* data */

const domain = ref<IDomain | null>(null);

/* functions */

function getDomain() {
  requestRetrieveDomain(Number(route.params.id as string)).then((data) => {
    domain.value = data.data;
  });
}

function saveDomain() {
  if (!domain.value) return;
  requestUpdateDomain(domain.value).then((data) => {
    domain.value = data.data;
    userDomainsStore.update();
  });
}

function deleteDomain() {
  if (!domain.value) return;
  requestDeleteDomain(domain.value).then((_) => {
    userDomainsStore.update();
    router.push(getHomePageUrl());
  });
}

/* hooks */

getDomain();
watch(route, () => {
  getDomain();
});
</script>

<template>
  <div class="px-16 py-16 space-y-2">
    <h1 class="text-3xl">编辑域名 {{ domain?.domain }}</h1>

    <div class="pt-4">
      <DomainForm v-if="domain" v-model="domain" @submit="saveDomain" />
      <div v-else style="height: 300px"></div>
    </div>

    <div>
      <h2 class="text-lg pb-2">危险操作</h2>
      <el-popconfirm
        title="确认删除域名？所有记录都将被删除！"
        @confirm="deleteDomain"
      >
        <template #reference>
          <el-button type="danger">删除域名</el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>
