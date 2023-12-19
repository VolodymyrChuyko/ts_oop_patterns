export const manualParts = {
    list: `
## <a name="list">list</a>
**Request:**

\`/api/users?page=2\`

**Response:**

\`\`\`json
{
    status: 200,
    body: {
        "page": 2,
        "per_page": 6,
        "total": 12,
        "total_pages": 2,
        "data": [
            {
                "id": 7,
                "email": "michael.lawson@reqres.in",
                "first_name": "Michael",
                "last_name": "Lawson",
                "avatar": "https://reqres.in/img/faces/7-image.jpg"
            },
            {
                "id": 8,
                "email": "lindsay.ferguson@reqres.in",
                "first_name": "Lindsay",
                "last_name": "Ferguson",
                "avatar": "https://reqres.in/img/faces/8-image.jpg"
            },
            {
                "id": 9,
                "email": "tobias.funke@reqres.in",
                "first_name": "Tobias",
                "last_name": "Funke",
                "avatar": "https://reqres.in/img/faces/9-image.jpg"
            },
            {
                "id": 10,
                "email": "byron.fields@reqres.in",
                "first_name": "Byron",
                "last_name": "Fields",
                "avatar": "https://reqres.in/img/faces/10-image.jpg"
            },
            {
                "id": 11,
                "email": "george.edwards@reqres.in",
                "first_name": "George",
                "last_name": "Edwards",
                "avatar": "https://reqres.in/img/faces/11-image.jpg"
            },
            {
                "id": 12,
                "email": "rachel.howell@reqres.in",
                "first_name": "Rachel",
                "last_name": "Howell",
                "avatar": "https://reqres.in/img/faces/12-image.jpg"
            }
        ],
        "support": {
            "url": "https://reqres.in/#support-heading",
            "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
    }
}
\`\`\`
    `,
    get: `
## <a name="get">get</a>
**Request:**

\`/api/users/2\`

**Response:**

\`\`\`json
{
    status: 200,
    body: {
        "data": {
            "id": 2,
            "email": "janet.weaver@reqres.in",
            "first_name": "Janet",
            "last_name": "Weaver",
            "avatar": "https://reqres.in/img/faces/2-image.jpg"
        },
        "support": {
            "url": "https://reqres.in/#support-heading",
            "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
    }
}
\`\`\`
    `,
    create: `
## <a name="create">create</a>
**Request:**

\`/api/users\`
\`\`\`json
{
    "name": "morpheus",
    "job": "leader"
}
\`\`\`

**Response:**

\`\`\`json
{
    status: 201,
    body: {
        "id": "123",
        "createdAt": "2023-12-17T16:13:13.509Z"
    }
}
\`\`\`
    `,
    update: `
## <a name="update">update</a>
**Request:**

\`/api/users/2\`
\`\`\`json
{
    "name": "morpheus",
    "job": "zion resident"
}
\`\`\`

**Response:**


\`\`\`json
{
    status: 200,
    body: {
        "updatedAt": "2023-12-17T16:14:27.812Z"
    }
}
\`\`\`
    `,
    replace: `
## <a name="replace">replace</a>
**Request:**

\`/api/users/2\`
\`\`\`json
{
    "name": "morpheus",
    "job": "zion resident"
}
\`\`\`

**Response:**


\`\`\`json
{
    status: 200,
    body: {
        "updatedAt": "2023-12-17T16:15:57.164Z"
    }
}
\`\`\`
    `,
    delete: `
## <a name="delete">delete</a>
**Request:**

\`/api/users/2\`

**Response:**

\`\`\`json
{
    status: 204,
}
\`\`\`
    `,
};
