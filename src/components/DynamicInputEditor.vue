<script setup lang="ts">
import { ref, computed, watchEffect, nextTick } from "vue";
import { Edit, Close } from "@element-plus/icons-vue";
import type { CustomItem } from "../types/field";

interface TagObject {
  label: string;
  order?: number;
}

type ModelValue =
  | string
  | number
  | string[]
  | TagObject[]
  | Record<string, any>
  | Date;

const props = defineProps<{
  modelValue: ModelValue;
  label: string;

  disabled?: boolean;
  type?: CustomItem;
  placeholder?: string;
  dateDefaultVal?: Date;
  isDate?: boolean;
  isDict?: boolean;
  readonly?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: ModelValue): void;
  (e: "save", value: ModelValue): void;
  (e: "cancel"): void;
  (e: "info", message: string): void;
  (e: "validate", success: boolean): void;
}>();

const tags = ref<string[]>([]);
const showInputField = ref(false);
const isAddingTag = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const isArray = computed(() => Array.isArray(props.modelValue));
const isDict = computed(
  () =>
    props.isDict &&
    props.modelValue !== null &&
    !Array.isArray(props.modelValue)
);
const isTag = computed(
  () =>
    typeof props.modelValue === "object" &&
    props.modelValue !== null &&
    !Array.isArray(props.modelValue) &&
    "label" in props.modelValue
);

const inputValue = ref<string | number | Record<string, string> | null>(null);

watchEffect(() => {
  const newVal = props.modelValue;

  if (Array.isArray(newVal)) {
    tags.value = newVal.map((item) =>
      typeof item === "string" ? item : (item as TagObject).label ?? ""
    );
    inputValue.value = "";
  } else if (isDict.value) {
    inputValue.value = { ...(newVal as Record<string, string>) };
    tags.value = [];
  } else if (typeof newVal === "number") {
    inputValue.value = newVal;
    tags.value = [];
  } else if (typeof newVal === "string") {
    inputValue.value = newVal;
    tags.value = [];
  } else if (isTag.value) {
    inputValue.value = (newVal as TagObject).label ?? "";
    tags.value = [];
  } else {
    inputValue.value = "";
    tags.value = [];
  }
});

function showInput() {
  showInputField.value = true;
}

function startAddingTag() {
  isAddingTag.value = true;
  inputValue.value = "";
  nextTick(() => inputRef.value?.focus());
}

function addTag() {
  const val = inputValue.value?.toString().trim();
  if (!val) return;

  if (tags.value.includes(val)) {
    emit("info", `"${val}" is already added and cannot be duplicated.`);
    emit("validate", false);
    inputValue.value = "";
    isAddingTag.value = false;
    return;
  }

  emit("validate", true);
  tags.value.push(val);
  inputValue.value = "";
  isAddingTag.value = false;
}

function removeTag(index: number) {
  tags.value.splice(index, 1);
}

function submit() {
  let newValue: unknown;
  if (isArray.value) {
    newValue = tags.value;
  } else if (isDict.value) {
    newValue = { ...(inputValue.value as Record<string, string>) };
  } else if (isTag.value) {
    newValue = {
      ...(props.modelValue as TagObject),
      label: inputValue.value,
    };
  } else {
    newValue = inputValue.value;
  }

  emit("update:modelValue", newValue);
  emit("save", newValue);
  showInputField.value = false;
}

function cancel() {
  inputValue.value =
    typeof props.modelValue === "string"
      ? props.modelValue
      : (props.modelValue as TagObject)?.label ?? "";
  emit("cancel");
  showInputField.value = false;
  isAddingTag.value = false;
}

function handleDictUpdate(newValue: Record<string, string>) {
  inputValue.value = newValue;
  emit("update:modelValue", newValue);
}
</script>
<template>
  <div>
    <!-- ARRAY HANDLING -->
    <template v-if="isArray">
      <div v-if="showInputField" class="flex flex-wrap gap-2 items-center">
        <el-tag
          v-for="(tag, i) in tags"
          :key="i"
          closable
          @close="removeTag(i)"
          size="small"
        >
          {{ tag }}
        </el-tag>

        <!-- Tag-style input -->
        <el-tag v-if="isAddingTag" class="px-0">
          <el-input
            ref="inputRef"
            v-model="inputValue as unknown as string | null"
            class="w-20"
            size="small"
            @keyup.enter="addTag"
            @blur="addTag"
            style="border: none; outline: none"
          />
        </el-tag>

        <el-tag
          v-else
          type="info"
          class="cursor-pointer"
          @click="
            () => {
              isAddingTag = true;
              inputValue = '';
              nextTick(() => inputRef?.focus());
            }
          "
        >
          + {{ label }}
        </el-tag>

        <div class="mt-2 w-full flex justify-end gap-2">
          <el-button size="small" @click="cancel">Cancel</el-button>
          <el-button type="primary" size="small" @click="submit"
            >Save</el-button
          >
        </div>
      </div>

      <div
        v-else
        class="flex flex-wrap gap-2 cursor-pointer"
        @click="showInput"
      >
        <el-tag
          v-for="(tag, i) in tags"
          :key="i"
          closable
          @close.stop="removeTag(i)"
          size="small"
        >
          {{ tag }}
        </el-tag>
        <el-tag type="info" class="cursor-pointer">+ New Tag</el-tag>
      </div>
    </template>

    <template v-else>
      <div
        v-if="!showInputField"
        class="cursor-pointer flex justify-between items-center"
        @click="showInput"
      >
        <span class="truncate max-w-[170px] block">{{
          inputValue || props.placeholder || "—"
        }}</span>
        <span v-if="!disabled" class="flex justify-end items-center space-x-1">
          <el-icon><Edit /></el-icon>
        </span>
      </div>
      <el-input-number
        v-else-if="type === 'number' || type === 'float'"
        v-model="inputValue as unknown as number | null"
        :disabled="disabled"
        size="small"
        class="w-full"
        :placeholder="label"
      >
        <template #suffix>
          <div class="flex items-center space-x-1">
            <el-popconfirm
              title="Are you sure you want to save the changes?"
              confirm-button-text="Yes"
              cancel-button-text="No"
              @confirm="submit"
            >
              <template #reference>
                <el-button
                  class="compact-btn"
                  type="text"
                  size="small"
                  icon="Edit"
                  title="Save"
                />
              </template>
            </el-popconfirm>

            <el-button
              class="compact-btn"
              type="text"
              size="small"
              :icon="Close"
              @click="cancel"
              title="Cancel"
            />
          </div> </template
      ></el-input-number>
      <div
        v-else-if="type === 'date'"
        class="flex items-center space-x-2 w-full"
      >
        <el-date-picker
          v-model="inputValue as unknown as Date | undefined"
          :disabled="disabled"
          size="small"
          class="w-full"
          :placeholder="label"
          :default-value="props.dateDefaultVal"
        />
        <div v-if="!disabled" class="flex items-center space-x-1">
          <el-popconfirm
            title="Are you sure you want to save the changes?"
            confirm-button-text="Yes"
            cancel-button-text="No"
            @confirm="submit"
          >
            <template #reference>
              <el-button
                class="compact-btn"
                type="text"
                size="small"
                :icon="Edit"
                title="Save"
              />
            </template>
          </el-popconfirm>

          <el-button
            class="compact-btn"
            type="text"
            size="small"
            :icon="Close"
            @click="cancel"
            title="Cancel"
          />
        </div>
      </div>

      <el-input
        v-else-if="type === 'email'"
        v-model="inputValue as unknown as string | null"
        type="email"
        size="small"
        class="w-full"
        :placeholder="label"
      >
        <template #suffix>
          <div class="flex items-center space-x-1">
            <el-popconfirm
              title="Are you sure you want to save the changes?"
              confirm-button-text="Yes"
              cancel-button-text="No"
              @confirm="submit"
            >
              <template #reference>
                <el-button
                  class="compact-btn"
                  type="text"
                  size="small"
                  :icon="Edit"
                  title="Save"
                />
              </template>
            </el-popconfirm>

            <el-button
              class="compact-btn"
              type="text"
              size="small"
              :icon="Close"
              @click="cancel"
              title="Cancel"
            />
          </div>
        </template>
      </el-input>
      <div v-else-if="type === 'dict'">
        <slot
          name="dict"
          :v-model="inputValue"
          :disabled="disabled"
          :label="label"
          :readonly="readonly"
          :type="type"
          :placeholder="placeholder"
          :is-dict="isDict"
          :update-model-value="handleDictUpdate"
          :save="submit"
          :cancel="cancel"
        />
      </div>
      <el-input
        v-else
        v-model="inputValue as unknown as string | null"
        size="small"
        class="w-full"
        :disabled="disabled"
        :placeholder="label"
      >
        <template #suffix>
          <div class="flex items-center space-x-1">
            <el-popconfirm
              title="Are you sure you want to save the changes?"
              confirm-button-text="Yes"
              cancel-button-text="No"
              @confirm="submit"
            >
              <template #reference>
                <el-button
                  class="compact-btn"
                  type="text"
                  size="small"
                  :icon="Edit"
                  title="Save"
                />
              </template>
            </el-popconfirm>

            <el-button
              class="compact-btn"
              type="text"
              size="small"
              :icon="Close"
              @click="cancel"
              title="Cancel"
            />
          </div>
        </template>
      </el-input>
    </template>
  </div>
</template>

<style scoped>
.button-new-tag {
  margin-top: 4px;
  font-size: 12px;
  padding: 2px 6px;
}
:deep(.el-input__wrapper) {
  box-shadow: none !important;
  padding: 0 !important;
  background-color: transparent !important;
}
</style>
