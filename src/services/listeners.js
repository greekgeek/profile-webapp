const glisteners = {
  listenerCB: [],
  addWindowResizeListener(cb) {
    console.log('Add', cb);
    const id = this.listenerCB.length;
    cb.id = id;
    this.listenerCB.push(cb);
    return id;
  },
  removeWindowResizeListener(id) {
    const len = this.listenerCB.length;
    this.listenerCB = this.listenerCB.filter((cb) => !(cb.id === id));
    console.log(this.listenerCB);
    return (len > this.listenerCB.length);
  },
  init() {
    window.addEventListener('resize', () => {
      this.listenerCB.forEach(cb => cb.apply());
    });
  }
};
export { glisteners as default };