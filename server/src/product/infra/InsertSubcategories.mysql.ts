import { executeQuery } from '../../shared/infra/mysql/db.mysql';
import { InsertSubcategoryRepository } from '../domain/repositories/insertSubcategories.repository';

export class InsertSubcategoriesMySql implements InsertSubcategoryRepository {
  async run(product_id: number, subcategory_id: number) {
    try {
      // Verificar si ya existe un registro con los mismos valores
      const existingRecord = await this.checkDuplicateRecord(product_id, subcategory_id);

      if (existingRecord) {
        // Si ya existe un registro, no hacer nada
        console.log('El registro ya existe:', existingRecord);
        // Opcionalmente, puedes lanzar una excepción o simplemente no hacer nada
        return;
      } else {
        // Si no existe un registro, procede con la inserción
        const sql = 'INSERT INTO product_subcategories(product_id, subcategory_id) VALUES (?,?)';
        return executeQuery(sql, [product_id, subcategory_id]);
      }
    } catch (error) {
      console.error('Error al intentar insertar el registro:', error);
      throw error;
    }
  }

  async checkDuplicateRecord(product_id: number, subcategory_id: number) {
    // Consulta SQL para verificar si ya existe un registro con los mismos valores
    const sql = 'SELECT * FROM product_subcategories WHERE product_id = ? AND subcategory_id = ?';
    // Ejecutar la consulta
    const result = await executeQuery(sql, [product_id, subcategory_id]);
    // Devolver el registro si se encuentra, de lo contrario devolver null
    return result.length > 0 ? result[0] : null;
  }
}
