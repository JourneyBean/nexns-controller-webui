<script setup lang="ts">
import { IDomain } from "@/modules/name";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElInputNumber,
} from "element-plus";
import { computed } from "vue";

/* props */

interface IProps {
  modelValue: IDomain;
}

const props = defineProps<IProps>();

/* emits */

const emit = defineEmits<{
  (e: "update:modelValue", value: IDomain): void;
  (e: "submit"): void;
  (e: "publish"): void;
}>();

const data = computed<IDomain>({
  get: () => {
    return props.modelValue;
  },
  set: (value: IDomain) => {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <el-form v-if="data" label-width="120px">
    <el-form-item label="域名名称">
      <el-input v-model="data.domain" placeholder="example.com" />
    </el-form-item>

    <el-form-item label="备注描述">
      <el-input v-model="data.description" :rows="2" type="textarea" />
    </el-form-item>

    <el-form-item label="主要DNS">
      <el-input v-model="data.mname" />
    </el-form-item>

    <el-form-item label="管理员邮箱">
      <el-input v-model="data.rname" placeholder="admin.example.com" />
    </el-form-item>

    <el-form-item label="默认TTL">
      <el-input-number v-model="data.ttl" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="emit('submit')">保存</el-button>
      <el-button type="success" @click="emit('publish')">发布</el-button>
    </el-form-item>
  </el-form>
</template>
