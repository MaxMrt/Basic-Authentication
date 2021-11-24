<template lang="pug">
  div
    slot(
      :attrs="{ errorMessages: activeErrorMessages, success: isValid }"
      :hasErrors="hasErrors"
    )
</template>
<script lang="ts">
import { singleErrorExtractorMixin } from 'vuelidate-error-extractor';
export default {
  name: 'FormErrors',
  extends: singleErrorExtractorMixin,
};
</script>
