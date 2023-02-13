import { useMediaQuery, Theme, Drawer } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { selectUICityIsOpen, toggleCity } from '../../../../../store/ui/uiSlice';
import { DialogCityContent } from './DialogCityContent';
import { DrawerCityContent } from './DrawerCityContent';

const ModalCitySelect = () => {
  const dispatch = useAppDispatch();
  const matchesSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const isOpen = useAppSelector(selectUICityIsOpen);
  return (
    <>
      {matchesSm && (
        <Drawer
          anchor={'bottom'}
          open={isOpen}
          PaperProps={{
            elevation: 4,
            sx: {
              width: '100%',
              maxHeight: '45%',
              height: '45%',
              padding: '1.3rem 1.7rem'
            }
          }}
          onClose={() => {
            dispatch(toggleCity(false));
          }}>
          <DrawerCityContent />
        </Drawer>
      )}
      {matchesSm || <DialogCityContent />}
    </>
  );
};

export { ModalCitySelect };
