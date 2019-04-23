using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using ChatterBox.API.Data;
using ChatterBox.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatterBox.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IChatterBoxRepository _chatter;
        private readonly IMapper _mapper;
       
        public UsersController(IChatterBoxRepository chatter, IMapper mapper)
        {
            
            _mapper = mapper;
            _chatter = chatter;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _chatter.GetUsers();
            var usersForList = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(usersForList);
        }

        [HttpGet("{id}", Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _chatter.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userforUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var userFromRepo = await _chatter.GetUser(id);
            _mapper.Map(userforUpdateDto, userFromRepo);
            if (await _chatter.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");

        }
    }
}