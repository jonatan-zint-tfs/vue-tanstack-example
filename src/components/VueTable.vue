<script setup lang="ts" generic="RowData extends {}">
import EditableCell from './EditableCell.vue';

defineProps<{
    data: Array<RowData>,
}>()
</script>
<template>
    <table>
        <thead>
            <tr>
                <th v-for="header in Object.keys(data[0])">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data">
                <td v-for="value in Object.values(item)">   
                    <EditableCell v-model="(value as string | number)"></EditableCell>
                </td>
            </tr>
        </tbody>
    </table>
</template>