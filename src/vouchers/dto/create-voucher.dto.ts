import { Imagevoucher } from '@prisma/client';

export type CreateVoucherDto = Omit<
  Imagevoucher,
  'id' | 'createdAt' | 'updatedAt'
>;
