<script setup lang="ts">
import { useAppStore } from "./store/app.store";
import { storeToRefs } from "pinia";
import { getAmountOfVowels } from './utils/vowels'

const appStore = useAppStore();

const { inputFields, isFieldRemovalDisabled, searchedText, isFieldAdditionDisabled } = storeToRefs(appStore);

const { addField, removeField, searchForFields } = appStore;
</script>

<template>
  <div class="container">
    <input
      v-model="searchedText"
      @input="searchForFields"
      :class="{
        highlight: searchedText && inputFields.some((field) => field.isHighlighted),
      }"
      placeholder="Search..."
      class="search-input"
    />
    <div
      v-for="(field, index) in inputFields"
      :key="index"
      class="field-list-fields"
      :class="{ highlight: field.isHighlighted }"
    >
      <button @click="removeField(field)" :disabled="isFieldRemovalDisabled">
        Remove
      </button>
      <input v-model="field.modelValue" @input="searchForFields" />
      <span class="vowel-counter">Vowels: {{ getAmountOfVowels(field.modelValue) }}</span>
    </div>
    <button
      class="field-list-add-field-button"
      @click="addField"
      :disabled="isFieldAdditionDisabled"
    >
      +
    </button>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

.search-input {
  margin-bottom: 16px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  font-size: 1em;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #007bff;
}

.field-list-fields {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  transition: background-color 0.3s;
  flex-wrap: nowrap;
}

.field-list-fields.highlight {
  background-color: #d4edda;
}

.field-list-fields button {
  flex-shrink: 0;
}

.field-list-fields span {
  flex-shrink: 0;
}

input {
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 8px;
  flex-grow: 1;
  font-size: 1em;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 1em;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

.field-list-add-field-button {
  margin-top: 16px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s;
}

.field-list-add-field-button:disabled {
  background-color: #cccccc;
}

.field-list-add-field-button:hover:not(:disabled) {
  background-color: #218838;
}

.vowel-counter {
  font-weight: 500;
  background-color: #e0f7fa;
  padding: 5px 10px;
  border-radius: 8px;
  color: #00796b;
  white-space: nowrap;
}

.highlight {
  background-color: #d4edda;
}

@media (max-width: 768px) {
  .search-input, .field-list-fields {
    width: 80vw;
  }
}

@media (max-width: 480px) {
  .search-input, .field-list-fields {
    width: 90vw;
  }
}
</style>
