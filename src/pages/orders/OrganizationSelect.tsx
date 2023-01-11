import {
  Box,
  Divider,
  List,
  Stack,
  Theme,
  useMediaQuery,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { ReactElement, useEffect } from 'react';
import { Organization } from '../../models/organization';

interface OrganizationSelectProps {
  Organizations: Organization[];
  SetOrganization: (organizationId: string) => void;
  SelectedOrganization: string | null;
}

const OrganizationSelect = ({
  Organizations,
  SetOrganization,
  SelectedOrganization
}: OrganizationSelectProps) => {
  useEffect(() => {
    if (Organizations && Organizations.length > 0) {
      if (Organizations.length === 1) {
        SetOrganization(Organizations[0].ID!);
      } else {
        SetOrganization(Organizations[0].ID!);
      }
    }
  }, [Organizations]);

  const createSelector = (
    organizations: Organization[],
    selectedOrganizationId?: string | null
  ): ReactElement => {
    if (!organizations || organizations.length === 0) {
      return <Box></Box>;
    } else if (organizations.length === 1) {
      return (
        <Typography variant="h4" align="center">
          {organizations[0].Name}
        </Typography>
      );
    } else {
      return (
        <Box sx={{ p: '0px 10px' }}>
          <Select
            value={selectedOrganizationId!}
            sx={{ width: '100%' }}
            label="Sirketler"
            onChange={(event: SelectChangeEvent) => {
              SetOrganization(event.target.value as string);
            }}>
            {Organizations.map((o) => (
              <MenuItem key={o.ID!} value={o.ID!}>
                {o.Name!}
              </MenuItem>
            ))}
          </Select>
        </Box>
      );
    }
  };

  return <Box>{createSelector(Organizations, SelectedOrganization)}</Box>;
};
export default OrganizationSelect;
