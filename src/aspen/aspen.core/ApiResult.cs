using Newtonsoft.Json;

namespace Aspen.Core
{
    public class ApiResult
    {
        private ApiResult(string status, object data)
        {
            this.Status = status;
            this.Data = data;
        }
        public string Status { get; }
        public object Data { get; }
        public static ApiResult Success(object data)
        {
            return new ApiResult(StatusConstants.Success, data);
        }
        public static ApiResult Failed(object data)
        {
            return new ApiResult(StatusConstants.Failed, data);
        }
        public static class StatusConstants
        {
            public static string Failed = "Failed";
            public static string Success = "Success";
            public static string Unauthorized = "Unauthorized";
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}