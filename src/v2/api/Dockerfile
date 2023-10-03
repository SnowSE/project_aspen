FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

COPY ./api ./api
COPY ./shared ./shared

WORKDIR /app/api

RUN dotnet restore

ENTRYPOINT ["dotnet", "watch", "run"]