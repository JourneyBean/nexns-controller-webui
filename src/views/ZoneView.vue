<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  IDomain,
  IZone,
  requestBatchPushZoneOfDomain,
  requestListZoneOfDomain,
  requestRetrieveDomain,
} from "@/modules/name";
import { ElTabs, ElTabPane, ElButton, ElPopconfirm } from "element-plus";
import ZoneForm from "./ZoneForm.vue";

/* stores */

const route = useRoute();

/* data */

const domain = ref<IDomain | null>(null);
const zones = ref<IZone[]>([]);
const zonesOriginal = ref<any>({});
const tabSelected = ref("");
let newZoneId = -1;

/* functions */

function getZones(toId: number) {
  requestRetrieveDomain(Number(route.params.id as string)).then((data) => {
    domain.value = data.data;
    requestListZoneOfDomain(data.data.id).then((data) => {
      zones.value = data.data;
      zonesOriginal.value = {};
      data.data.forEach((zone) => {
        zonesOriginal.value[zone.id] = JSON.stringify(zone);
      });
      if (toId) tabSelected.value = `zone-id-${toId}`;
      else if (data.data.length)
        tabSelected.value = `zone-id-${data.data[0].id}`;
    });
  });
}

function saveZone() {
  if (!domain.value) return;
  requestBatchPushZoneOfDomain(zones.value, domain.value.id).then((_) => {
    getZones(0);
  });
}

function createZone() {
  if (!domain.value) return;

  let newZone = {
    id: newZoneId,
    domain: domain.value.id,
    name: "New zone",
    rules: [],
    order: zones.value.length + 1,
  };
  zones.value.push(newZone);

  tabSelected.value = `zone-id-${newZoneId}`;
  zonesOriginal.value[newZoneId] = "{}";
  newZoneId--;
}

function deleteZone(index: number) {
  zones.value.splice(index, 1);
  zones.value = [...zones.value];
  tabSelected.value = `zone-id-${zones.value[0]?.id}`;
}

/* hooks */

// init
getZones(0);

// route change
watch(route, () => {
  getZones(0);
});
</script>

<template>
  <div class="px-16 py-16 space-y-2">
    <h1 class="text-3xl">编辑区域 {{ domain?.domain }}</h1>

    <div>
      <el-button @click="createZone">添加区域</el-button>
      <el-button type="primary" @click="saveZone">保存全部修改</el-button>
    </div>

    <el-tabs v-model="tabSelected">
      <el-tab-pane
        v-for="(zone, index) in zones"
        :label="zone.name"
        :name="`zone-id-${zone.id}`"
      >
        <template #label>
          <span
            v-if="JSON.stringify(zones[index]) !== zonesOriginal[zone.id]"
            class="text-red-500"
            >* {{ zone.name }}</span
          >
          <span v-else>{{ zone.name }}</span>
        </template>
        <ZoneForm v-model="zones[index]" />

        <el-popconfirm
          title="确认删除该区域？该区域的所有记录都将被删除！"
          @confirm="deleteZone(index)"
        >
          <template #reference>
            <el-button type="danger">删除该区域</el-button>
          </template>
        </el-popconfirm>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
