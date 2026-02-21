<template>
  <button type="button">{{ label }}</button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * The label of the button
     */
    label: string;
  }>(),
  {}
);
</script>
