import React from 'react';
import { Button } from '@mui/material';
import { themeConfig } from '../../config/ThemeConfig';
// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr

// @ts-ignore
// eslint-disable-next-line react/prop-types
export const Export = ({ onExport }) => {
  return (
    <Button
      sx={{
        width: 100,
        color: themeConfig.buttons.color
      }}
      onClick={() => {
        return onExport();
      }}>
      Export
    </Button>
  );
};

export function convertArrayOfObjectsToCSV<T extends Record<string, any>>(array: T) {
  let result: string;

  const columnDelimiter = ',';
  const lineDelimiter = '\n';
  const keys = Object.keys(array[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item: T) => {
    let ctr = 0;
    keys.forEach((key: string) => {
      if (ctr > 0) result += columnDelimiter;

      // @ts-ignore
      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

export function downloadCSV<T extends Record<string, any>>(array: T) {
  const link = document.createElement('a');
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', filename);
  link.click();
}
