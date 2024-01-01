<script setup lang="ts">
import { computed } from "vue";
import { IZone } from "@/modules/name";
import { ElForm, ElFormItem, ElInput, ElInputNumber } from "element-plus";

/* props */

interface IProps {
  modelValue: IZone;
}

const props = defineProps<IProps>();

/* emit */

const emit = defineEmits<{
  (e: "update:modelValue", value: IZone): void;
  (e: "submit"): void;
}>();

/* zone data */
const name = computed({
  get: () => props.modelValue.name,
  set: (value: string) => {
    emit("update:modelValue", { ...props.modelValue, name: value });
  },
});

const order = computed({
  get: () => props.modelValue.order,
  set: (value: number) => {
    emit("update:modelValue", { ...props.modelValue, order: value });
  },
});

const rulesText = computed({
  get: () => {
    let text = "";
    props.modelValue.rules.forEach((rule) => {
      text += rule + "\n";
    });
    if (text.length) text = text.slice(0, text.length - 1);
    return text;
  },
  set: (value: string) => {
    const rules = value.split("\n").map((rule) => rule.trim());
    // .filter((rule) => rule !== "");
    emit("update:modelValue", { ...props.modelValue, rules });
  },
});
</script>

<template>
  <el-form label-width="120px" label-position="top">
    <el-form-item label="区域名称">
      <el-input v-model="name" placeholder="LAN Zone" />
    </el-form-item>

    <el-form-item label="排序">
      <el-input-number v-model="order" />
    </el-form-item>

    <el-form-item label="匹配CIDR (一行一个)">
      <el-input
        v-model="rulesText"
        :placeholder="'192.168.1.0/24\nfd00::/7'"
        :rows="10"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
