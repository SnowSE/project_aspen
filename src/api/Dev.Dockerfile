FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
RUN apt-get update \
    && apt-get install -y curl npm \
    && npm i -g n \
    && n stable
WORKDIR /src

ENTRYPOINT ["dotnet", "run", "-p", "api/api.csproj"]
# ENTRYPOINT tail -f /dev/null