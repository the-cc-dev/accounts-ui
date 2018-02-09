import {request} from '../../util/request'

export function auth (state = {
  checking: false,
  valid: false
}, action) {
  switch (action.type) {
    case 'FETCHING_AUTH':
      return {
        ...state,
        checking: true
      }
    case 'FETCH_AUTH_SUCCESS':
      return {
        checking: false,
        valid: action.auth
      }
    case 'FETCH_AUTH_ERROR':
      return {
        checking: false,
        valid: false
      }
    case 'LOGOUT':
      return {
        checking: false,
        valid: false
      }
    default:
      return state
  }
}

export function verifyAuth (unsubscribe) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_AUTH'
    })
    request('http://svc.zesty.localdev:3011/verify')
    .then(json => {
      dispatch({
        type: 'FETCH_AUTH_SUCCESS',
        auth: (json.code === 200)
      })
      if (unsubscribe) {
        unsubscribe()
      }
    })
    .catch(err => {
      console.error(err)
      dispatch({
        type: 'FETCH_AUTH_ERROR',
        auth: false,
        err
      })
    })
  }
}

export function logout () {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_AUTH'
    })
    request('http://svc.zesty.localdev:3011/logout')
    .then(json => {
      console.log(json)
      dispatch({
        type: 'LOGOUT'
      })
    })
    .catch(err => {
      console.error(err)
      dispatch({
        type: 'FETCH_AUTH_ERROR',
        err
      })
    })
  }
}
