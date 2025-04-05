
# Analysis of Logs

## Initialize

### 1. Set Git
```sh
git init
git remote add git@github.com:petar-perovic/teska-gospoda.git
git pull origin master
```

### 2. Set Backend
```sh
cd backend
npm install
npm start
```

### 3. Set Frontend
```sh
cd frontend
npm install
npm start
```

## Setting Priorities

Za drugi zadatak, Score se računa po formuli Score = 200 * |ERROR| + 10 * |WARNING|, |ERROR| predstavlja broj linija u kojima se nalazi ERROR poruka, i analogno za WARNING.
