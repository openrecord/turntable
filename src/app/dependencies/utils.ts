import {container} from './inversify.config'

export function bindDependencies(func, ...dependencies) {
  let injections = dependencies.map(dependency => {
    return container.get(dependency)
  })
  return func.bind(func, ...injections)
}
