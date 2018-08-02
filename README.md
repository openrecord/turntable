[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Openrecord Back-End

Backend for the openrecord platform.

The service is currently hosted on AWS [Lambda](https://aws.amazon.com/lambda) via [Serverless](https://serverless.com/).

## Local Development

To set up your local development, make sure you have Node.js version 8 or above installed.

```bash
npm install     # Install packages
npm start       # Run serverless offline
```

You may also interact with the codebase using `serverless`:

```bash
sls info        # Print info about the deployment.
sls deploy      # Deploy!
```

#### Prettier

This codebase uses [husky](https://github.com/typicode/husky) and [pretty-quick](https://github.com/azz/pretty-quick) to run a pre-commit hook which formats staged files before committing. This is to ensure that all files checked-into the codebase adhere to the [prettier](https://prettier.io/) configuration and code styling is consistent.

If you like, you can set up prettier to format on-save within WebStorm 2018.1 or above: https://prettier.io/docs/en/webstorm.html.

## Configuration

TODO

## Tech

- [Serverless](https://serverless.com/)
- [AWS Lambda](https://aws.amazon.com/lambda)
- [Docker](https://docs.docker.com/)
- [Prettier](https://prettier.io/)

## TODO

- [ ] Setup local development
- [ ] Setup config
- [ ] Write failing test
- [ ] Setup production env
- [ ] Configure DNS
- [ ] Finish README
- [ ] Create limited IAM role(s) for other users to deploy and invoke
- [ ] Add username, unique keys for email and username
