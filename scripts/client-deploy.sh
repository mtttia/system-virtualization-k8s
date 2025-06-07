sudo docker build -t mtttia/client:latest client
sudo docker push mtttia/client:latest
kubectl rollout restart deployment client
kubectl get pods