import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

interface ProductsWEB_WP_Return {
  Codigo: string;
  Titulo: string;
  Descripcion: string;
  Precio: number;
  Imagen: string;
  Url: string;
}

@Injectable()
export class ProductosService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  public async productosWEB_WP(): Promise<ProductsWEB_WP_Return[]> {
    const result = await this.dataSource.query(
      `select 
        wp.idWEB_Productos as sku, 
        wp.Codigo , 
        wp.Titulo, 
        wp.Descripcion, 
        wp.Tarjeta, 
        wp.Imagen, 
        wg.Descripcion as Grupo, 
        ws.Descripcion as Subgrupo 
      from WEB_Productos wp 
      inner join WEB_Grupos wg on wp.idWEB_Grupos = wg.idWEB_Grupos
      inner join WEB_Subgrupos ws on ws.idWEB_Subgrupos =wp.idWEB_SubGrupos;`,
    );
    if (!result || result.length === 0) {
      throw new NotFoundException('No se encontraron productos');
    }

    const data = result.map((p) => {
      const {
        Codigo,
        Titulo,
        Descripcion,
        Imagen,
        Tarjeta,
        Grupo,
        Subgrupo,
        sku,
      } = p;
      const Url =
        `${this.configService.get('MARKETPLACE_URL')}producto/` +
        this.formatUrl(Grupo ?? '', Subgrupo ?? '', Titulo ?? '', sku ?? 0);

      return {
        Codigo,
        Titulo,
        Descripcion,
        Precio: Tarjeta,
        Imagen,
        Url,
      };
    });

    return data;
  }

  public async Baratazos_WEB_WP(): Promise<ProductsWEB_WP_Return[]> {
    const result = await this.dataSource.query(`EXEC dbo.WEB_Baratazos_SP`);
    if (!result || result.length === 0) {
      throw new NotFoundException('No se encontraron baratazos');
    }
    const data = result.map((p) => {
      const {
        Codigo,
        Titulo,
        Descripcion,
        Imagen,
        PrecioAntes,
        PrecioPromocional,
        Grupo,
        SubGrupo,
        idWEB_Baratazos,
      } = p;
      const Url =
        `${this.configService.get('MARKETPLACE_URL')}productobaratazo/` +
        this.formatUrl(
          Grupo ?? '',
          SubGrupo ?? '',
          Titulo ?? '',
          idWEB_Baratazos ?? 0,
        );
      return {
        Codigo,
        Titulo,
        Descripcion,
        PrecioAntes,
        PrecioPromocional,
        Imagen,
        Url,
      };
    });
    return data;
  }

  public async ofertasWEB_WP(): Promise<ProductsWEB_WP_Return[]> {
    const result = await this.dataSource.query('EXEC dbo.WEB_Ofertas_SP');
    if (!result || result.length === 0) {
      throw new NotFoundException('No se encontraron ofertas');
    }
    const data = result.map((p) => {
      const {
        Titulo,
        Descripcion,
        Imagen,
        PrecioTarjeta,
        Grupo,
        SubGrupo,
        idWEB_Ofertas,
      } = p;
      const Url =
        `${this.configService.get('MARKETPLACE_URL')}productooferta/` +
        this.formatUrl(
          Grupo ?? '',
          SubGrupo ?? '',
          Titulo ?? '',
          idWEB_Ofertas ?? 0,
        );
      return {
        Titulo,
        Descripcion,
        Precio: PrecioTarjeta,
        Imagen,
        Url,
      };
    });
    return data;
  }

  private formatUrl(Grupo, SubGrupo, nombreComercial, sku) {
    // Función auxiliar para formatear strings
    const formatString = (str) =>
      str
        .toLowerCase()
        .normalize('NFD') // Normaliza caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
        .replace(/[^\w\s-]/g, '') // Elimina caracteres especiales excepto guiones
        .trim() // Elimina espacios al inicio y final
        .replace(/\s+/g, '-'); // Reemplaza espacios con guiones
    // Formatea cada componente
    const urlGrupo = formatString(Grupo);
    const urlSubGrupo = formatString(SubGrupo);
    const urlNombre = formatString(nombreComercial);
    // Une los componentes con guiones
    return `${urlGrupo}-${urlSubGrupo}-${urlNombre}-${sku}`;
  }
}
