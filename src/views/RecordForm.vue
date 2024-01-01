<script setup lang="ts">
import { ref, computed } from "vue";
import { IRRsetDump } from "@/modules/name";
import { recordTypeMappings } from "@/modules/dns";
import { VueDraggable } from "vue-draggable-plus";
import {
  ElButton,
  ElSelect,
  ElOption,
  ElInput,
  ElMessage,
  ElIcon,
} from "element-plus";
import { Delete, Plus } from "@element-plus/icons-vue";
import RecordDataForm from "./RecordDataForm.vue";

interface IProps {
  modelValue: IRRsetDump[];
}

const props = defineProps<IProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: IRRsetDump[]): void;
}>();

/* data */

const rrsets = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value: IRRsetDump[]) => {
    emit("update:modelValue", value);
  },
});

/* handle rrset */
let newId = -1;

const addRRsetData = ref<IRRsetDump>({
  id: newId,
  zone: 0,
  name: "",
  description: "",
  type: "A",
  order: 0,
  records: [],
});

function addRRset() {
  let found = false;
  rrsets.value.forEach((rrset) => {
    if (
      rrset.name === addRRsetData.value.name &&
      rrset.type === addRRsetData.value.type
    ) {
      ElMessage.error(`名称 ${rrset.name} 类型 ${rrset.type} 已存在`);
      found = true;
    }
  });
  if (found) return;

  // @ts-ignore
  addRRsetData.value.id = newId;
  addRRsetData.value.order = rrsets.value.length + 1;
  rrsets.value.push(JSON.parse(JSON.stringify(addRRsetData.value)));
  rrsets.value = [...rrsets.value];
  newId--;
}

function deleteRRset(index: number) {
  rrsets.value.splice(index, 1);
}

/* handle record */
function addRecord(rrset: IRRsetDump) {
  rrset.records.push({
    id: newId,
    rrset: 0,
    ttl: 3600,
    data: "",
    order: rrset.records.length + 1,
  });
  newId--;
}

function deleteRecord(rrset: IRRsetDump, index: number) {
  rrset.records.splice(index, 1);
}
</script>

<template>
  <div>
    <VueDraggable
      v-model="rrsets"
      animation="150"
      handle=".handle"
      class="space-y-2"
    >
      <div
        v-for="(rrset, index) in rrsets"
        :key="rrset.name"
        class="flex flex-row space-x-4 rounded-lg pr-4 hover:bg-blue-500 hover:bg-opacity-10 items-center min-h-16"
      >
        <div>
          <span
            class="material-symbols-outlined handle pl-4 text-gray-500 hover:text-black"
          >
            drag_indicator
          </span>
        </div>
        <div class="grow">
          <el-input v-model="rrset.name" />
        </div>
        <div class="w-16">
          <span>{{ rrset.type }}</span>
        </div>
        <div class="w-1/2 py-2">
          <VueDraggable
            v-model="rrset.records"
            animation="150"
            handle=".handle"
          >
            <div
              v-for="(_, index) in rrset.records"
              class="flex flex-row hover:bg-blue-500 hover:bg-opacity-10 items-center py-2 rounded-lg space-x-2"
            >
              <div>
                <span
                  class="material-symbols-outlined handle px-2 text-gray-500 hover:text-black"
                >
                  drag_indicator
                </span>
              </div>
              <RecordDataForm
                v-model="rrset.records[index]"
                :type="rrset.type"
              />
              <span>
                <el-button @click="deleteRecord(rrset, index)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </span>
            </div>
          </VueDraggable>
          <div>
            <el-button @click="addRecord(rrset)">
              <el-icon><Plus /></el-icon>
            </el-button>
          </div>
        </div>
        <div>
          <span>
            <el-button @click="deleteRRset(index)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </span>
        </div>
      </div>
    </VueDraggable>
    <div class="flex flex-row min-h-16 py-2 space-x-2">
      <span>
        <el-input v-model="addRRsetData.name" placeholder="请输入子域" />
      </span>
      <el-select
        v-model="addRRsetData.type"
        filterable
        placeholder="请选择类型"
      >
        <el-option
          v-for="(k, v) in recordTypeMappings"
          :key="k"
          :label="v"
          :value="k"
        />
      </el-select>
      <el-button type="primary" @click="addRRset">添加记录类型</el-button>
    </div>
  </div>
</template>

<style scoped>
.handle {
  cursor: grab;
}
</style>
