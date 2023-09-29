FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

# COPY *.csproj .
# RUN dotnet restore

COPY ./api ./api
COPY ./shared ./shared

WORKDIR /app/api

ENTRYPOINT ["dotnet", "watch", "run"]