export default defineAppConfig({
  ui: {
    primary: "violet",
    button: {
      font: "font-light",
    },
    table: {
      wrapper: "relative overflow-x-scroll",
      th: {
        base: "text-left rtl:text-right whitespace-nowrap",
      },
      td: {
        base: "whitespace-nowrap overflow-x-scroll max-w-xl",
      },
      default: {
        sortAscIcon: "i-solar-sort-from-top-to-bottom-linear",
        sortDescIcon: "i-solar-sort-from-bottom-to-top-linear",
        sortButton: {
          icon: "i-solar-sort-vertical-linear",
          color: "black",
          variant: "link",
        },
      },
    },
  },
  // 数据表格
  table: {
    emptyState: { icon: "i-solar-ufo-3-linear", label: "暂无数据" },
    loadingState: { icon: "i-solar-radar-2-linear", label: "加载中..." },
  },
  // 分页器
  pagination: {
    activeButton: { variant: "ghost" },
    inactiveButton: { variant: "ghost" },
    prevButton: {
      icon: "i-solar-alt-arrow-left-linear",
      variant: "ghost",
      color: "white",
    },
    nextButton: {
      icon: "i-solar-alt-arrow-right-linear",
      variant: "ghost",
      color: "white",
    },
  },
});
