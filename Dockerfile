# Step 1
FROM node:16

# Step 2
WORKDIR /usr/src/app

# Step 3
# COPY package*.json ./
RUN git clone https://github.com/JunohK/docker-project
WORKDIR docker-junoh
RUN npm install

# Step 4
EXPOSE 8000

# Step 5
CMD ["node","app.js"]
