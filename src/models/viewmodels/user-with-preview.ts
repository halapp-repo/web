import { UserVM } from '@halapp/common';

export type UserVMWithPreview = UserVM & { Preview?: string | ArrayBuffer };
