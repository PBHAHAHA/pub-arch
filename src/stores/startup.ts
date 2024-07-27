import { type List } from "~/schema/startup";
import qs from "qs";
import { filter } from "lodash-es";
/**
 * StartupStore
 */
export const useStartupStore = defineStore("startup", () => {
  /**
   * State 🌴
   */

  const list = ref<List>([]);
  const params = ref({
    sort: {
      field: "created",
      order: "asc",
    },
    pagination: {
      page: 1,
      pageSize: 10,
    },
    filter: {},
  });
  const total = ref<number>();
  const keywords = ref<string>("");

  watch(keywords, (value) => {
    if (!value) {
      params.value.filter = {};
    }
    if (value && value.length >= 2) {
      params.value.filter = {
        $or: [
          {
            name: {
              "∋": `'${value}'`,
            },
            oneline: {
              "∋": `'${value}'`,
            },
            industry: {
              "∋": `'${value}'`,
            },
          },
        ],
      };
    }
  });
  /**
   * Getters 🌵
   */

  const querirs = computed(() => {
    return qs.stringify(params.value, {
      skipNulls: true,
      addQueryPrefix: true,
    });
  });
  /**
   * Actions 🚀
   */

  const setTotal = (data: string | number | null) => {
    if (data) {
      total.value = parseInt(`${data}`, 10);
    }
  };
  // 读取数据
  const read = async () => {
    console.log(querirs.value);
    // 发送请求
    const { data } = await useFetch(`/api/console/startups${querirs.value}`, {
      onResponse({ request, response, options }) {
        setTotal(response.headers.get("x-total-count"));
      },
    });

    // 设置数据
    list.value = data.value || [];
  };

  /**
   * 返回值
   */
  return { read, list, params, total, keywords };
});
