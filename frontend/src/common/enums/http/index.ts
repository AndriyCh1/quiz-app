export const HttpMethod = {
    GET: "GET",
    POST:  "POST",
    PUT: "PUT",
    DELETE: "DELETE",
} as const;

export const ContentType = {
    JSON: "json",
    TEXT: "text/html"
} as const;

export enum HttpCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}