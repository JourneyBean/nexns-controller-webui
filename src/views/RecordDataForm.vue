<script setup lang="ts">
import { IRRset, IRecordData } from "@/modules/name";
import { ElInput, ElInputNumber } from "element-plus";
import { computed } from "vue";

/* props & emits */
interface IProps {
  modelValue: IRecordData;
  type: IRRset["type"];
}
const props = defineProps<IProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: IRecordData): void;
}>();

const record = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value: IRecordData) => {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div>
    <el-input-number v-model="record.ttl" />
  </div>
  <div class="grow">
    <el-input
      v-if="['A', 'AAAA', 'CNAME', 'NS', 'SRV', 'SOA'].includes(props.type)"
      v-model="record.text"
    />
    <el-input v-else v-model="record.text" :rows="3" type="textarea" />
  </div>
</template>
