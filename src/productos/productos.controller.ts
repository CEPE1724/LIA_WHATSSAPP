import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Productos') // Agrupa los endpoints bajo una misma categoría
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get('Productos-WEB-WP')
  @ApiOperation({ summary: 'Obtener productos para la web WP' })
  @ApiResponse({
    status: 200,
    description: 'Productos obtenidos correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Productos no encontrados.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async Productos_WEB_WP(@Res() res: Response) {
    try {
      const response = await this.productosService.productosWEB_WP();
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Productos obtenidos.',
        data: response,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener datos.',
        error,
      });
    }
  }

  @Get('Baratazos-WEB-WP')
  @ApiOperation({ summary: 'Obtener baratazos para la web WP' })
  @ApiResponse({
    status: 200,
    description: 'Baratazos obtenidos correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Baratazos no encontrados.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async Baratazos_WEB_WP(@Res() res: Response) {
    try {
      const result = await this.productosService.Baratazos_WEB_WP();
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Baratazos obtenidos.',
        data: result,
      });
    } catch (error) {
      console.error('Error en Baratazos_WEB_WP:', error);
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al consultar los baratazos',
        error: error.message,
      });
    }
  }

  @Get('Ofertas-WEB-WP')
  @ApiOperation({ summary: 'Obtener ofertas para la web WP' })
  @ApiResponse({ status: 200, description: 'Ofertas obtenidas correctamente.' })
  @ApiResponse({ status: 404, description: 'Ofertas no encontradas.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async Ofertas_WEB_WP(@Res() res: Response) {
    try {
      const response = await this.productosService.ofertasWEB_WP();
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Ofertas obtenidas.',
        data: response,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener las ofertas.',
        error,
      });
    }
  }
}
