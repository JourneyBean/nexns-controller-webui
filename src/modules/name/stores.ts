import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { IDomain } from "./types";
import { useUserStore } from "../user/stores";
import { requestGetDomainsOfUser } from "./requests";

export const useUserDomainsStore = defineStore("domains", () => {
  const userStore = useUserStore();

  const domains = ref<IDomain[]>([]);

  const update = () => {
    return requestGetDomainsOfUser(userStore.user.id).then((data) => {
      domains.value = data.data;
    });
  };

  watch(userStore, update);

  return { domains, update };
});
