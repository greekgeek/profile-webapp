const st = {
  blogs: '',
  next: 1,
  current: 0,
};
export default function blogReducer(actions = {type:'default'}, state = st) {
  switch(actions.type) {
    case 'default':
      return state;
    default:
      return state;
  }
}