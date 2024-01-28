import { ref } from "vue";
import { defineStore } from "pinia";
import { IUser } from "./types";
import { requestGetCsrfToken, requestGetCurrentUser } from "./requests";
import axios from "axios";
// import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const user = ref<IUser | null>(null);

  // const router = useRouter();

  function get() {
    return requestGetCurrentUser()
      .then((data) => {
        if (data.data.id) user.value = data.data;
      })
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          if (e.response?.status == 401) {
            document.location = "/accounts/login/";
          }
        }
      });
  }

  // get user when init
  get();

  return { user, get };
});

export const useCsrfTokenStore = defineStore("csrf", () => {
  const csrfToken = ref<string>("");

  function get() {
    return requestGetCsrfToken().then((data) => {
      csrfToken.value = data.data.csrf_token;
    });
  }

  // get csrf when init
  get();

  return { csrfToken, get };
});
