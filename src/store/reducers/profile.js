const st = {
  name: '',
  alias_name: '',
  splash_uri: '',
  splash_intro: '',
  userID: 'manas22@gmail.com',
};
export default function profileReducer(state = st, actions = {type:'default'}) {
  console.log('ProfileReducer', actions);
  switch(actions.type) {
    case 'default':
      return state;
    case 'SET_PROFILE':
      const nwState = { ...state, ...actions.payload };
      console.log(nwState);
      return  nwState;
    default:
      return state;
  }
}