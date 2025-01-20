import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VouchersService {
  constructor(private prismaService: PrismaService) {}
  async create(createVoucherDto: CreateVoucherDto) {
    try {
      return await this.prismaService.imagevoucher.create({
        data: createVoucherDto,
      });
    } catch (error) {
      // Handle specific Prisma errors

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(error.message);
      }

      // Handle general errors
      throw new BadRequestException(
        `'An ${error} occurred while creating the voucher. Please try again.'`,
      );
    }
  }

  findAll() {
    return this.prismaService.imagevoucher.findMany();
  }

  findOne(id: number) {
    return this.prismaService.imagevoucher.findUnique({
      where: { id },
    });
  }

  update(id: number, updateVoucherDto: UpdateVoucherDto) {
    return this.prismaService.imagevoucher.update({
      where: { id },
      data: updateVoucherDto,
    });
  }

  remove(id: number) {
    return this.prismaService.imagevoucher.delete({
      where: { id },
    });
  }
}
