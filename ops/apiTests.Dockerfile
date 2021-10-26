FROM mcr.microsoft.com/dotnet/sdk:5.0
WORKDIR /app

COPY api/*.csproj ./api/
COPY api-tests/*.csproj ./api-tests/
COPY aspen.sln .
RUN dotnet restore api-tests/api-tests.csproj

COPY . . 
# CMD dotnet test
CMD tail -f /dev/null