FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
RUN apt-get update \
    && apt-get install -y curl npm git \
    && npm i -g n \
    && n stable
WORKDIR /aspen/src

CMD tail -f /dev/null