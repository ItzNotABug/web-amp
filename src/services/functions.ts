import { Service } from '../service';
import type { Payload } from '../client';
import { AppwriteException, Client } from '../client';
import type { Models } from '../models';
import { ExecutionMethod } from '../enums/execution-method';

export class Functions extends Service {
    constructor(client: Client) {
        super(client);
    }

    /**
     * List executions
     *
     * Get a list of all the current user function execution logs. You can use the
     * query params to filter your results.
     *
     * @param {string} functionId
     * @param {Object} params
     * @param {string[]} params.queries
     * @param {string} params.search
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async listExecutions(
        functionId: string,
        params?: {
            queries?: string[];
            search?: string;
        },
    ): Promise<Models.ExecutionList> {
        const { queries, search } = params || {};

        if (typeof functionId === 'undefined') {
            throw new AppwriteException(
                'Missing required parameter: "functionId"',
            );
        }

        const apiPath = '/functions/{functionId}/executions'.replace(
            '{functionId}',
            functionId,
        );
        const payload: Payload = {};

        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }

        if (typeof search !== 'undefined') {
            payload['search'] = search;
        }

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call(
            'get',
            uri,
            {
                'content-type': 'application/json',
            },
            payload,
        );
    }

    /**
     * Create execution
     *
     * Trigger a function execution. The returned object will return you the
     * current execution status. You can ping the `Get Execution` endpoint to get
     * updates on the current execution status. Once this endpoint is called, your
     * function execution process will start asynchronously.
     *
     * @param {string} functionId
     * @param {Object} params
     * @param {string} params.body
     * @param {boolean} params.async
     * @param {string} params.xpath
     * @param {ExecutionMethod} params.method
     * @param {object} params.headers
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createExecution(
        functionId: string,
        params?: {
            body?: string;
            async?: boolean;
            xpath?: string;
            method?: ExecutionMethod;
            headers?: object;
        },
    ): Promise<Models.Execution> {
        const { body, async, xpath, method, headers } = params || {};

        if (typeof functionId === 'undefined') {
            throw new AppwriteException(
                'Missing required parameter: "functionId"',
            );
        }

        const apiPath = '/functions/{functionId}/executions'.replace(
            '{functionId}',
            functionId,
        );
        const payload: Payload = {};

        if (typeof body !== 'undefined') {
            payload['body'] = body;
        }

        if (typeof async !== 'undefined') {
            payload['async'] = async;
        }

        if (typeof xpath !== 'undefined') {
            payload['path'] = xpath;
        }

        if (typeof method !== 'undefined') {
            payload['method'] = method;
        }

        if (typeof headers !== 'undefined') {
            payload['headers'] = headers;
        }

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call(
            'post',
            uri,
            {
                'content-type': 'application/json',
            },
            payload,
        );
    }

    /**
     * Get execution
     *
     * Get a function execution log by its unique ID.
     *
     * @param {string} functionId
     * @param {string} executionId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async getExecution(
        functionId: string,
        executionId: string,
    ): Promise<Models.Execution> {
        if (typeof functionId === 'undefined') {
            throw new AppwriteException(
                'Missing required parameter: "functionId"',
            );
        }

        if (typeof executionId === 'undefined') {
            throw new AppwriteException(
                'Missing required parameter: "executionId"',
            );
        }

        const apiPath = '/functions/{functionId}/executions/{executionId}'
            .replace('{functionId}', functionId)
            .replace('{executionId}', executionId);
        const payload: Payload = {};

        const uri = new URL(this.client.config.endpoint + apiPath);
        return await this.client.call(
            'get',
            uri,
            {
                'content-type': 'application/json',
            },
            payload,
        );
    }
}
