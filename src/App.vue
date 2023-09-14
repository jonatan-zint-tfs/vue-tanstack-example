<script setup lang="ts">
import { createColumnHelper } from '@tanstack/vue-table';
import Table from './components/Table.vue';
import { h, ref } from 'vue';
import EditableCell from './components/EditableCell.vue';

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}


const data = ref<Array<Person>>([
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
])

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.group({
    header: 'Name',
    columns: [
      columnHelper.accessor('firstName', {
        cell: info => h(EditableCell, {
          modelValue: info.getValue(),
          'onUpdate:modelValue': (value) => {
            info.table.options.meta?.updateCellValue(info.row, info.cell, value)
          } 
        }),
      }),
      columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        cell: info => h(EditableCell, {
          modelValue: info.getValue(),
          'onUpdate:modelValue': (value) => {
            info.table.options.meta?.updateCellValue(info.row, info.cell, value)
          } 
        }),
        header: () => 'Last Name',
      }),
    ],
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: info => h(EditableCell, {
      modelValue: info.getValue(),
      'onUpdate:modelValue': (value) => {
        info.table.options.meta?.updateCellValue(info.row, info.cell, value)
      } 
    })
  }),
  columnHelper.accessor('visits', {
    header: () => 'Visits',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
  }),
    
]

const updateCell = ({rowIndex, cellName, value}: { rowIndex: number, cellName: keyof Person, value: unknown }) => {
  // @ts-ignore
  data.value[rowIndex][cellName] = value;
}
</script>

<template>
  <div class="wrapper">
    <div class="tanstack-example">
    <h3>Tanstack Table</h3>
      <Table :data="data" :column-definitions="columns" @update:cell="updateCell" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

</style>
