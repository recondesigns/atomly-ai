<template>
  <button type="button">{{ label }}</button>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    label: string;
  }>(),
  {}
);
</script>
