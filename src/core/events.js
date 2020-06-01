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

const Events = new EventsDef()
export default Events
