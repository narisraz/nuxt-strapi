import type { Strapi4RequestParams } from '../types/v4'
import { useStrapiVersion, useStrapiClient } from '#imports'

/**
 * @deprecated use `useStrapi` for correct types
 */
export const useStrapi4 = () => {
  const client = useStrapiClient()
  const version = useStrapiVersion()
  if (version !== 'v4') {
    // eslint-disable-next-line no-console
    console.warn('useStrapi4 is only available for v4')
  }

  /**
   * Get a list of {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Strapi4RequestParams} params? - Query parameters
   * @returns Promise<T>
   */
  const find = <T>(contentType: string, params?: Strapi4RequestParams): Promise<T> => {
    return client(`/${contentType}`, { method: 'GET', params })
  }

  /**
   * Get a specific {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry
   * @param  {Strapi4RequestParams} params? - Query parameters
   * @returns Promise<T>
   */
  const findOne = <T>(contentType: string, id?: string | number | Strapi4RequestParams, params?: Strapi4RequestParams): Promise<T> => {
    if (typeof id === 'object') {
      params = id
      // @ts-ignore
      id = undefined
    }

    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'GET', params })
  }

  /**
   * Create a {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const create = <T>(contentType: string, data: Partial<T>, headers?: HeadersInit): Promise<T> => {
    return client(`/${contentType}`, { method: 'POST', body: { data }, headers })
  }

  /**
   * Update an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be updated
   * @param  {Record<string, any>} data - Form data
   * @returns Promise<T>
   */
  const update = <T>(contentType: string, id: string | number | Partial<T>, data?: Partial<T>, headers?: HeadersInit): Promise<T> => {
    if (typeof id === 'object') {
      data = id
      // @ts-ignore
      id = undefined
    }

    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'PUT', body: { data }, headers })
  }

  /**
   * Delete an entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be deleted
   * @returns Promise<T>
   */
  const _delete = <T>(contentType: string, id?: string | number, headers?: HeadersInit): Promise<T> => {
    const path = [contentType, id].filter(Boolean).join('/')

    return client(path, { method: 'DELETE', headers })
  }

  return {
    find,
    findOne,
    create,
    update,
    delete: _delete
  }
}
