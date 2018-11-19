import axios from 'axios'
import {FETCH_USER} from './types'
import {LANDING} from './types'

//define action creator
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({  type: FETCH_USER, payload: res.data})

  }

export const landing = () => async dispatch => {
    const res = await axios.get('/')
    dispatch({  type: LANDING, payload: res.data})

  }
