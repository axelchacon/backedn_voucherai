//export class CreateVoucherDto {}
///Esto es lo que espera del front end
import { Imagevoucher } from '@prisma/client';

export type CreateVoucherDto = Omit<
  Imagevoucher,
  'id' | 'createdAt' | 'updatedAt'
>;
