<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  IDomainDump,
  requestBatchPushRRsetDumpOfZone,
  requestDumpDomain,
} from "@/modules/name";
import { ElTabs, ElTabPane, ElButton, ElMessage } from "element-plus";
import RecordForm from "./RecordForm.vue";

/* stores */

const route = useRoute();

/* data */

const domainData = ref<IDomainDump | null>(null);
const tabSelected = ref("");
const rrsetsOriginal = ref<any>({});

/* functions */

function getDomainData() {
  requestDumpDomain(Number(route.params.id as string)).then((data) => {
    domainData.value = data.data;
    if (data.data.zones.length)
      tabSelected.value = `zone-id-${data.data.zones[0].id}`;

    rrsetsOriginal.value = {};
    data.data.zones.forEach((zone) => {
      rrsetsOriginal.value[zone.id] = JSON.stringify(zone.rrsets);
    });
  });
}

async function saveAll() {
  if (!domainData.value) return;
  let hasError = false;
  for await (const zone of domainData.value.zones) {
    // 更新内部字段
    let rrsetOrder = 1;
    zone.rrsets.forEach((rrset) => {
      rrset.order = rrsetOrder;
      rrset.zone = zone.id;
      rrsetOrder++;

      let recordOrder = 1;
      rrset.records.forEach((record) => {
        record.order = recordOrder;
        record.rrset = rrset.id;
      });
    });

    try {
      await requestBatchPushRRsetDumpOfZone(zone.rrsets, zone.id);

      ElMessage.success(`更新zone ${zone.name} 成功`);
      rrsetsOriginal.value[zone.id] = JSON.stringify(zone.rrsets);
    } catch (error) {
      ElMessage.error(`更新zone ${zone.name} 失败`);
      hasError = true;
    }
  }

  if (!hasError) getDomainData();
}

/* hooks */

// init
getDomainData();

// route change
watch(route, () => {
  getDomainData();
});
</script>

<template>
  <div class="px-16 py-16 space-y-2">
    <h1 class="text-3xl">编辑记录 {{ domainData?.domain.domain }}</h1>
    <el-tabs v-if="domainData" v-model="tabSelected">
      <el-tab-pane
        v-for="(zone, index) in domainData.zones"
        :label="zone.name"
        :name="`zone-id-${zone.id}`"
      >
        <template #label>
          <span
            v-if="JSON.stringify(zone.rrsets) !== rrsetsOriginal[zone.id]"
            class="text-red-500"
            >* {{ zone.name }}</span
          >
          <span v-else>{{ zone.name }}</span>
        </template>

        <div class="py-4">
          <RecordForm v-model="domainData.zones[index].rrsets" />
        </div>
      </el-tab-pane>
    </el-tabs>
    <div v-if="!domainData?.zones.length">请先添加区域</div>
    <el-button v-if="domainData?.zones.length" type="primary" @click="saveAll"
      >保存</el-button
    >
  </div>
</template>
