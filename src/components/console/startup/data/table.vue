<template>
  <div>
    <div class="mb-4 flex justify-between">
      <ConsoleFormSearch v-model="store.keywords" />
    </div>

    <UTable
      :emptyState="table.emptyState"
      :rows="store.list"
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
        v-model="store.params.pagination.page"
        :pageCount="store.params.pagination.pageSize"
        :total="store.total"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
// 搜索关键词
const keyword = ref("");
const { table } = useAppConfig();

const store = useStartupStore();

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
</script>
