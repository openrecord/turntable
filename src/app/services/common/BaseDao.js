const {connect} = require('../database')

class BaseDao {
  async create(obj) {
    const conn = await this.conn()
    const Entity = this.entityClass()
    const repo = conn.getRepository(Entity)
    const result = await repo.save(obj)
    return result
  }

  /**
   * @returns {Class}
   * @abstract
   */
  entityClass() {}

  /**
   * Get the TypeORM connection.
   * @return {Promise<Connection>}
   */
  async conn() {
    return connect()
  }
}

module.exports = BaseDao
