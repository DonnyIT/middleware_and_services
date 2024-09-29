using Microsoft.EntityFrameworkCore;
using services_app.Services;

namespace services_app
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Реєстрація сервісів у контейнері
            builder.Services.AddSingleton<IServiceUsers, ServiceUsers>();
            builder.Services.AddControllers();

            builder.Services.AddDbContext<UserContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            var app = builder.Build(); // Тільки після реєстрації служб викликаємо Build()

            app.UseStaticFiles();
            app.UseRouting();

            app.MapControllers();

            app.Run();
        }
    }
}
