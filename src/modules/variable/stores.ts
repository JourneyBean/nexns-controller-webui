import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { IVariable } from "./types";
import { useUserStore } from "../user";
import {
  requestApplyVariablesOfUser,
  requestListVariablesOfUser,
} from "./requests";

export const useUserVariableStore = defineStore("variables", () => {
  const userStore = useUserStore();

  const variables = ref<IVariable[]>([]);

  const get = () => {
    return requestListVariablesOfUser(userStore.user.id).then((data) => {
      variables.value = data.data;
    });
  };

  const update = () => {
    return requestApplyVariablesOfUser(userStore.user.id).then((data) => {
      variables.value = data.data;
    });
  };

  watch(userStore, get);

  return { variables, get, update };
});
