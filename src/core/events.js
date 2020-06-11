class EventsDef {
  constructor() {
    this.callbacks = {}
  }
  invoke(eventType, args) {
    if (!this.callbacks[eventType]) {
      return
    }
    for (let ev of this.callbacks[eventType]) {
      ev(args)
    }
  }
  removeListener(eventType, cb) {
    let collection = this.callbacks[eventType]
    if (collection == null) {
      return
    }

    collection.splice(collection.indexOf(cb), 1)
  }
  addListener(eventType, cb) {
    let collection = this.callbacks[eventType]
    if (collection == null) {
      collection = []
    }
    if (!collection.includes(cb)) {
      collection.push(cb)
    }
    this.callbacks[eventType] = collection
  }
}

const EventType = {
  LayerAdded: 'LayerAdded',
  LayerHierarchyChanged: 'LayerHierarchyChanged',
}

const Events = new EventsDef()
export { Events, EventType }
