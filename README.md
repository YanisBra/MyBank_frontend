Install dependencies and build the app for production
```
npm install
npm run build
npm run start
```

Build the image and run as container
```
docker build -t myank_frontend .
docker run --name mybank_frontend_container -p 5173:5173 mybank_frontend
```