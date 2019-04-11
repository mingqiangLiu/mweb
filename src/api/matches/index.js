import api from '../index'
import urls from './urls'

const header = {}

export default {
  matches() {
    // return出去了一个promise
    return api.get(urls.matches)
  }
}
