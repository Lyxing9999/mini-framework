<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";

type Option = string | { label: string; value: string };
type Row = {
  key: string;
  value: string;
  valueType?: "select" | "string" | "number";
  originalKey: string;
  isDraft: boolean;
  dateOnly?: string;
  dateSuffix?: number | null;
  candidateKey?: string | null;
  confirmVisible?: boolean;
  dateSuffixEnabled?: boolean;
};

const props = defineProps<{
  modelValue: Record<string, string>;
  disabled?: boolean;
  draft?: boolean;
  options?: (string | Option)[];
  keyFormat?: RegExp;
  autosave?: boolean;
  valueType?: "select" | "string" | "number";
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, string>): void;
  (e: "save", value: Record<string, string>): void;
  (e: "update:draft", value: boolean): void;
  (e: "refresh"): void;
}>();

const statusOptions = computed<Option[]>(() => {
  return (
    props.options?.map((opt) =>
      typeof opt === "string" ? { label: opt, value: opt } : opt
    ) ?? []
  );
});

const inputType = (row: Row) => row.valueType ?? props.valueType ?? "select";
</script>

<template>
  <el-table-column label="Value" width="180">
    <template #default="{ row }: { row: Row }">
      <div class="flex items-center space-x-2">
        <component
          :is="
            inputType(row) === 'string'
              ? 'el-input'
              : inputType(row) === 'number'
              ? 'el-input-number'
              : 'el-select'
          "
          v-model="row.value"
          size="small"
          style="width: 100%"
          :disabled="disabled"
          :placeholder="
            inputType(row) === 'select'
              ? 'Select option'
              : inputType(row) === 'number'
              ? 'Enter number'
              : 'Enter text'
          "
        >
          <el-option
            v-if="inputType(row) === 'select'"
            v-for="option in statusOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </component>
      </div>
    </template>
  </el-table-column>
</template>
