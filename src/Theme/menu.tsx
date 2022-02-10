import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, useNavigate } from 'react-router-dom';
import { menu, MenuItem } from '../config/menu';

const MainListItems = () => {
  const history = useNavigate();
  const location = useLocation();
  const [MenuState, setMenuState] = React.useState({ link: location.pathname });

  const handleRouteClick = (link: string) => history(link);

  const handleOnClick = (menu: MenuItem) => {
    if (menu.subMenu) {
      MenuState.link === menu.link ? setMenuState({ link: '' }) : setMenuState({ link: menu.link });
      return;
    } else {
      setMenuState({ link: menu.link });
      handleRouteClick(menu.link);
    }
  };
  const checkMenuOpenState = (menuItem: MenuItem) =>
    MenuState.link === menuItem.link ||
    (menuItem?.subMenu && menuItem.subMenu.some((item: MenuItem) => item.link === MenuState.link));

  const MenuItemComponent = ({
    menuItem,
    level = 0,
    hasChild = false
  }: {
    menuItem: MenuItem;
    level: number;
    hasChild: boolean;
  }) => {
    const { label, icon } = menuItem;
    return (
      <>
        <ListItem button sx={{ pl: level === 0 ? 0 : 4 }} onClick={() => handleOnClick(menuItem)}>
          <ListItemIcon>
            <ListItemIcon>{React.createElement(icon, {})}</ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={label} />
          {hasChild ? checkMenuOpenState(menuItem) ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItem>
        {hasChild && handleSubMenu(menuItem)}
      </>
    );
  };

  const handleSubMenu = (parentMenu: MenuItem) => {
    return (
      <Collapse in={checkMenuOpenState(parentMenu)} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {parentMenu.subMenu &&
            parentMenu?.subMenu.map((childMenu: MenuItem, i: number) => {
              return <MenuItemComponent menuItem={childMenu} level={1} hasChild={false} key={i} />;
            })}
        </List>
      </Collapse>
    );
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-labelledby="nested-list-subheader"
      component="nav">
      {menu.map((menuItem: MenuItem, i: number) => {
        const hasChild = !!menuItem.subMenu;
        return <MenuItemComponent menuItem={menuItem} level={0} hasChild={hasChild} key={i} />;
      })}
    </List>
  );
};

export default MainListItems;
