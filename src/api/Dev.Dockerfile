FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
RUN apt-get update \
    && apt-get install -y curl npm \
    && npm i -g n \
    && n stable \
    && mkdir -p /src/api
WORKDIR /src

COPY api/*.csproj ./
RUN dotnet restore
COPY api/. . 

ENTRYPOINT ["dotnet", "run", "-p", "api.csproj"]