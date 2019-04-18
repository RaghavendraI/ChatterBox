using System.Collections.Generic;
using System.Threading.Tasks;
using ChatterBox.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatterBox.API.Data
{
    public class ChatterBoxRepository : IChatterBoxRepository
    {
        private readonly DataContext _context;
        public ChatterBoxRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public Task<Photo> GetMainPhotoForUser(int userId)
        {
            throw new System.NotImplementedException();
        }

        public Task<Photo> GetPhoto(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p =>p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(p =>p.Photos).ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}