# Vintage Poker

# Quick Start

### Add a local.env file in "./server/config" folder with the following

```
  MONGO_URI:<YOUR_MONGODB_URI>
  JWT_SECRET:<YOUR_JWT_SECRET>
  PORT:<YOUR_SERVER_PORT>
```

### Install server dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd client
npm install
```

### Run both Express & React from root

```bash
npm run dev
```

### Build for production

```bash
cd client
npm run build
```

### Test production before deploy

```bash
NODE_ENV=production node server.js
```

Check in browser on [http://localhost:5000/](http://localhost:5000/)
