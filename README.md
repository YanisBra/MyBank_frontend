Install dependencies and build the app for production
```
npm install
npm run build
npm run start
```

Build the image and run as container
```
docker build -t MyBank_frontend .
docker run --name MyBank_frontend_container -p 3000:3000 MyBank_frontend
```