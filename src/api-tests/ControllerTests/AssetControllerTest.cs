using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Api.Controller;
using Api.Services;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using NUnit.Framework;

namespace Tests.Controller
{
    public class AssetControllerTest
    {
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        private AssetController assetController;
        private IAssetFileService assetFileService;

        [SetUp]
        public void Setup()
        {
            var nullLogger = new NullLogger<AssetController>();

            var inMemorySettings = new Dictionary<string, string> {
                {"AssetsDirectory", "assets/"},
            };
            Directory.CreateDirectory("assets/");
            IConfiguration configuration = new ConfigurationBuilder()
              .AddInMemoryCollection(inMemorySettings)
              .Build();

            assetFileService = new AssetFileService(new NullLogger<AssetFileService>(), configuration);
            assetController = new AssetController(nullLogger, assetFileService);
        }

        [Test]
        public async Task CanUploadPhotoAssetAsync()
        {
            var fileMock = SetUpMockFile();

            var response = await assetController.PostAsync(fileMock.Object);

            var actualFileText = File.ReadAllText("assets/" + fileMock.Object.FileName);
            response.status.Should().Be("success");
            actualFileText.Should().Be("fake image");
        }

        private static Mock<IFormFile> SetUpMockFile()
        {
            //Arrange
            var fileMock = new Mock<IFormFile>();
            //Setup mock file using a memory stream
            var content = "fake image";
            var fileName = "test" + RandomString(4);
            var ms = new MemoryStream(Encoding.ASCII.GetBytes(content));
            // var writer = new StreamWriter(ms);
            // writer.Write(content);
            // writer.Flush();
            ms.Position = 0;
            fileMock.Setup(_ => _.CopyToAsync(It.IsAny<Stream>(), CancellationToken.None))
                .Callback<Stream, CancellationToken>((stream, token) =>
                {
                    ms.CopyTo(stream);
                })
                .Returns(Task.CompletedTask);
            fileMock.Setup(_ => _.FileName).Returns(fileName);
            fileMock.Setup(_ => _.Length).Returns(ms.Length);
            return fileMock;
        }
    }
}