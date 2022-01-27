import React, { ReactNode } from 'react';
import Paper from '@mui/material/Paper';
import DataTable from 'react-data-table-component';
import { downloadCSV, Export } from './ExportFunction';
import { IUser } from '../../models/User';
export interface IDataListProps<T> {
  listData: T[];
  columns: IColumn<T>[];
  headerActions?: ReactNode;
}

export type IColumn<T> =
  | {
      name: string;
      cell: (row: T) => ReactNode;
    }
  | { name: string; selector: (row: T) => string };

export function DataList<T extends Record<string, any>>({
  listData,
  columns,
  headerActions
}: IDataListProps<T>) {
  const actionsMemo = React.useMemo(
    () => (
      <>
        <Export onExport={() => downloadCSV(listData)} />
        {headerActions}
      </>
    ),
    []
  );

  return (
    <Paper>
      <div style={{ height: 500, width: '100%' }}>
        <DataTable columns={columns} data={listData} actions={actionsMemo} />
      </div>
    </Paper>
  );
}
