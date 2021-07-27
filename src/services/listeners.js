const glisteners = {
  listenerCB: [],
  scrolllistenerCB: [],
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
  removeWindowScrollListener(id) {
    const len = this.scrolllistenerCB.length;
    this.scrolllistenerCB = this.scrolllistenerCB.filter((cb) => !(cb.id === id));
    return (len > this.scrolllistenerCB.length);
  },
  addWindowScrollListener(cb) {
    console.log('Add', cb);
    const id = this.scrolllistenerCB.length;
    cb.id = id;
    this.scrolllistenerCB.push(cb);
    return id;
  },
  init() {
    window.addEventListener('resize', () => {
      this.listenerCB.forEach(cb => cb.apply());
    });
    document.querySelector("#root").addEventListener('scroll', (event) => {
      this.scrolllistenerCB.forEach(cb => cb.call(cb.callee, event));
    });
  }
};
export { glisteners as default };