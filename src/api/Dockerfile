FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . . 
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine
RUN apk add curl
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "aspen_api.dll"]