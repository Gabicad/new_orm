import * as React from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import { SvgIcon, Tooltip } from '@mui/material';

export interface IActionMenu<T> {
  title: string;
  onClick: (item: T) => void;
  icon: SvgIconComponent;
}

export function IconList<T extends Record<string, any>>({
  data,
  config
}: {
  data: T;
  config: IActionMenu<T>[];
}) {
  const handleMenuItemClick = (onClick: (item: T) => void) => {
    onClick(data);
  };

  return (
    <>
      {config.map(({ title, icon, onClick }: IActionMenu<T>, index: number) => {
        return (
          <Tooltip title={title} key={index}>
            <SvgIcon
              sx={{ cursor: 'pointer', mr: 3 }}
              component={icon}
              inheritViewBox
              onClick={() => handleMenuItemClick(onClick)}
            />
          </Tooltip>
        );
      })}
    </>
  );
}
