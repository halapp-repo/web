import 'reflect-metadata';

import { OrganizationVM } from '@halapp/common';

import { OrganizationToOrganizationDTOMapper } from './organization-to-organization-dto.mapper';

describe('OrganizationToOrganizationDTOMapper', () => {
  let mapper: OrganizationToOrganizationDTOMapper;
  beforeAll(() => {
    mapper = new OrganizationToOrganizationDTOMapper();
  });
  test('Convert to Organization simple', () => {
    const orgDto = new OrganizationVM();
    orgDto.VKN = '1234';

    const org = mapper.toModel(orgDto);
    expect(org).not.toBe(null);
    expect(org.VKN).toBe('1234');
  });

  test('Convert to Organization complex', () => {
    const orgDto = new OrganizationVM();
    orgDto.VKN = '1234';
    orgDto.CompanyAddress = {
      AddressLine: 'A',
      City: 'C',
      Country: 'C',
      County: 'C',
      ZipCode: 'Z'
    };

    const org = mapper.toModel(orgDto);
    expect(org).not.toBe(null);
    expect(org.VKN).toBe('1234');
    expect(org.CompanyAddress).not.toBe(null);
    expect(org.CompanyAddress?.AddressLine).toBe('A');
  });
});
