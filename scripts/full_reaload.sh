#!/bin/bash
kubectl delete -f ../k8s/default/
kubectl apply -f ../k8s/default/
