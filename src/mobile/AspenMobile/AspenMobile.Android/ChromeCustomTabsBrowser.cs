using Android.App;
using Android.Content;
using Android.Graphics;
using AndroidX.Browser.CustomTabs;
using IdentityModel.OidcClient.Browser;
using Plugin.CurrentActivity;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace AspenMobile.Droid
{
    public class ChromeCustomTabsBrowser : IBrowser
    {
        private readonly Activity context;
        private readonly CustomTabsActivityManager manager;

        public ChromeCustomTabsBrowser() : this(CrossCurrentActivity.Current.Activity) { }


        public ChromeCustomTabsBrowser(Activity context)
        {
            this.context = context;
            manager = new CustomTabsActivityManager(this.context);
        }

        public Task<BrowserResult> InvokeAsync(BrowserOptions options, CancellationToken cancellationToken = default)
        {
            var task = new TaskCompletionSource<BrowserResult>();

            var builder = new CustomTabsIntent.Builder(manager.Session)
               .SetToolbarColor(Color.Argb(255, 52, 152, 219))
               .SetShowTitle(true)
               .EnableUrlBarHiding();

            var customTabsIntent = builder.Build();

            // ensures the intent is not kept in the history stack, which makes
            // sure navigating away from it will close it
            customTabsIntent.Intent.AddFlags(ActivityFlags.NoHistory);

            Action<string> callback = null;
            callback = url =>
            {
                OidcCallbackActivity.Callbacks -= callback;

                task.SetResult(new BrowserResult()
                {
                    Response = url
                });
            };

            OidcCallbackActivity.Callbacks += callback;

            customTabsIntent.LaunchUrl(context, Android.Net.Uri.Parse(options.StartUrl));

            return task.Task;
        }
    }
}