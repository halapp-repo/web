import { Suspense,ComponentType } from 'react';

// project import
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

// eslint-disable-next-line react/display-name
const Loadable = <T extends object>(Component:ComponentType<T>) => (props:T) => (
    <Suspense fallback={<Loader />}>
        <Component {...props}/>
    </Suspense>
);

export default Loadable;
