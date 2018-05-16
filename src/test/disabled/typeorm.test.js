const assert = require('assert')

const typeorm = require('typeorm')

class Post {
  constructor(id, title, text, categories) {
    this.id = id
    this.title = title
    this.text = text
    this.categories = categories
  }
}

const PostSchema = new typeorm.EntitySchema({
  name: 'Post',
  target: Post,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    title: {
      type: 'varchar'
    },
    text: {
      type: 'text',
      nullable: true
    }
  }
})

test('xxx', async () => {
  const conn = await typeorm.createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'openrecord_test',
    synchronize: true,
    logging: false,
    entities: [PostSchema]
  })

  const repo = conn.getRepository(Post)
  await repo.save({title: 'toiasdf'})
  const one = await repo.findOne()

  assert.notEqual(one, null)
  assert.equal(one.title, 'toiasdf')

  await conn.close()
})
