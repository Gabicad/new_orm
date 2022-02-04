import { SvgIconComponent } from '@mui/icons-material';
import {
  Dashboard,
  AdminPanelSettings,
  Settings,
  PrecisionManufacturing,
  LocalOffer,
  Add,
  Delete,
  DoNotDisturb,
  CheckCircleOutline,
  Done,
  Send,
  Inventory2,
  ChangeCircle,
  FormatListBulleted
} from '@mui/icons-material';
export interface MenuItem {
  label: string;
  link: string;
  icon: SvgIconComponent;
  subMenu?: Array<MenuItem>;
}
export interface MenuItems extends Array<MenuItem> {}

export const menu: MenuItems = [
  {
    label: 'Kezdőlap',
    link: '/Dashboard',
    icon: Dashboard
  },
  {
    label: 'Árajánlatok',
    link: 'Offers',
    icon: LocalOffer,
    subMenu: [
      { label: 'Új árajánlat', link: '/offers/new', icon: Add },
      { label: 'Nyitott / Módosításra vár', link: '/offers/form', icon: ChangeCircle },
      { label: 'Kiküldve', link: '/offers/list', icon: Send },
      { label: 'Elfogadva', link: '/offers/list', icon: Done },
      { label: 'Lejárt', link: '/offers/list', icon: DoNotDisturb },
      { label: 'Megrendelve', link: '/offers/list', icon: CheckCircleOutline },
      { label: 'Törölve', link: '/offers/list', icon: Delete }
    ]
  },
  {
    label: 'Termékek',
    link: 'Products',
    icon: Inventory2,
    subMenu: [{ label: 'Termék lista', link: '/Products/List', icon: FormatListBulleted }]
  },
  {
    label: 'Beállítások',
    link: 'Settings',
    icon: Settings,
    subMenu: [
      { label: 'Adminok', link: '/users', icon: AdminPanelSettings },
      { label: 'Gyártók', link: '/manufacturers', icon: PrecisionManufacturing }
    ]
  }
];
