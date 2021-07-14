import api from '@@/services/api';

function setProfile({ 
  name = '',
  alias_name = '',
  splash_image = '',
  splash_intro = '',
  tech_skills = {},
  tech_products = {},
} = {}) {
  return {
    type: 'SET_PROFILE',
    payload: {
      name,
      alias_name,
      splash_image,
      splash_intro,
      tech_skills,
      tech_products,
    }
  }
}

export const getProfile = (userID) => {
  return (dispatch) => {
    return api.get_profile(userID).then((result) => {
      dispatch(setProfile(result));
    });
  }
}