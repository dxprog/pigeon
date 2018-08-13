import { HttpMethods } from './HttpConstants';
import { Dictionary } from '../interfaces/common';

/**
 * Supported RestLi methods as defined by their
 * `X-Restli-Method` header value
 */
export enum ResourceMethod {
  GET = 'get',
  BATCH_GET = 'batch_get',
  FINDER = 'finder',
  CREATE = 'create',
  BATCH_CREATE = 'batch_create',
  PARTIAL_UPDATE = 'partial_update',
  UPDATE = 'update',
  BATCH_UPDATE = 'batch_update',
  DELETE = 'delete',
  ACTION = 'action',
  BATCH_PARTIAL_UPDATE = 'batch_partial_update',
  BATCH_DELETE = 'batch_delete',
  GET_ALL = 'get_all',
  OPTIONS = 'options'
};

/**
 * A map of RestLi methods to the actual HTTP method used.
 * @see https://github.com/linkedin/rest.li/blob/master/restli-common/src/main/java/com/linkedin/restli/common/ResourceMethod.java
 */
export const ResourceMethodToHttpMethod: Dictionary<string> = {
  [ResourceMethod.GET]: HttpMethods.GET,
  [ResourceMethod.BATCH_GET]: HttpMethods.GET,
  [ResourceMethod.FINDER]: HttpMethods.GET,
  [ResourceMethod.CREATE]: HttpMethods.POST,
  [ResourceMethod.BATCH_CREATE]: HttpMethods.POST,
  [ResourceMethod.PARTIAL_UPDATE]: HttpMethods.POST,
  [ResourceMethod.UPDATE]: HttpMethods.PUT,
  [ResourceMethod.BATCH_UPDATE]: HttpMethods.PUT,
  [ResourceMethod.DELETE]: HttpMethods.DELETE,
  [ResourceMethod.ACTION]: HttpMethods.POST,
  [ResourceMethod.BATCH_PARTIAL_UPDATE]: HttpMethods.POST,
  [ResourceMethod.BATCH_DELETE]: HttpMethods.DELETE,
  [ResourceMethod.GET_ALL]: HttpMethods.GET,
  [ResourceMethod.OPTIONS]: HttpMethods.OPTIONS
};