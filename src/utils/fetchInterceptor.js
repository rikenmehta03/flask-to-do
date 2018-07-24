import fetchIntercept from 'fetch-intercept';

export const fetchInterceptor = () => {
    const unregister = fetchIntercept.register({
        request: function (url, config) {
            // Modify the url or config here
            return [url, config];
        },

        requestError: function (error) {
            // Called when an error occurred during another 'request' interceptor call
            return Promise.reject(error);
        },

        response: function (response) {
            // Modify the response object
            return response;
        },

        responseError: function (error) {
            // Handle an fetch error
            return Promise.reject(error);
        }
    });

    return {
        unregister
    };
}
