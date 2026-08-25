FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5001
ENV ASPNETCORE_URLS=http://+:5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Academic.Api/Academic.Api.csproj", "Academic.Api/"]
COPY ["Academic.Application/Academic.Application.csproj", "Academic.Application/"]
COPY ["Academic.Domain/Academic.Domain.csproj", "Academic.Domain/"]
COPY ["Academic.Infrastructure/Academic.Infrastructure.csproj", "Academic.Infrastructure/"]
RUN dotnet restore "Academic.Api/Academic.Api.csproj"
COPY . .
WORKDIR "/src/Academic.Api"
RUN dotnet build "Academic.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Academic.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Academic.Api.dll"]
