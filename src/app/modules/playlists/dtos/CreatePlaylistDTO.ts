export class CreatePlaylistDTO {
  name: string

  constructor(name) {
    this.name = name
  }

  static fromRequest(request) {
    const {name} = request.body
    return new this(name)
  }

  static get schema() {
    return {
      body: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          }
        },
        required: ['name']
      }
    }
  }
}
