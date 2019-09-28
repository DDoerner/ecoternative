FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["Ecoternative.Api/Ecoternative.Api.csproj", "Ecoternative.Api/"]
RUN dotnet restore "Ecoternative.Api/Ecoternative.Api.csproj"
COPY . .
WORKDIR "/src/Ecoternative.Api"
RUN dotnet build "Ecoternative.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Ecoternative.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Ecoternative.Api.dll"]