# SlientVoice Backend

A robust and scalable Node.js backend API for the SlientVoice project, built with Express.js, MongoDB, and modern JavaScript practices.

## 🚀 Features

- **RESTful API Architecture**: Clean and organized API endpoints
- **User Management System**: Complete CRUD operations for user management
- **Data Validation**: Comprehensive input validation using Express Validator
- **Unique ID Generation**: Auto-generated UIDs and GIDs for all entities
- **MongoDB Integration**: Mongoose ODM for database operations
- **Modular Structure**: Clean separation of concerns with controllers, models, routes, and services
- **Error Handling**: Centralized error handling and validation
- **Authentication Ready**: JWT and bcrypt integration for secure authentication
- **File Upload Support**: Multer integration for file handling
- **Environment Configuration**: Dotenv for environment variable management

## 📋 Table of Contents

- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Database Models](#database-models)
- [Validation Rules](#validation-rules)
- [Development](#development)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/toufikforyou/SlientVoiceBackend.git
   cd SlientVoiceBackend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/slientvoice
DB_NAME=slientvoice

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=24h

# Other Configuration
BCRYPT_SALT_ROUNDS=12
```

## 📁 Project Structure

```
SlientVoiceBackend/
├── src/
│   ├── apis/
│   │   ├── v1/
│   │   │   ├── controllers/     # Route controllers
│   │   │   ├── models/          # Database models
│   │   │   ├── routes/          # API routes
│   │   │   ├── validators/      # Input validation
│   │   │   ├── services/        # Business logic
│   │   │   ├── middlewares/     # Custom middlewares
│   │   │   └── helpers/         # Helper functions
│   │   └── v2/                  # Future API version
│   ├── config/                  # Configuration files
│   ├── database/                # Database connection
│   ├── middlewares/             # Global middlewares
│   ├── models/                  # Shared models
│   ├── services/                # Global services
│   └── utils/                   # Utility functions
├── test/                        # Test files
├── server.js                    # Entry point
├── package.json
└── README.md
```

## 🌐 API Endpoints

### User Management (v1)

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| `POST` | `/api/v1/users` | Create a new user | ✅ |
| `GET` | `/api/v1/users` | Get all users | ❌ |
| `GET` | `/api/v1/users/:uid` | Get user by UID | ✅ |
| `PUT` | `/api/v1/users/:uid` | Update user by UID | ❌ |
| `DELETE` | `/api/v1/users/:uid` | Delete user by UID | ✅ |

### Base URL
```
http://localhost:3000/api/v1
```

## 💡 Usage Examples

### Create User
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "USER_12345",
    "username": "john_doe"
  }'
```

### Get User by UID
```bash
curl -X GET http://localhost:3000/api/v1/users/USER_12345
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/api/v1/users/USER_12345
```

## 🗄️ Database Models

### User Model
```javascript
{
  uid: {
    type: String,
    required: true,
    unique: true,
    default: () => uidGenerator("USER_")
  },
  username: {
    type: String,
    required: true,
    unique: true,
    default: () => uidGenerator()
  },
  gid: {
    type: String,
    required: true,
    unique: true
  },
  timestamps: true // createdAt, updatedAt
}
```

## ✅ Validation Rules

### Create User
- `gid`: Required, string, minimum 3 characters
- `uid`: Auto-generated, unique
- `username`: Auto-generated if not provided

### Update User
- `uid`: Cannot be updated (forbidden)
- `gid`: Optional, string, minimum 3 characters if provided
- `username`: Optional, string

## 🚀 Development

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Format code with Prettier
npm run format
```

### Code Style
This project uses Prettier for code formatting. Run `npm run format` to format your code.

### Adding New Features

1. **Models**: Add new Mongoose models in `src/apis/v1/models/`
2. **Controllers**: Create controllers in `src/apis/v1/controllers/`
3. **Routes**: Define routes in `src/apis/v1/routes/`
4. **Validators**: Add validation rules in `src/apis/v1/validators/`
5. **Services**: Add business logic in `src/apis/v1/services/`

## 📦 Dependencies

### Production Dependencies
- **Express.js**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling
- **Express Validator**: Input validation middleware
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT implementation
- **dotenv**: Environment variable management
- **multer**: File upload handling

### Development Dependencies
- **nodemon**: Auto-restart development server
- **prettier**: Code formatting

## 🔧 Services

### UID Generator Service
Generates unique identifiers with customizable prefixes:
```javascript
import uidGenerator from './services/uid.generator.service.js';

const userId = uidGenerator("USER_"); // USER_ABC123DEF456
const groupId = uidGenerator("GROUP_"); // GROUP_XYZ789GHI012
```

### Validation Service
Centralized validation error handling using Express Validator and API Response model.

## 🚦 Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information",
  "errors": ["Array of validation errors if applicable"]
}
```

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `409`: Conflict (duplicate resources)
- `500`: Internal Server Error

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code structure
- Use meaningful commit messages
- Add validation for new endpoints
- Test your changes thoroughly
- Run `npm run format` before committing

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Team Slient Voice**

## 📞 Support

For support, email [support@slientvoice.com] or create an issue in this repository.

---

Made with ❤️ by Team Slient Voice
