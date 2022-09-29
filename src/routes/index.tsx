import { useRoutes } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
    return useRoutes([MainRoutes]);
}
