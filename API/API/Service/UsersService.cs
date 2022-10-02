using API.Context;

namespace API.Service
{
    public class UsersService
    {
        private ContextDB _context;
        public UsersService(ContextDB context) 
        {
            _context = context;
        }
    }
}
