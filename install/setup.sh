#!/bin/bash
# ===========================================
# UUID Generator - EC2 Deployment Script
# For Amazon Linux 2
# ===========================================

set -e  # Exit on any error

echo "=========================================="
echo "  UUID Generator Deployment Script"
echo "=========================================="

# Step 1: Update system
echo "[1/6] Updating system packages..."
sudo yum update -y

# Step 2: Install Docker
echo "[2/6] Installing Docker..."
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Step 3: Install Git
echo "[3/6] Installing Git..."
sudo yum install git -y

# Step 4: Clone repository
echo "[4/6] Cloning repository..."
cd ~
if [ -d "uuid_generator" ]; then
    echo "Repository already exists, pulling latest..."
    cd uuid_generator && git pull
else
    git clone https://github.com/CopyDemon/uuid_generator.git
    cd uuid_generator
fi

# Step 5: Build Docker image
echo "[5/6] Building Docker image..."
sudo docker build -t uuid-generator -f dockerFile .

# Step 6: Run container
echo "[6/6] Starting container..."
# Stop and remove existing container if exists
sudo docker stop uuid-app 2>/dev/null || true
sudo docker rm uuid-app 2>/dev/null || true
# Start new container
sudo docker run -d -p 80:80 --name uuid-app uuid-generator

echo "=========================================="
echo "  Deployment Complete!"
echo "  Your app is running at http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo "=========================================="
