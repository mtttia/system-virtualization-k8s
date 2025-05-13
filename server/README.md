# User Authentication Service

Servizio di autenticazione utenti basato su Node.js, Express e MySQL.

## Requisiti

- Node.js 18+
- MySQL 8+
- Docker (opzionale)

## Configurazione

1. Clona il repository
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Crea un file `.env` nella root del progetto con le seguenti variabili:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=auth_service
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=24h
   ```

## Esecuzione

### Sviluppo
```bash
npm run dev
```

### Produzione
```bash
npm start
```

### Docker
```bash
docker build -t auth-service .
docker run -p 3000:3000 auth-service
```

## API Endpoints

### Autenticazione
- POST `/api/auth/register` - Registra un nuovo utente
- POST `/api/auth/login` - Login utente
- GET `/api/auth/me` - Recupera dati utente corrente

### Utente
- GET `/api/users/dashboard` - Recupera dashboard utente
- PUT `/api/users/profile` - Aggiorna profilo utente

## Documentazione API

Per la documentazione completa delle API, consulta il file `API_DOCUMENTATION.md`. 