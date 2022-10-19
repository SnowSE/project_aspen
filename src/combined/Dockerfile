#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
RUN apt update
RUN printf 'y\n1\n\1n' | apt install curl
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
RUN apt update
# We directly answer the questions asked using the printf statement
RUN printf 'y\n1\n\1n' | apt install nodejs
RUN apt install -y npm
WORKDIR /src
COPY ["combined/combined.csproj", "combined/"]
COPY ["shared/shared.csproj", "shared/"]
RUN dotnet restore "combined/combined.csproj"
COPY . .
WORKDIR "/src/combined"
RUN dotnet build "combined.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "combined.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "combined.dll"]