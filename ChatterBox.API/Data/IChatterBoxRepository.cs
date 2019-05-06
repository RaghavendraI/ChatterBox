using System.Collections.Generic;
using System.Threading.Tasks;
using ChatterBox.API.Helpers;
using ChatterBox.API.Models;

namespace ChatterBox.API.Data
{
    public interface IChatterBoxRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
    }
}