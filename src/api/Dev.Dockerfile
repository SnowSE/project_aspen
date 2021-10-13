FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env

RUN useradd -m developer && mkdir /src && chown developer. /src
USER developer

WORKDIR /src

# ENTRYPOINT ["dotnet", "run", "-p", "api/api.csproj"]
ENTRYPOINT tail -f /dev/null