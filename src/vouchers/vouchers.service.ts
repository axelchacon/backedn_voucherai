import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import fetch from 'node-fetch';

@Injectable()
export class VouchersService {
  constructor(private prismaService: PrismaService) {}

  async createWithAI(createVoucherDto: CreateVoucherDto) {
    const { image } = createVoucherDto;

    if (!image) {
      throw new BadRequestException('La imagen es obligatoria.');
    }

    try {
      const aiResponse = await this.callGroqAI(image);
      let aiResult;
      try {
        aiResult = JSON.parse(aiResponse);
      } catch (error) {
        throw new BadRequestException(
          'El resultado de la IA no tiene un formato válido.',
        );
      }
      // Mapear el resultado de la IA a los campos del modelo
      const {
        money,
        date,
        resultimage,
        operation,
        medio_payment,
        name_person,
      } = aiResult;

      if (!money || !date) {
        throw new BadRequestException(
          'Los datos devueltos por la IA están incompletos.',
        );
      }

      // Convertir `money` a número
      const moneyValue = parseFloat(money);
      if (isNaN(moneyValue)) {
        throw new BadRequestException(
          'El campo money debe ser un número válido.',
        );
      }

      return await this.prismaService.imagevoucher.create({
        data: {
          image,
          resultimage,
          money: moneyValue,
          date,
          medio_payment,
          name_person,
          operation,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Error al procesar la imagen: ${error.message}`,
      );
    }
  }

  private async callGroqAI(imageUrl: string): Promise<string> {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

    const payload = {
      model: 'llama-3.2-11b-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'De la imagen de boleta de pago, cuál es monto , la fecha de la operación, tipo de imagen (resultimage),el número de la operación, el medio de pago (que es una empresa fintech o banco) y mi nombre?',
            },
            { type: 'image_url', image_url: { url: imageUrl } },
          ],
        },
      ],
      max_tokens: 300,
      tools: [
        {
          type: 'function',
          function: {
            name: 'get_data',
            description: 'Get the information from voucher ',
            parameters: {
              type: 'object',
              properties: {
                money: {
                  type: 'number',
                  description:
                    'the amount of the money in soles peruanos. Example: 100 soles',
                },
                operation: {
                  type: 'string',
                  description: 'the number of  the voucher. Example: 90909090',
                },
                date: {
                  type: 'string',
                  description:
                    'the date of  the operation from the image. Example: 01/12/2024',
                },
                name_person: {
                  type: 'string',
                  description:
                    'Giveme my name from the image. Example: Huanita Pérez',
                },
                medio_payment: {
                  type: 'string',
                  description:
                    'Give me the payment método that are tha fintech or banking companies',
                  enum: ['Yape', 'BCP', 'Paypal', 'Interbank', 'Stripe'],
                },
                resultimage: {
                  type: 'string',
                  description: 'the type from the image',
                },
              },
              required: [
                'money',
                'operation',
                'date',
                'name_person',
                'medio_payment',
                'resultimage',
              ],
            },
          },
        },
      ],
      tool_choice: 'auto',
    };

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return result.choices[0].message.tool_calls[0].function.arguments || null; //{"money": 100, "date": "17 ene. 2025 - 10:50 am", "resultimage": "image of receipt", "operation": "90909090", "medio_payment": "Yape", "name_person": "Carmen M. Ventocilla E."}
  }
}
