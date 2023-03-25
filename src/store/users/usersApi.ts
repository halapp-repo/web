import { axiosInstance as axios } from '../../utils/axios';
import { UserVM } from '@halapp/common';
import FormData from 'form-data';

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
      .get<UserVM[]>(`/organizations/${organizationId}/users`, {
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
        `/organizations/${organizationId}/users`,
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
  async fetchById({ token, userId }: { token: string; userId: string }): Promise<UserVM> {
    return await axios
      .get<UserVM>(`/users/${userId}`, {
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
  async updateUser({ token, userVM }: { token: string; userVM: UserVM }): Promise<UserVM> {
    return axios
      .put(`/users/${userVM.ID}`, userVM, {
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      .then((response) => {
        const { data } = response;
        return data;
      });
  }
  async uploadAvatar({
    token,
    userId,
    file
  }: {
    token: string;
    userId: string;
    file: File;
  }): Promise<UserVM> {
    const data = new FormData();
    data.append('File', file);
    return axios
      .post(`/users/${userId}/avatar`, data, {
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data;`
        }
      })
      .then((response) => {
        const { data } = response;
        return data;
      });
  }
}
