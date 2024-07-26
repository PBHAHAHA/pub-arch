<template>
  <div>
    <div class="mb-4 flex justify-between">
      <ConsoleFormSearch v-model="keyword" />
    </div>

    <UTable
      :emptyState="table.emptyState"
      :loading="pending"
      :rows="rows"
      :columns="columns"
      :loadingState="table.loadingState"
    >
      <template #avatar-data="{ row }">
        <UAvatar :src="row.avatar" :alt="row.name" />
      </template>

      <template #name-data="{ row }">
        <div class="flex gap-2 items-center">
          <div>{{ row.name }}</div>
          <UTooltip text="头部估值" v-if="row.isTopValuation">
            <UIcon
              name="i-solar-medal-ribbons-star-linear"
              class="text-xs text-amber-400 dark:text-amber-300"
            />
          </UTooltip>
          <UTooltip text="头部营收" v-if="row.isTopRevenue">
            <UIcon
              name="i-solar-money-bag-linear"
              class="text-xs text-violet-400 dark:text-violet-300"
            />
          </UTooltip>
        </div>
      </template>
    </UTable>

    <div class="mb-4 flex justify-center items-center">
      <ConsoleNavigationPagination
        v-model="page"
        :pageCount="pageCount"
        :total="total"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
// 搜索关键词
const keyword = ref("");
const { table } = useAppConfig();

// 请求数据
const { data, pending } = await useLazyFetch<any>("/api/console/startups");

// 行
const rows = computed(() => {
  if (!data.value) return [];
  return filtered.value.slice(
    (page.value - 1) * pageCount.value,
    page.value * pageCount.value
  );
});

// 栏
const columns = [
  { key: "avatar" },
  {
    key: "name",
    label: "名称",
  },
  {
    key: "oneline",
    label: "简介",
  },
  {
    key: "industry",
    label: "行业",
    sortable: true,
  },
  {
    key: "teamSize",
    label: "团队",
    sortable: true,
  },
];

// 过滤
const filtered = computed(() => {
  if (!data.value) return [];

  return data.value.filter((item: any) => {
    return Object.values(item).some((value) => {
      return String(value)
        .toLowerCase()
        .includes(keyword.value.toLocaleLowerCase());
    });
  });
});

// 当前页
const page = ref(1);

// 每页数量
const pageCount = ref(5);
// 总数
const total = computed(() => {
  return filtered.value.length;
});
</script>
