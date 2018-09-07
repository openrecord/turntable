import {injectable} from 'inversify'
import {connect} from '../database'
import {Repository} from 'typeorm'

export interface Dao<T> {
  create(obj: Partial<T>): Promise<T>
  findAll(filters: Partial<T>): Promise<T[]>
  findOne(filters: Partial<T>): Promise<T>
}

interface EntityConstructor<T> {
  new (): T
}

@injectable()
export abstract class BaseDao<T> implements Dao<T> {
  abstract entityClass: EntityConstructor<T>

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
    const Entity = this.entityClass
    return conn.getRepository(this.entityClass)
  }

  /**
   *
   * Get the TypeORM connection.
   * @return {Promise<Connection>}
   */
  async conn() {
    return connect()
  }
}
