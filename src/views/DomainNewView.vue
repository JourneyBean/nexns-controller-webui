<script setup lang="ts">
import { ref } from "vue";
import { IDomain, requestCreateDomainOfUser } from "@/modules/name";
import { useRouter } from "vue-router";
import { useUserStore } from "@/modules/user";
import { useUserDomainsStore } from "@/modules/name";
import { getDomainPageUrl } from "@/modules/route";
import { ElButton, ElMessage } from "element-plus";
import DomainForm from "./DomainForm.vue";

/* stores */

const router = useRouter();
const userStore = useUserStore();
const userDomainsStore = useUserDomainsStore();

/* data */

const domain = ref<IDomain>({
  id: 0,
  user: 0,
  domain: "",
  description: "",
  mname: "ns1.awaworks.net",
  rname: "",
  serial: "1234567890",
  refresh: 60,
  retry: 60,
  expire: 60,
  ttl: 3600,
  enable_dnssec: false,
});

/* functions */

function save() {
  domain.value.user = userStore.user.id;
  requestCreateDomainOfUser(domain.value, userStore.user.id).then((data) => {
    userDomainsStore
      .update()
      .then(() => {
        router.push(getDomainPageUrl(data.data.id));
      })
      .catch((e) => {
        ElMessage.error("创建域名失败" + String(e.response.data));
      });
  });
}
</script>

<template>
  <div class="px-16 py-16 space-y-2">
    <h1 class="text-3xl">添加域名</h1>

    <div class="pt-4">
      <DomainForm v-if="domain" v-model="domain" @submit="save" />
    </div>

    <div class="pl-28">
      <el-button type="primary" plain>保存</el-button>
    </div>
  </div>
</template>
