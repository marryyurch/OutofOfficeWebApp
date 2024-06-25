FROM mcr.microsoft.com/dotnet/aspnet:8.0-nanoserver-1809 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0-nanoserver-1809 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["outofofficewebapp.client/nuget.config", "outofofficewebapp.client/"]
COPY ["OutofOfficeWebApp.Server/OutofOfficeWebApp.Server.csproj", "OutofOfficeWebApp.Server/"]
COPY ["outofofficewebapp.client/outofofficewebapp.client.esproj", "outofofficewebapp.client/"]
RUN dotnet restore "./OutofOfficeWebApp.Server/OutofOfficeWebApp.Server.csproj"
COPY . .
WORKDIR "/src/OutofOfficeWebApp.Server"
RUN dotnet build "./OutofOfficeWebApp.Server.csproj" -c %BUILD_CONFIGURATION% -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./OutofOfficeWebApp.Server.csproj" -c %BUILD_CONFIGURATION% -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OutofOfficeWebApp.Server.dll"]
