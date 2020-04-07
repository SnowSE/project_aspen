#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 5001
RUN adduser -h /app app -D -s /usr/sbin/nologin
RUN mkdir -p /app/.postgresql
RUN chmod 700 /app/.postgresql

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-alpine AS build
WORKDIR /src
COPY ["aspen.api/aspen.api.csproj", "aspen.api/"]
COPY ["aspen.core/aspen.core.csproj", "aspen.core/"]
RUN dotnet restore "aspen.api/aspen.api.csproj"
COPY . .
WORKDIR "/src/aspen.api"
RUN dotnet build "aspen.api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "aspen.api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
RUN chown -R app:app /app
ENV ASPNETCORE_URLS=http://+:5000
USER app
# ENTRYPOINT ["dotnet", "aspen.api.dll"]
ENTRYPOINT [ "top" ]
