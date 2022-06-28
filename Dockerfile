################################################################################
# BASE
# This is the stage that the other stages in this file are based on.
# - defines the Node version
# - set global configuration
# - set default work dir
################################################################################
FROM node:16.14-alpine as base

RUN apk add --update --no-cache git

ENV HUSKY=0

# Apply Yarn settings
RUN yarn config set cache-folder ~/.yarn \
    && yarn config set network-timeout 300000 -g \
    && yarn config set prefer-offline true

# Create app directory
WORKDIR /workspace

################################################################################
# BUILDER
# This is the stage where the app is built
# - copy over package.json and yarn.lock
# - install all dependencies
# - copy over source files
# - run build command
################################################################################
FROM base as builder

# Copy package.json and the lock file
COPY package.json yarn.lock /workspace/

# Install app dependencies
RUN yarn

# Copy source files
COPY . .

# Build apps
RUN yarn build


#################################################################################
## NODE_MODULES
## This is the stage where the production node_modules is built
## - copy over package.json and yarn.lock
## - install production dependencies
#################################################################################
FROM base as node_modules

# Copy package.json and the lock file
COPY package.json yarn.lock /workspace/

# Install production dependencies
RUN yarn install --production


################################################################################
# FINAL
# This is the stage where the final production image is built
# - copy the dist folder from the builder image
# - copy the node_modules folder from the node_modules image
################################################################################
FROM base as final

#RUN apk --no-cache add krb5-libs

COPY libs/api/core/data-access/src/prisma/schema.prisma /workspace/libs/api/core/data-access/src/prisma/schema.prisma

# Copy over artifacts from builder image
COPY --from=builder /workspace/dist /workspace/dist

# Copy over node_modules from node_modules image
COPY --from=node_modules /workspace/node_modules /workspace/node_modules

# Copy package.json and the lock file
COPY package.json yarn.lock /workspace/

# Expose default port
EXPOSE 3000

# Start server
CMD ["yarn", "start"]
