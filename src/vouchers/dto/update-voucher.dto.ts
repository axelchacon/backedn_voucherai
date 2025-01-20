//import { PartialType } from '@nestjs/mapped-types';
import { CreateVoucherDto } from './create-voucher.dto';

//export class UpdateVoucherDto extends PartialType(CreateVoucherDto) {}

//export class UpdateVoucherDto {}

export type UpdateVoucherDto = Partial<CreateVoucherDto>;
