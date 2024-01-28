<script setup lang="ts">
import { ref, watch } from "vue";
import { useUserStore } from "@/modules/user";
import {
  requestBulkUpdateVariableOfUser,
  requestApplyVariablesOfUser,
  useUserVariableStore,
  IVariable,
} from "@/modules/variable";
import {
  ElButton,
  ElTable,
  ElTableColumn,
  ElInput,
  ElIcon,
  ElMessage,
} from "element-plus";
import { Delete, Plus } from "@element-plus/icons-vue";

/* stores */

const userStore = useUserStore();
const userVariableStore = useUserVariableStore();

/* data */
const variables = ref<IVariable[]>([]);
watch(userVariableStore, () => {
  variables.value = userVariableStore.variables;
});
let newId = 0;

/* functions */

function removeVariable(index: number) {
  variables.value.splice(index, 1);
  variables.value = variables.value;
}

function addVariable() {
  newId--;
  variables.value = [
    ...variables.value,
    { id: newId, name: "", text: "", val: "" },
  ];
}

function saveVariables() {
  if (!userStore.user) return;
  requestBulkUpdateVariableOfUser(variables.value, userStore.user.id)
    .then((_) => {
      if (!userStore.user) return;
      requestApplyVariablesOfUser(userStore.user.id)
        .then((_) => {
          userVariableStore.update();
          ElMessage.success("成功保存并校验");
        })
        .catch((_) => {
          ElMessage.error("表达式错误");
          userVariableStore.get();
        });
    })
    .catch((e) => {
      let responseData = e.response.data;
      ElMessage.error(JSON.stringify(responseData));
    });
}

/* hooks */

userVariableStore.get();
</script>

<template>
  <div class="px-16 py-16 space-y-2">
    <h1 class="text-3xl">编辑别名变量</h1>

    <div class="pt-4">
      <el-table :data="variables" class="w-full">
        <el-table-column label="变量名称">
          <template #default="scope">
            <el-input
              v-model="scope.row.name"
              style="font-family: 'Courier New', Courier, monospace"
            />
          </template>
        </el-table-column>

        <el-table-column label="表达式">
          <template #default="scope">
            <el-input
              v-model="scope.row.text"
              style="font-family: 'Courier New', Courier, monospace"
            />
          </template>
        </el-table-column>

        <el-table-column label="当前值">
          <template #default="scope">{{ scope.row.val }}</template>
        </el-table-column>

        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button
              type="danger"
              plain
              @click="removeVariable(scope.$index)"
            >
              <el-icon><Delete /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="addVariable" class="my-2">
        <el-icon><Plus /></el-icon>
      </el-button>
    </div>

    <el-button @click="saveVariables">保存并校验</el-button>
  </div>
</template>
