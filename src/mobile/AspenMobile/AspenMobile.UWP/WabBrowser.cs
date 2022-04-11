using IdentityModel.OidcClient.Browser;
using System;
using System.Threading;
using System.Threading.Tasks;
using Windows.Security.Authentication.Web;

[assembly: Xamarin.Forms.Dependency(typeof(AspenMobile.UWP.WabBrowser))]
namespace AspenMobile.UWP
{
    public class WabBrowser : IBrowser
    {
        private readonly bool enableWindowsAuthentication;

        public WabBrowser(bool enableWindowsAuthentication)
        {
            this.enableWindowsAuthentication = enableWindowsAuthentication;
        }

        public WabBrowser() : this(false) { }

        private async Task<BrowserResult> InvokeAsyncCore(BrowserOptions options, bool silentMode)
        {
            var wabOptions = WebAuthenticationOptions.None;

            if (enableWindowsAuthentication)
            {
                wabOptions |= WebAuthenticationOptions.UseCorporateNetwork;
            }
            if (silentMode)
            {
                wabOptions |= WebAuthenticationOptions.SilentMode;
            }

            WebAuthenticationResult wabResult;

            try
            {
                if (string.Equals(options.EndUrl, WebAuthenticationBroker.GetCurrentApplicationCallbackUri().AbsoluteUri, StringComparison.Ordinal))
                {
                    wabResult = await WebAuthenticationBroker.AuthenticateAsync(
                        wabOptions, new Uri(options.StartUrl));
                }
                else
                {
                    wabResult = await WebAuthenticationBroker.AuthenticateAsync(
                        wabOptions, new Uri(options.StartUrl), new Uri(options.EndUrl));
                }
            }
            catch (Exception ex)
            {
                return new BrowserResult
                {
                    ResultType = BrowserResultType.UnknownError,
                    Error = ex.ToString()
                };
            }

            if (wabResult.ResponseStatus == WebAuthenticationStatus.Success)
            {
                return new BrowserResult
                {
                    ResultType = BrowserResultType.Success,
                    Response = wabResult.ResponseData
                };
            }
            else if (wabResult.ResponseStatus == WebAuthenticationStatus.ErrorHttp)
            {
                return new BrowserResult
                {
                    ResultType = BrowserResultType.HttpError,
                    Error = string.Concat(wabResult.ResponseErrorDetail.ToString())
                };
            }
            else if (wabResult.ResponseStatus == WebAuthenticationStatus.UserCancel)
            {
                return new BrowserResult
                {
                    ResultType = BrowserResultType.UserCancel
                };
            }
            else
            {
                return new BrowserResult
                {
                    ResultType = BrowserResultType.UnknownError,
                    Error = "Invalid response from WebAuthenticationBroker"
                };
            }
        }

        public async Task<BrowserResult> InvokeAsync(BrowserOptions options, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(options.StartUrl)) throw new ArgumentException("Missing StartUrl", nameof(options));
            if (string.IsNullOrWhiteSpace(options.EndUrl)) throw new ArgumentException("Missing EndUrl", nameof(options));

            switch (options.DisplayMode)
            {
                case DisplayMode.Visible:
                    return await InvokeAsyncCore(options, false);

                case DisplayMode.Hidden:
                    var result = await InvokeAsyncCore(options, true);
                    if (result.ResultType == BrowserResultType.Success)
                    {
                        return result;
                    }
                    else
                    {
                        result.ResultType = BrowserResultType.Timeout;
                        return result;
                    }
            }

            throw new ArgumentException("Invalid DisplayMode", nameof(options));
        }
    }
}
