<script setup lang="ts">
import { ref, watch } from "vue";
import {
  IDomain,
  requestDeleteDomain,
  requestApplyDomain,
  requestRetrieveDomain,
  requestUpdateDomain,
} from "@/modules/name";
import { useRoute, useRouter } from "vue-router";
import { useUserDomainsStore } from "@/modules/name";
import { getHomePageUrl } from "@/modules/route";
import { ElButton, ElMessage, ElPopconfirm } from "element-plus";
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
  requestUpdateDomain(domain.value)
    .then((data) => {
      domain.value = data.data;
      ElMessage.success("成功保存域名信息");
      userDomainsStore.update();
    })
    .catch((e) => {
      ElMessage.error("发布失败" + String(e.response.data));
    });
}

function applyDomain() {
  if (!domain.value) return;
  requestApplyDomain(domain.value.id)
    .then(() => {
      ElMessage.success("成功发布域名");
    })
    .catch((e) => {
      ElMessage.error("发布失败" + String(e.response.data));
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
      <DomainForm v-if="domain" v-model="domain" />
      <div v-else style="height: 300px"></div>
    </div>

    <div class="pl-28">
      <el-button type="primary" plain @click="saveDomain">仅保存</el-button>
      <el-button type="success" plain @click="applyDomain"
        >校验并发布</el-button
      >
    </div>

    <div>
      <h2 class="text-lg py-2">危险操作</h2>
      <el-popconfirm
        title="确认删除域名？所有记录都将被删除！"
        @confirm="deleteDomain"
      >
        <template #reference>
          <el-button type="danger" plain>删除域名</el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>
