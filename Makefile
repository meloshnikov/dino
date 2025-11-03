install: 
	rm -rf ./node_modules && npm ci --force

start:
	npm run start

start-dev:
	npm run start:dev

lint:
	npm run lint
