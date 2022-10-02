import React, { Suspense, ComponentType } from 'react';

// project import
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable =
  <T extends object>(Component: ComponentType<T>): React.FC<T> =>
  // eslint-disable-next-line react/display-name
  (props: T) =>
    (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );

export default Loadable;
