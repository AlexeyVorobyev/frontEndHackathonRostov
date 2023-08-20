'use client'

import {api} from './api'

export const airportsApi = api.injectEndpoints({
    endpoints:builder => ({
        getJobs: builder.query({
            query: (settings) => `template/${settings.template}`,
            providesTags: ["template"]
        }),
    }),
    overrideExisting:false,
})