using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Xunit;
using ZOO_Management.ApplicationServices.Services.Nastambe;
using ZOO_Management.DomainModel.ResponseModels.Nastambe;

namespace ZOO_Management.TestsIntegration.Application.Services
{
    public class NastambeServiceIntegrationTest : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public NastambeServiceIntegrationTest(WebApplicationFactory<Startup> factory)
        {
            using (StreamReader file = File.OpenText("..\\..\\..\\Properties\\launchSettings.json"))
            {
                var reader = new JsonTextReader(file);
                var jObject = JObject.Load(reader);

                var variables = jObject
                    .GetValue("profiles")
                    .SelectMany(profiles => profiles.Children())
                    .SelectMany(profile => profile.Children<JProperty>())
                    .Where(prop => prop.Name == "environmentVariables")
                    .SelectMany(prop => prop.Value.Children<JProperty>())
                    .ToList();
                foreach (var variable in variables)
                {
                    Environment.SetEnvironmentVariable(variable.Name, variable.Value.ToString());
                }
            }
            // Arrange
            _factory = factory;
            _factory.CreateClient();
        }

        [Theory]
        [InlineData(1)]
        public async Task GetNastambaByIdAsync_WhenCalled_ReturnsNastamba(int id)
        {
            // Create a scope to get the service
            using (var scope = _factory.Services.CreateScope())
            {
                INastambeService nastambeService = scope.ServiceProvider.GetRequiredService<INastambeService>();

                // Act
                NastambeGetResponse nastamba = await nastambeService.GetNastambaByIdAsync(id);

                // Assert
                nastamba.Should().NotBeNull().And.BeOfType<NastambeGetResponse>();
            }
        }

        [Theory]
        [InlineData()]
        public async Task GetNastambeAsync_WhenCalled_ReturnsNastambe()
        {
            // Create a scope to get the service
            using (var scope = _factory.Services.CreateScope())
            {
                INastambeService nastambeService = scope.ServiceProvider.GetRequiredService<INastambeService>();

                // Act
                List<NastambeGetResponse> nastambe = await nastambeService.GetNastambeAsync();

                // Assert
                nastambe.Should().NotBeNull().And.BeOfType<List<NastambeGetResponse>>();
            }
        }
    }
}
