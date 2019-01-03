/**
 * 这里编写接口
 */
import { instance } from './instance'

export function $get(url, params = {}, headers={}) {
  return instance({
    url,
    params,
    method: 'get',
    headers
  })
}

export function $post(url, data = {}, headers={}) {
  return instance({
    url,
    data,
    method: 'post',
    headers
  })
}

export function $put(url, data = {}, headers={}) {
  return instance({
    url,
    data,
    method: 'put',
    headers
  })
}

export function $delete(url, data = {}, headers={}) {
  return instance({
    url,
    data,
    method: 'delete',
    headers
  })
}
