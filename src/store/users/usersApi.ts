import axios from 'axios';
import { UserVM } from '@halapp/common';

export class UsersApi {
  baseUrl: string;

  constructor() {
    const baseUrl = process.env.REACT_APP_ACCOUNT_BASE_URL;
    if (!baseUrl) {
      throw new Error('REACT_APP_ACCOUNT_BASE_URL is not set!');
    }
    this.baseUrl = baseUrl;
  }

  async fetchAllByOrganizationId({
    token,
    organizationId
  }: {
    token: string;
    organizationId: string;
  }): Promise<UserVM[]> {
    return await axios
      .get<UserVM[]>(`/organization/${organizationId}/users`, {
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const { data } = response;
        return data;
      });
  }
  async postOrganizationUser({
    token,
    organizationId,
    email
  }: {
    token: string;
    organizationId: string;
    email: string;
  }): Promise<void> {
    return await axios
      .post(
        `/organization/${organizationId}/users`,
        { Email: email },
        {
          baseURL: this.baseUrl,
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }
      )
      .then((response) => {
        const { data } = response;
        return data;
      });
  }
}
