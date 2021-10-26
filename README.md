# Hepsiburada case study

Search page design given by hepsiburada [Live demo](https://ecstatic-bhaskara-026a35.netlify.app).
For best page experience i suggest (1920x1080) screen.

### Requirements:

<hr/>

- First clone repo to your computer.

```
git clone https://github.com/dnnzz/hepsiburadacase.git
```

### Install modules & run in localhost

<hr/>

- Install the required dependencies:

```
yarn install
```

- To run the application in dev mode on [localhost:3000](http://localhost:3000):

```
yarn start
```

- To run the application with the production build on [localhost:8081](http://localhost:8081):

```
yarn build  # producing a production build
yarn run server  # running the server
```

<br/>

### With Docker

<hr/>

- In project directory run the following command to build image.

```
docker build -t hepsiburada-case-study .
```

- To run the application on [localhost:80](http://localhost:80):

```
docker run -itd -p 80:80 --name <your-container-name> hepsiburada-case-study
```

<br/>

## Building the Project

<hr/>

- To create a build:

```
yarn build
```

<br/>

## Running the Tests

- To run tests

```
yarn test
```

- To run all tests with coverage

```
yarn test --watchAll=false --coverage
```


<br/>

## Lighthouse report
![lighthouse report](https://i.ibb.co/R4RnSSW/Ekran-Resmi-2021-10-25-14-42-26.png)


## Coverage report
![coverage report](https://i.ibb.co/5YL5JNx/Ekran-Resmi-2021-10-26-13-51-21.png)

