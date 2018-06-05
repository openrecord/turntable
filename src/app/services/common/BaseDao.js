const {connect} = require('../database')

class BaseDao {
  async create(obj) {
    const repo = await this._repo()
    const result = await repo.save(obj)
    return result
  }

  async findAll(obj) {
    const repo = await this._repo()
    const result = repo.find(obj)
    return result
  }

  async findOne(obj) {
    const repo = await this._repo()
    const result = repo.findOne(obj)
    return result
  }

  /**
   * @return {Promise<Repository<any>>}
   * @private
   */
  async _repo() {
    const conn = await this.conn()
    const Entity = this.entityClass()
    return conn.getRepository(Entity)
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
