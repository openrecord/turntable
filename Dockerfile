FROM node:8

RUN mkdir /app
WORKDIR /app

COPY package.json .

RUN npm i --loglevel warn --no-progress

COPY bin bin
COPY server server
COPY prisma.yml datamodel.graphql schema.graphql .graphqlconfig.yaml ./

# Can't do this without a running server already?
#RUN npm run codegen && npm run compile

CMD bash