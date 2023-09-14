import { RowData } from '@tanstack/table-core';
import { Row, Cell } from '@tanstack/vue-table';

declare module '@tanstack/table-core' {
    interface TableMeta<TData extends RowData> {
        updateCellValue: (row: Row<TData>, cell: Cell<TData, unknown>, value: unknown) => void
    }
}
