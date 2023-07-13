<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
  <h1>Course Selling Website Backend</h1>

  <h2>Technologies Used</h2>
  <ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB</li>
    <li>Bcrypt</li>
    <li>JSON web tokens(JWT)</li>
  </ul>

  <h2>Installation</h2>
  <ol>
    <li>Clone the repository: <code>git clone [repository URL]</code></li>
    <li>Navigate to the project directory: <code>cd course-selling-backend</code></li>
    <li>Install the dependencies: <code>npm install</code></li>
  </ol>

 <h2>API Endpoints</h2>

<h3>Admin Routes</h3>

<table>
  <tr>
    <th>URL</th>
    <th>Description</th>
    <th>Request Body</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>POST /admin/signup</td>
    <td>Creates a new admin account.</td>
    <td>
      <ul>
        <li>username: String (required) - Admin username</li>
        <li>password: String (required) - Admin password</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Success: Status 200 OK, { message: 'Admin created successfully' }</li>
        <li>Error: Status 400 Bad Request or 500 Internal Server Error</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>POST /admin/login</td>
    <td>Authenticates an admin.</td>
    <td>
      <ul>
        <li>username: String (required) - Admin username</li>
        <li>password: String (required) - Admin password</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Success: Status 200 OK, { message: 'Logged in successfully', token: 'jwt_token_here' }</li>
        <li>Error: Status 401 Unauthorized or 500 Internal Server Error</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>POST /admin/courses</td>
    <td>Creates a new course.</td>
    <td>
      <ul>
        <li>Authorization: String (required) - Bearer token</li>
      </ul>
      <ul>
        <li>title: String (required) - Course title</li>
        <li>description: String (required) - Course description</li>
        <li>price: Number (required) - Course price</li>
        <li>imageLink: String (required) - URL of the course image</li>
        <li>published: Boolean (required) - Course publish status</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Success: Status 200 OK, { message: 'Course created successfully' }</li>
        <li>Error: Status 400 Bad Request or 500 Internal Server Error</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>PUT /admin/courses/:courseId</td>
    <td>Edits an existing course.</td>
    <td>
      <ul>
        <li>Authorization: String (required) - Bearer token</li>
      </ul>
      <ul>
        <li>title: String (required) - Updated course title</li>
        <li>description: String (required) - Updated course description</li>
        <li>price: Number (required) - Updated course price</li>
        <li>imageLink: String (required) - Updated URL of the course image</li>
        <li>published: Boolean (required) - Updated course publish status</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Success: Status 200 OK, { message: 'Course updated successfully' }</li>
        <li>Error: Status 400 Bad Request or 500 Internal Server Error</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>GET /admin/courses</td>
    <td>Returns all the courses.</td>
    <td>
      <ul>
        <li>Authorization: String (required) - Bearer token</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Success: Status 200 OK, { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }</li>
        <li>Error: Status 500 Internal Server Error</li>
      </ul>
    </td>
  </tr>
</table>

<h3>User Routes</h3>

<table>
  <tr>
    <th>URL</th>
    <th>Description</th>
    <th>Request Body</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>POST /users/signup</td>
    <td>Creates a new user account.</td>
    <td>
      <ul>
        <li>username: String (required) - User username</li>
        <li>password: String (required) - User password</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Success: Status 200 OK, { message: 'User created successfully' }</li>
        <li>Error: Status 400 Bad Request or 500 Internal Server Error</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>POST /users/login</td>
    <td>Authenticates a user.</td>
    <td>
      <ul>
        <li>username: String (required) - User username</li>
        <li>password: String (required) - User password</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Success: Status 200 OK, { message: 'Logged in successfully', token: 'jwt_token_here' }</li>
        <li>Error: Status 401 Unauthorized or 500 Internal Server Error</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>GET /users/courses</td>
    <td>Lists all the courses.</td>
    <td>
      <ul>
        <li>Authorization: String (required) - Bearer token</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Success: Status 200 OK, { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }</li>
        <li>Error: Status 500 Internal Server Error</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>POST /users/courses/:courseId</td>
    <td>Purchases a course.</td>
    <td>
      <ul>
        <li>Authorization: String (required) - Bearer token</li>
        <li>user email in body(required)</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Success: Status 200 OK, { message: 'Course purchased successfully' }</li>
        <li>Error: Status 400 Bad Request or 500 Internal Server Error</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>GET /users/purchasedCourses</td>
    <td>Lists all the courses purchased by the user.</td>
    <td>
      <ul>
        <li>Authorization: String (required) - Bearer token</li>
        <li>user email in body(required)</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Success: Status 200 OK, { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }</li>
        <li>Error: Status 500 Internal Server Error</li>
      </ul>
    </td>
  </tr>
</table>


  <h2>Usage</h2>
  <ol>
    <li>Make sure you have MongoDB installed and running on your machine.</li>
    <li>The mongodb should run on mongodb://localhost:27017</li>
    <li>Make sure that the database name should be course-selling-website</li>
    <li>It should have 3 collections 'users','admin','courses'</li>
    <li>Start the server: <code>npm start</code></li>
    <li>Use a tool like Postman to send requests to the available API endpoints according to the request formats mentioned
      above.</li>
    <li>Enjoy interacting with the backend to manage courses, authenticate users, and handle course purchases.</li>
  </ol>

  <h2>Conclusion</h2>

  <p>
    The backend of the Course Selling Website provides a secure and efficient API for managing courses, user authentication, and course purchasing. Users can interact with the backend by sending requests via tools like Postman. Feel free to explore the API endpoints and integrate the backend into your project.
  </p>

  <p>
    For further information or assistance, please feel free to contact me.
  </p>

</body>

</html>

