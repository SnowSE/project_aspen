FROM mcr.microsoft.com/dotnet/sdk:7.0
WORKDIR /app

RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -yq nodejs build-essential


COPY api/*.csproj ./api/
COPY api-tests/*.csproj ./api-tests/
COPY aspen.sln .
RUN dotnet restore api-tests/api-tests.csproj

COPY . . 
# CMD dotnet test
CMD tail -f /dev/null