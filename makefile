include db/Makefile # all db related commands are in db/Makefile

# deploy on aws ec2 aws linux server
update_yum:
	@echo "update yum"
	sudo yum update -y

update_apt:
	@echo "update apt"
	sudo apt update -y

install_and_start_docker:
	@echo "install docker"
	sudo yum install docker -y

	@echo "start docker"
	sudo systemctl start docker
	@echo "enable docker"
	sudo systemctl enable docker
	sudo usermod -aG docker ec2-user

install_git:
	@echo "install git"
	sudo yum install git -y

clone_repo:
	@echo "clone repo"
	git clone https://github.com/CopyDemon/uuid_generator.git

build_docker_image:
	@echo "build docker image"
	cd uuid_generator &&docker build -t uuid-generator -f dockerFile .

run_docker_container:
	@echo "run docker container"
	docker run -d -p 80:80 --name uuid-app uuid-generator

# Redeploy site with latest code
renew_site:
	@echo "=========================================="
	@echo "  Renewing UUID Generator Site"
	@echo "  This will stop container, pull latest code, build image and run container"
	@echo "=========================================="
	cd ~/uuid_generator && git pull
	docker stop uuid-app || true
	docker rm uuid-app || true
	cd ~/uuid_generator && docker build -t uuid-generator -f dockerFile .
	docker run -d -p 80:80 -p 443:443 \
		-v /etc/letsencrypt:/etc/letsencrypt:ro \
		--name uuid-app uuid-generator
	@echo "=========================================="
	@echo "  Site renewed successfully!"
	@echo "=========================================="




# Setup SSL certificate with Let's Encrypt
# Prerequisites: 
#   1. Domain DNS must point to this server
#   2. Port 443 must be open in Security Group
DOMAIN = mybittools.com

setup_ssl:
	@echo "=========================================="
	@echo "  Setting up SSL Certificate"
	@echo "  Domain: $(DOMAIN)"
	@echo "=========================================="
	@echo "[1/5] Stopping container to free port 80..."
	docker stop uuid-app || true
	@echo "[2/5] Installing certbot..."
	sudo yum update -y
	sudo yum install -y certbot
	@echo "[3/5] Obtaining SSL certificate..."
	sudo certbot certonly --standalone -d $(DOMAIN) -d www.$(DOMAIN)
	@echo "[4/5] Setting up auto-renewal cron job..."
	sudo yum install -y cronie
	sudo systemctl enable crond
	sudo systemctl start crond
	(sudo crontab -l 2>/dev/null | grep -v certbot; echo "0 3 1 * * certbot renew --pre-hook 'docker stop uuid-app' --post-hook 'docker start uuid-app'") | sudo crontab -
	@echo "[5/5] Restarting container with SSL..."
	docker rm uuid-app || true
	cd ~/uuid_generator && docker build -t uuid-generator -f dockerFile .
	docker run -d -p 80:80 -p 443:443 \
		-v /etc/letsencrypt:/etc/letsencrypt:ro \
		--name uuid-app uuid-generator
	@echo "=========================================="
	@echo "  SSL Setup Complete!"
	@echo "  Your site is now available at https://$(DOMAIN)"
	@echo "  Auto-renewal is configured for the 1st of each month"
	@echo "=========================================="