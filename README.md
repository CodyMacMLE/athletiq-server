# Express App Backend Template

---

## Tech Stack

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white)
![Pino](https://img.shields.io/badge/Pino-23221E1F.svg?style=flat&logo=pino&logoColor=white) ![CORS](https://img.shields.io/badge/CORS-221E1F) ![Helmut](https://img.shields.io/badge/Helmet-96060C)

---

## Scripts

The following scripts are available via `npm run <script>`:

- **start**: Runs the production server from `src/server.js`.
- **dev**: Runs the server in development mode, using `debug.env` for environment variables and automatically restarting on file changes.
- **debug**: Runs the server in debug mode, listening on `0.0.0.0:9229` for inspector connections, with file watching enabled.
- **lint**: Runs ESLint checks on all files in `src/`.
- **test**: Currently a placeholder that exits with an error.

### Usage Examples

```bash
npm run dev     # Start development server with auto-reload
npm run start   # Start production server
npm run lint    # Run ESLint checks
npm run debug   # Start in debug mode
```

---

## Current Routes

These are the main routes exposed by the backend.

- `GET /`

  ```bash
    Terminal: curl -i <serverAddr:port>
    Browser: <serverAddr:port>
  ```

  **Parameters:** n/a
  **Authentication:** n/a
  **Returns:** A basic health/status message confirming that the server is running.

  **Success Example:**

  ```json
  {
    "status": "ok",
    "author": "Astral Tech Solutions",
    "githubUrl": "https://github.com/Github_User/Github_Repo",
    "version": "0.0.1"
  }
  ```

  **Error Example:** n/a

---

## Error Handling

The backend uses consistent JSON error responses with appropriate HTTP status codes:

- **400 Bad Request**: Malformed requests or invalid parameters.
- **401 Unauthorized**: Missing or invalid authentication.
- **404 Not Found**: Requested resource does not exist.
- **500 Internal Server Error**: Unexpected server-side errors.

Errors are logged using [pino](https://github.com/pinojs/pino) for observability.  
The API ensures that errors are returned in a structured format, typically:

```json
  "status": "error",
  "message": "Description of the error"
```

---

## Installation

The following is how to clone and install this app on your local machine.

```bash
  npm install
```

**Note:** App was made with Node.js v22.9.0

### Config Setup

```bash
  mkdir .vscode
  touch .env .vscode/launch.json .vscode/settings.json .prettierignore .prettierrc debug.env env.jest eslint.config.mjs
```

#### Files

**.env**

```.env
# Port for the server
PORT=8080

# which log messages to show (usually `info` for production, `debug` for development, `silent` to disable)
LOG_LEVEL=debug

# AWS Amazon Cognito User Pool ID (use your User Pool ID)
AWS_COGNITO_POOL_ID=us-east-1_xxxxxxxxxx

# AWS Amazon Cognito Client App ID (use your Client App ID)
AWS_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxx
```

**.vscode/launch.json**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug via npm run debug",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run-script", "debug"],
      "skipFiles": ["<node_internals>/**"],
      "type": "node"
    }
  ]
}
```

**.vscode/settings.json**

```json
{
  "editor.insertSpaces": true,
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "always"
  },
  "files.eol": "\n",
  "files.insertFinalNewline": true
}
```

**.prettierignore**

```
node_modules/
package.json
package-lock.json
```

**.prettierrc**

```json
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "endOfLine": "lf",
  "insertPragma": false,
  "proseWrap": "preserve",
  "requirePragma": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "printWidth": 100
}
```

**debug.env**

```
LOG_LEVEL=debug
```

**env.jest**

```
# env.jest

################################################################################
# Environment variables with values for running the tests.
################################################################################

# HTTP Port (defaults to 8080)
PORT=8080

# Disable logs in tests. If you need to see more detail, change this to `debug`
LOG_LEVEL=silent

# .htpasswd file to use in testing
HTPASSWD_FILE=tests/.htpasswd
```

**eslint.config.mjs**

```
import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
];
```
