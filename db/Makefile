#################################
# Postgres DB related
#################################
# Build postgres DB
build_db:
	@echo "Building postgres image, container, volumes, then start it"
	docker compose -f docker/db-compose.yml --env-file .env up -d --build


# start postgres DB
start_db:
	@echo "starting existing postgres image"
	docker compose -f docker/db-compose.yml --env-file .env up -d
	
# stop postgres DB
stop_db:
	@echo "Stopping postgres image"
	docker compose -f docker/db-compose.yml --env-file .env down

# rebuild postgres DB
rebuild_db:
	@echo "Rebuilding postgres DB"
	make stop_db
	make build_db