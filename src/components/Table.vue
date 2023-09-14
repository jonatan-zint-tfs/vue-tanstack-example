<script setup lang="ts" generic="RowData extends Record<string, unknown>">
import {
  Cell,
  ColumnDef,
  FlexRender,
  Row,
  getCoreRowModel,
  useVueTable,
} from "@tanstack/vue-table";

const props = defineProps<{
  data: Array<RowData>;
  columnDefinitions: Array<ColumnDef<RowData>>;
}>();

const emit = defineEmits<{
  (
    e: "update:cell",
    value: { rowIndex: number; cellName: keyof RowData; value: unknown },
  ): void;
}>();

const table = useVueTable({
  get data() {
    return props.data;
  },
  columns: props.columnDefinitions,
  getCoreRowModel: getCoreRowModel(),
  meta: {
    updateCellValue: (
      row: Row<RowData>,
      cell: Cell<RowData, unknown>,
      value: unknown,
    ) => {
      emit("update:cell", {
        rowIndex: row.index,
        cellName: cell.column.id,
        value,
      });
    },
  },
});
</script>

<template>
  <div class="data">
    <div class="component-data">
      <p>Component data</p>
      <pre>{{ JSON.stringify(data, null, 4) }}</pre>
    </div>
    <div class="table-data">
      <p>Table data</p>
      <pre>{{
        JSON.stringify(
          table.getCoreRowModel().rows.map(({ original }) => original),
          null,
          4,
        )
      }}</pre>
    </div>
  </div>
  <table>
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          :colSpan="header.colSpan"
        >
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <td v-for="cell in row.getVisibleCells()" :key="cell.id">
          CellValue: {{ cell.getValue() }} |
          <br />
          OriginalValue: {{ cell.row.original[cell.column.id] }}
          <FlexRender
            :render="cell.column.columnDef.cell"
            :props="cell.getContext()"
          />
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr v-for="footerGroup in table.getFooterGroups()" :key="footerGroup.id">
        <th
          v-for="header in footerGroup.headers"
          :key="header.id"
          :colSpan="header.colSpan"
        >
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.footer"
            :props="header.getContext()"
          />
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped>
table {
  width: 100%;
}
.data {
  width: 100%;
  display: flex;
}

.data > div {
  flex: 1;
}
</style>
