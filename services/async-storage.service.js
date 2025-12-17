export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    _makeId

}

function query(entityType, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

async function get(entityType, entityId) {
    try {
      const entities = await query(entityType)
      const entity = entities.find(entity => entity._id === entityId)
      if (!entity) {
        throw new Error(`Entity not found`)
      }
      return entity
    } catch (err) {
      throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    }
}
  

async function post(entityType, newEntity) {
    try {
        newEntity._id = _makeId()
        const entities = await query(entityType)

        entities.push(newEntity)
        _save(entityType, entities)

        return newEntity
    } catch (err) {
        console.error('Post failed:', err)
        throw err
    }
}
  
async function put(entityType, updatedEntity) {
    try {
        const entities = await query(entityType)

        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) {
        throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)}
        const entityToUpdate = { ...entities[idx], ...updatedEntity }
        entities.splice(idx, 1, entityToUpdate)
        _save(entityType, entities)
        return entityToUpdate
    } catch (err) {
        console.error('Put failed:', err)
        throw err
    }
}
  
  async function remove(entityType, entityId) {
    try {
      const entities = await query(entityType)
      const idx = entities.findIndex(entity => entity._id === entityId)
      if (idx < 0) {
        throw new Error(
          `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
        )
    }
  
      entities.splice(idx, 1)
      _save(entityType, entities)
    } catch (err) {
      console.error('Remove failed:', err)
      throw err
    }
}
  

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}