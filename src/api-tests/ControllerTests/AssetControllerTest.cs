using System.IO;
using Api.Controller;
using Api.Services;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using NUnit.Framework;

namespace Tests.Controller
{
  public class AssetControllerTest
  {
    private AssetController assetController;
    private IAssetFileService assetFileService;
    [SetUp]
    public void Setup()
    {
      var nullLogger = new NullLogger<AssetController>();
      assetFileService = new AssetFileService(new NullLogger<AssetFileService>());

      assetController = new AssetController(nullLogger, assetFileService);
    }

    [Test]
    public void CanUploadPhotoAsset()
    {
      Mock<IFormFile> fileMock = SetUpMockFile();

      var response = assetController.Post(fileMock.Object);
      response.status.Should().Be("success");
    }

    private static Mock<IFormFile> SetUpMockFile()
    {

      //Arrange
      var fileMock = new Mock<IFormFile>();
      //Setup mock file using a memory stream
      var content = "fake image";
      var fileName = "test.jpg";
      var ms = new MemoryStream();
      var writer = new StreamWriter(ms);
      writer.Write(content);
      writer.Flush();
      ms.Position = 0;
      fileMock.Setup(_ => _.OpenReadStream()).Returns(ms);
      fileMock.Setup(_ => _.FileName).Returns(fileName);
      fileMock.Setup(_ => _.Length).Returns(ms.Length);
      return fileMock;
    }
  }
}