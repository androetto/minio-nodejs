# 🚀 MinIO Node.js Integration

A REST API built with Node.js and TypeScript to interact with a MinIO server (an S3-compatible object storage system). This project allows you to easily upload, list, download, and delete files from your own server.

---

## 🧩 Features

- ✨ REST API using Express + TypeScript
- 📦 Supports file uploads (`multipart/form-data`)
- 🧾 Standardized JSON responses
- 📁 Integrated with MinIO for basic object operations
- 🐳 Includes Dockerfile for easy deployment
- 🛠️ Ready for production and development environments

---

## ⚙️ Requirements

- Node.js v18+
- Docker & Docker Compose (for container-based setup)
- Access to a MinIO server (or use the included example)

---

## 📦 Installation

### Option 1: Using Docker Compose

1. Copy the `docker-compose.yml` file to your server:
   ```bash
   mkdir -p /home/minio/
   cd /home/minio/
   curl -O https://raw.githubusercontent.com/androetto/minio-nodejs/main/docker-compose.yml

2. Start container
   ```bash
    docker compose up -d
3. ✅ Done! The services will be running at:

MinIO Console: http://localhost:9000

## 🔧 Environment Variables

You can define a `.env` file in the root folder to configure your setup:

```bash
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minio
MINIO_SECRET_KEY=minio123
MINIO_BUCKET=archivos
```

## 🤝 Contributing
Contributions are more than welcome! If you'd like to help improve this project, here's how you can get started:

### 🚀 How to Contribute

1. **Fork the repository**  
2. **Create a feature branch**  
   ```bash
   git checkout -b feature/my-awesome-feature

3. Commit your changes using conventional commits (see below)
4. Push your branch
   ```bash
   git push origin feature/my-awesome-feature
   
5. Open a Pull Request and briefly describe your changes 🙌

## ✍️ Conventional Commits

We follow the Conventional Commits convention for commit messages:


```text
<type>: <short summary>
 │        │
 │        └─⫸ Resumen en tiempo presente, no capitalizado y sin punto final.
 │
 └─⫸ Tipo de commit: build | docs | feat | fix | perf | refactor | test | style
```


| Type             | Description                                                           |
| ---------------- | --------------------------------------------------------------------- |
| 🛠️ **build**:    | Changes that affect the build system or external dependencies.        |
| 📝 **docs**:     | Documentation-only changes.                                           |
| ✨ **feat**:     | A new feature.                                                        |
| 🐛 **fix**:      | A bug fix.                                                            |
| ⚡ **perf**:     | Performance improvements.                                              |
| ♻️ **refactor**: | Code changes that neither fix a bug nor add a feature.                |
| ✅ **test**:     | Adding or correcting tests.                                           |
| 🎨 **style**:    | Code style changes (formatting, spacing, missing semicolons, etc.).   |
