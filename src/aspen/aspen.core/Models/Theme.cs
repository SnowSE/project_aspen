using System;
using System.Text.RegularExpressions;

namespace Aspen.Core.Models
{
    public class Theme
    {
        public Theme(
            string primaryMainColor,
            string primaryLightColor,
            string primaryContrastColor,
            string secondaryMainColor,
            string fontFamily,
            string bannerUrl,
            string logoUrl)
        {
            validateColor(primaryMainColor);
            validateColor(primaryLightColor);
            validateColor(primaryContrastColor);
            validateColor(secondaryMainColor);
            validateFontFamily(fontFamily);
            validateBannerUrl(bannerUrl);
            validateLogoUrl(logoUrl);

            PrimaryMainColor = primaryMainColor;
            PrimaryLightColor = primaryLightColor;
            PrimaryContrastColor = primaryContrastColor;
            SecondaryMainColor = secondaryMainColor;
            FontFamily = fontFamily;
            BannerUrl = bannerUrl;
            LogoUrl = logoUrl;
        }

        public string PrimaryMainColor { get; }
        public string PrimaryLightColor { get; }
        public string PrimaryContrastColor { get; }
        public string SecondaryMainColor { get; }
        public string FontFamily { get; }
        public string BannerUrl { get; }
        public string LogoUrl { get; }

        private void validateColor(string color)
        {
            var validDomain = new Regex(@"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
            if (validDomain.IsMatch(color) == false)
                throw new ArgumentException("illegal color");
        }
        
        private void validateFontFamily(string fontFamily)
        {
            if(fontFamily.Length > 30)
                throw new ArgumentException("font family too long");
        }

        private void validateBannerUrl(string imageUrl)
        {
            if (!Uri.IsWellFormedUriString(imageUrl, UriKind.Absolute))
                throw new ArgumentException("");
        }

        private void validateLogoUrl(string logoUrl)
        {
            if (!Uri.IsWellFormedUriString(logoUrl, UriKind.Absolute))
                throw new ArgumentException("");
        }

        public static Theme Default()
        {
            var defaultColor = "#AAAAAA";
            var secondaryColor = "#AAAAAA";
            var primaryContrastColor = "#000000";
            var defaultFontFamily = "Arial, Helvetica, sans-serif";
            return new Theme(defaultColor, secondaryColor, primaryContrastColor, defaultColor, defaultFontFamily, "http://localhost:3000", "http://localhost:3000");
        }

        public Theme UpdatePrimaryMainColor(string newColor)
        {
            return new Theme(newColor, PrimaryLightColor, PrimaryContrastColor, SecondaryMainColor, FontFamily, BannerUrl, LogoUrl);
        }

        public Theme UpdateLogo(string logoUrl)
        {
            return new Theme(PrimaryMainColor, PrimaryLightColor, PrimaryContrastColor, SecondaryMainColor, FontFamily, BannerUrl, logoUrl);
        }

        public Theme UpdateBanner(string bannerUrl)
        {
            return new Theme(PrimaryMainColor, PrimaryLightColor, PrimaryContrastColor, SecondaryMainColor, FontFamily, bannerUrl, LogoUrl);
        }
    }
}