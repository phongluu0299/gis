namespace gis.Helpers
{
    public class Result<T> where T : class
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
        public Result()
        {
        
        }
        public Result(int code, string message, T data = null)
        {
            Code = code;
            Message = message;
            Data = data;
        }
        public Result(int code, string message)
        {
            Code = code;
            Message = message;
        }


    }
}
