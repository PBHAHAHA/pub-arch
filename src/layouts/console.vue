<template>
  <div class="flex flex-col md:flex-row">
    <LayoutConsoleAside></LayoutConsoleAside>
    <LayoutConsoleMain>
      <slot></slot>
    </LayoutConsoleMain>
  </div>
</template>
