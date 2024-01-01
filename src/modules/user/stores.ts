import { ref } from "vue";
import { defineStore } from "pinia";
import { IUser } from "./types";

export const useUserStore = defineStore("user", () => {
  const user = ref<IUser>({
    id: 0,
    username: "test",
    email: "test@awaworks.net",
  });

  return { user };
});
