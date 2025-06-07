sudo docker build -t mtttia/server:latest ../server
sudo docker push mtttia/server:latest
kubectl rollout restart deployment server
kubectl get pods
