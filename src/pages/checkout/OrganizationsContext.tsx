import React from 'react';

import { Organization } from '../../models/organization';

const OrganizationsContext = React.createContext<Organization[]>([]);

export { OrganizationsContext };
