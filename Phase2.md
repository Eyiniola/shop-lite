front end url 
https://shoplite-frontend.azurewebsites.net/

back end url
https://shoplite-backend.azurewebsites.net/products

pull request link
https://github.com/aoshingbesan/taskflow/pull/13

Provisioned resources

![alt text](<Screenshot (54).png>)

![alt text](<Screenshot (55).png>)

![alt text](<Screenshot (56).png>)

![alt text](<Screenshot (57).png>)

![alt text](<Screenshot (58).png>)

# Reflection on ShopLite Deployment Journey

## Overview
Deploying **ShopLite** using **Docker** and Azure was a learning experience with both technical and configuration challenges. While Docker simplified the environment setup, ensuring everything ran smoothly during deployment still required careful troubleshooting.

---

## Challenges Faced

### **1. Port Configuration Issue**
During the initial deployment, we encountered problems due to incorrect **port mappings** in our Docker and Azure configurations:
- The containerized backend was running internally on a port that wasn't exposed correctly in the `Dockerfile` and `docker-compose.yml`.
- Azure App Service expected the container to serve traffic on a specific port (e.g., `PORT=8080`), but our application was listening on another port.
- This mismatch caused repeated connection failures until we updated the **`EXPOSE`** directive in the Dockerfile and mapped the ports correctly in the Docker Compose configuration.

---

### **2. Signing Up for an Azure Account**
Another unexpected challenge was signing up for an **Azure account** with a **student email**:
- **Verification delays:** The student verification took longer than anticipated.
- **Service access limitations:** Some services required extra manual steps or additional setup beyond the student plan defaults.

---

## Lessons Learned
- Always **confirm exposed ports** in Dockerfiles and ensure they match the ports configured in cloud services like Azure App Service.
- Start cloud service setup **early in the project** to avoid delays from account verifications or quota issues.
- Docker simplifies deployment, but small misconfigurations (like ports) can cause major issues.

---


