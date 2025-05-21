# 🚀 Multi-Node Nginx Load Balancer with Node.js and Docker

This project demonstrates how to build a **scalable Node.js app** using **Docker**, **Docker Compose**, and **Nginx** as a **load balancer**. It runs multiple instances of a Node.js app and distributes incoming traffic using Nginx.

---

## 📂 Project Structure

Multi-Node-Nginx-LoadBalancer/
── app/

│ ├── index.html

│ ├── server.js

│ └── Dockerfile

── nginx/

│ └── nginx.conf

── docker-compose.yml


- `app/`: Node.js + Express app
- `nginx/`: Nginx reverse proxy config
- `docker-compose.yml`: Docker Compose setup for services

---

## 🧰 Requirements

- 🐳 [Docker](https://www.docker.com/)
- 📦 [Docker Compose](https://docs.docker.com/compose/)
- 🟩 [Node.js](https://nodejs.org/) (for local setup only)


---

## 🧪 Run the App Locally (Without Docker)

### 1️⃣ Setup

```bash
cd app
npm init -y
npm install express
node server.js
```

👉 Access the app at: http://localhost:3000



## 🐳 Run the App with Docker


## 2️⃣ Build & Run Docker Image

```bash
docker build -t my-app .
docker run -p 3000:3000 --name my-app my-app
```

🌐 Now open http://localhost:3000

## ⚙️ Run with Docker Compose (Multiple Instances)

```bash
docker-compose up --build -d
```

You should now see the app running at:

🔹 http://localhost:3001

🔹 http://localhost:3002

🔹 http://localhost:3003

These ports are mapped like this in docker-compose.yml:

```bash
app1:
  ports:
    - "3001:3000"

app2:
  ports:
    - "3002:3000"

app3:
  ports:
    - "3003:3000"
```

# 🎯 Single Entry Point via Nginx

Once Nginx is configured as a load balancer, you should only access your application through http://localhost:3000.

✨ Behind the scenes, Nginx will distribute requests to the following app replicas:

```bash
🟦 app1 → runs on internal port 3000 (Docker: 3001:3000)

🟩 app2 → runs on internal port 3000 (Docker: 3002:3000)

🟥 app3 → runs on internal port 3000 (Docker: 3003:3000)
```
💡 Even though each app is mapped to a different external port (3001, 3002, 3003), you don’t need to access them directly.

Instead, just go to:

```bash
👉 http://localhost:3000
```

Nginx will take care of forwarding your requests evenly to all 3 app containers.

## 🌐 Set Up Nginx as Load Balancer

## 🔁 Load-Balancing Logic

## Update docker-compose.yml to expose ports internally:

```bash
app1:
  expose:
    - "3000"

app2:
  expose:
    - "3000"

app3:
  expose:
    - "3000"
```
Update nginx.conf to distribute load across the app containers:

```bash
http {
    upstream backend {
        server app1:3000;
        server app2:3000;
        server app3:3000;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
        }
    }
}
```

Restart the service

```bash
docker-compose down
docker-compose up --build -d
```

🎉 Access your load-balanced app at: http://localhost:3000

# 📝 Notes

💡 Make sure Docker is running before executing commands.

🔄 Nginx uses round-robin load balancing by default.

🔧 You can scale the app containers and update Nginx accordingly.

# 📚 References

📘 [Docker Documentation](https://docs.docker.com/)

📘 [Docker Compose Docs](https://docs.docker.com/compose/)

📘 [Nginx Load Balancing](https://nginx.org/en/docs/http/load_balancing.html)

# 👨‍💻 Author

Developed by [@cybe44oot](https://github.com/cybe44oot/) 🙌
