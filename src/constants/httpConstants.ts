export const HTTP_STATUS = {
    // Success responses
    OK: 200,
    CREATED: 201,

    // Client error responses
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,

    // Server error responses
    INTERNAL_SERVER_ERROR: 500,
} as const;