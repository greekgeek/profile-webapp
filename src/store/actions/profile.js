import api from '@@/services/api';

function setProfile({ 
  name = '',
  alias_name = '',
  splash_image = '',
  splash_intro = '',
} = {}) {
  return {
    type: 'SET_PROFILE',
    payload: {
      name,
      alias_name,
      splash_image,
      splash_intro,
    }
  }
}

export const getProfile = (userID) => {
  return (dispatch) => {
    return api.get_profile(userID).then((result) => {
      console.log(result);  
      dispatch(setProfile(result));
    });
  }
}