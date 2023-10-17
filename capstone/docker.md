# Command

## How to run the Dockerfile locally

#### Build Docker Image
```
docker build -t flask-api .
```
 after you buld the image now you can run 


```
docker run -dp 5000:5000 -w /app -v "$(pwd):/app" flask-api sh -c "flask run --host=0.0.0.0"
```
