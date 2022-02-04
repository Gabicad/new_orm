import * as React from 'react';
import { DataGrid, GridColumns, GridToolbar } from '@mui/x-data-grid';

import { ReactNode } from 'react';

export interface IDataListProps {
  listData: any;
  columns: GridColumns;
}

export default function FilterOperators({ listData, columns }: IDataListProps) {
  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          density="compact"
          autoHeight
          components={{
            Toolbar: GridToolbar
          }}
          rows={listData}
          columns={columns}
        />
      </div>
    </div>
  );
}
