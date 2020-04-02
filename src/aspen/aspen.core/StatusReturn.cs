using Newtonsoft.Json;

namespace Aspen.Core
{
    //alternatives: apiresult
    public class StatusReturn
    {
        private StatusReturn(string status, object data)
        {
            this.Status = status;
            this.Data = data;
        }
        public string Status { get; }
        public object Data { get; }
        public static StatusReturn Success(object data)
        {
            return new StatusReturn(StatusConstants.Success, data);
        }
        public static StatusReturn Failed(object data)
        {
            return new StatusReturn(StatusConstants.Failed, data);
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