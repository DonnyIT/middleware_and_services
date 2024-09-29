namespace middleware_and_services
{
    //public delegate Task RequestHandler(HttpContext context); 

    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
    }
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var app = builder.Build();

            List<User> users = new List<User>
            {
                new User {Id = 1, Name = "Test"},
                new User {Id = 2, Name = "Test2"},
                new User {Id = 3, Name = "Test3"},
                new User {Id = 4, Name = "Test4"},
                new User {Id = 5, Name = "Test5"},
            };
            
            app.Run(async(context) =>
            {
                var request = context.Request;
                var response = context.Response;
                string path = request.Path;
                response.StatusCode = 200;
                response.Headers.Append("Content-Type", "text/html; charset=utf-8");
                //response.ContentType = "text/html; charset=utf-8";

                if(path == "/")
                {
                    response.StatusCode = 200;
                    await response.SendFileAsync("wwwroot/Index.html");
                }
                else if(path == "/users")
                {
                    if (request.Query.ContainsKey("Id") && request.Query.ContainsKey("name"))
                    {
                        int id = int.Parse(request.Query["Id"]);
                        users.Add(new User { Id = id, Name = request.Query["name"] });
                    }
                    else
                    {
                        response.StatusCode = 200;
                        await response.WriteAsJsonAsync(users);
                    }
                    
                }
                else
                {
                    response.StatusCode = 404;
                    await response.WriteAsync($"Page 404");
                }
            });
            app.Run();
        }
    }
}
