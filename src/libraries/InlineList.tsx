import { styled } from '@mui/material/styles';
import { List, ListItem } from '@mui/material';

export const InlineList = styled(List)({
  width: '100%',
  display: 'inline-block',
  whiteSpace: 'nowrap'
});

export const InlineListItem = styled(ListItem)({
  float: 'left',
  width: 'auto'
});
