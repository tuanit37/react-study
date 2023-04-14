import { styled } from '@material-ui/core/styles';
export const StyledMapWrapper = styled('div')(
  () => ({
    position: 'relative',
    width: 'inherit',
    height: 'inherit',
    overflow: 'hidden',
    maxHeight: 'inherit',
  }),
  { name: 'StyledMapWrapper' },
);

export const StyledIframe = styled('iframe')(
  () => ({
    width: 'inherit',
    height: 'inherit',
    overflow: 'hidden',
  }),
  { name: 'StyledIframe' },
);

export const StyledListServiceTypesWrapper = styled('div')(
  ({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: 0,
    left: 0,
    zIndex: 1,

    display: 'flex',
    justifyContent: 'center',
  }),
  { name: 'StyledListServiceTypesWrapper' },
);

export const StyledListWrapper = styled('div')(
  ({ theme }) => ({
    position: 'absolute',
    right: 0,
    bottom: theme.spacing(8),
    left: 0,
    zIndex: 1,
    [theme.breakpoints.up('lg')]: {
      bottom: theme.spacing(4),
    },
  }),
  { name: 'StyledListWrapper' },
);
