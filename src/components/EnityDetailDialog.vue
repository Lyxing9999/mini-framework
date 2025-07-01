<script lang="ts" setup>
import { computed } from "vue";
import { getNestedValue } from "../../utils/objectPath";
import type { Field } from "../../types/Field";

const props = defineProps<{
  modelValue: boolean;
  loading?: boolean;
  title: string;
  infoObject: Record<string, any>;
  fields: Field[];
  width?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;

  (event: "close"): void;
}>();
const nestedValues = computed(() => {
  const result: Record<string, any> = {};
  if (!props.infoObject) return result;

  for (const field of props.fields) {
    if (field.children?.length) {
      for (const child of field.children) {
        result[child.key] = getNestedValue(props.infoObject, child.key);
      }
    } else {
      result[field.key] = getNestedValue(props.infoObject, field.key);
    }
  }

  return result;
});

function closeDialog() {
  emit("update:modelValue", false);
  emit("close");
}
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    :title="title"
    :width="width"
    @close="closeDialog"
  >
    <el-skeleton :loading="loading" animated>
      <template v-if="infoObject">
        <el-descriptions :column="1" border>
          <el-descriptions-item
            v-for="(item, index) in fields"
            :key="index"
            :label="item.label"
          >
            <!-- Nested field -->
            <template v-if="item.children?.length">
              <el-descriptions :column="1" border>
                <el-descriptions-item
                  v-for="(child, idx) in item.children"
                  :key="idx"
                  :label="child.label"
                >
                  <template v-if="$slots.custom">
                    <slot
                      name="custom"
                      :item="child"
                      :infoObject="infoObject"
                      :value="nestedValues[child.key] ?? 'N/A'"
                      :fields="fields"
                      :nestedValues="nestedValues"
                    />
                  </template>
                  <template v-else>
                    {{ nestedValues[child.key] ?? "N/A" }}
                  </template>
                </el-descriptions-item>
              </el-descriptions>
            </template>

            <!-- Flat field with custom slot -->
            <template v-else-if="$slots.custom">
              <slot
                name="custom"
                :item="item"
                :infoObject="infoObject"
                :value="nestedValues[item.key] ?? 'N/A'"
                :fields="fields"
                :nestedValues="nestedValues"
              />
            </template>

            <!-- Flat field plain value -->
            <template v-else>
              {{ nestedValues[item.key] ?? "N/A" }}
            </template>
          </el-descriptions-item>
        </el-descriptions>
      </template>
    </el-skeleton>
  </el-dialog>
</template>
