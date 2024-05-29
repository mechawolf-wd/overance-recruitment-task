import { InputField } from '../types/app.types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { isVowel } from '../utils/vowels'

export const useAppStore = defineStore('app', () => {
    // Fields
    const inputFields = ref<InputField[]>([
        { modelValue: '', isHighlighted: false },
    ])

    const addField = () => {
        if (inputFields.value.length > 9) return

        inputFields.value.push({ modelValue: '', isHighlighted: false })
    }

    const removeField = (field: InputField) => {
        if (inputFields.value.length > 1) {
            const fieldIndex = inputFields.value.indexOf(field)

            inputFields.value.splice(fieldIndex, 1)
        }
    }

    const isFieldRemovalDisabled = computed(() => inputFields.value.length < 2)
    const isFieldAdditionDisabled = computed(() => inputFields.value.length > 9)

    // Searching
    const searchedText = ref<string>('')

    const searchForFields = () => {
        const trimmedSearchedText = searchedText.value.trim()

        if (trimmedSearchedText === '') {
            inputFields.value.forEach((field: InputField) => {
                field.isHighlighted = false
            })

            return
        }

        inputFields.value.forEach((field: InputField) => {
            field.isHighlighted = field.modelValue.includes(searchedText.value)
        })
    }

    return {
        inputFields,
        searchedText,
        isFieldRemovalDisabled,
        isFieldAdditionDisabled,

        addField,
        removeField,
        searchForFields,

        isVowel,
    }
})
