import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { openSidebar, closeSidebar, toggleSidebar } from '../slice/sidebarSlice';

export const useSidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const open = () => dispatch(openSidebar());
  const close = () => dispatch(closeSidebar());
  const toggle = () => dispatch(toggleSidebar());

  return { isOpen, open, close, toggle };
};
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
