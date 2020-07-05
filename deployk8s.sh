#!/usr/bin/env bash
#
# deploy to Kubernetes on GKE

# shellcheck source=.env
source .env

if [ -z "$GCP_PROJECT_ID" ]; then
    >&2 echo "GCP_PROJECT_ID not set"
    exit 21
fi
if [ -z "$GCP_ZONE" ]; then
    >&2 echo "GCP_ZONE not set"
    exit 22
fi
if [ -z "$GKE_CLUSTER_NAME" ]; then
    >&2 echo "GKE_CLUSTER_NAME not set"
    exit 23
fi

# default to production deployment
ENVIRONMENT=${ENVIRONMENT:-"production"}

# k8's namespace and other env specific variables
# staging or production(DEFAULT)
NAMESPACE="devsecops-cm"
URL="devsecopscm.jujhar.com"
CONTAINER_NAME="eu.gcr.io/${GCP_PROJECT_ID}/${NAMESPACE}"

echo "Deploying to ${ENVIRONMENT}"

# authenticate and switch to right project
# gcloud auth application-default login
gcloud config set project "${GCP_PROJECT_ID}"
gcloud config set compute/zone "${GCP_ZONE}"

# get container cluster creds
gcloud container clusters get-credentials "${GKE_CLUSTER_NAME}" --zone "${GCP_ZONE}" --project "${GCP_PROJECT_ID}"
echo "check to see if I can connect to project"

if ! gcloud compute instances list; then
    >&2 echo "error with gcloud auth"
    exit 3
fi

echo "Building and pushing container"
# build php container (locally)
gcloud auth configure-docker --quiet
# build php container
docker build -f Dockerfile -t "${CONTAINER_NAME}:latest" ./
# deploy container to GCR
docker push "${CONTAINER_NAME}:latest"

# create namespace
kubectl create namespace "${NAMESPACE}" || true

# create nginx configMap and sed out local vars for k8s friendly ones
kubectl create configmap nginx-conf \
    --namespace="${NAMESPACE}" \
    --from-file=build/nginx/default.conf \
    --output yaml \
    --dry-run=client | \
    kubectl apply -f -

# tls origin certs from cloudflare
# you might need to generate your own and store them in the .secrets dir
kubectl delete secret tls --namespace="${NAMESPACE}" || true
kubectl create secret tls tls \
    --namespace="${NAMESPACE}" \
    --cert=.secrets/tls/cert.crt \
    --key=.secrets/tls/key.key || true

# # deploy main pod
< build/kubernetes/app.yml \
    sed s~\$N_CONTAINER_NAME~"${CONTAINER_NAME}"~g | \
    sed s~\$N_NAMESPACE~"${NAMESPACE}"~g | \
    sed s~\$N_ENVIRONMENT~"${ENVIRONMENT}"~g | \
    sed s~\$N_URL~${URL}~g | \
    tee "/tmp/k8s-${NAMESPACE}.yml" | \
    kubectl apply -f -

kubectl get pods --namespace="${NAMESPACE}"

echo -e "\n"
echo "Deployed ${CONTAINER_NAME} to https://${URL}"

echo -e "\n-------------------------------"

# I'm using an nginx ingress, you might want to switch this up
nginxIngressAddress=$(kubectl get svc nginx-ingress-nginx-ingress \
    -o jsonpath='{.status.loadBalancer.ingress[].ip}')
echo -e "\n Remember to setup ${URL} to point to ${nginxIngressAddress}"

echo -e "\n\n"
echo "To fire up an interactive pod into namespace"
echo kubectl -n "${NAMESPACE}" run shell --rm -it --tty --image ubuntu -- bash
echo "To list running pods"
echo kubectl -n "${NAMESPACE}" get pods
