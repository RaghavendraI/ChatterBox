using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using ChatterBox.API.Data;
using ChatterBox.API.Dtos;
using ChatterBox.API.Helpers;
using ChatterBox.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatterBox.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
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
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo= await _chatter.GetUser(currentUserId);

            userParams.UserId= currentUserId;

            if(string.IsNullOrEmpty(userParams.Gender)){
                userParams.Gender= userFromRepo.Gender=="male"? "female":"male";
            }
            var users = await _chatter.GetUsers(userParams);
            var usersForList = _mapper.Map<IEnumerable<UserForListDto>>(users);
            Response.AddPagination(users.CurrentPage,users.PageSize,
                        users.TotalCount,users.TotalPages); 
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

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId){
             if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
             var like = await _chatter.GetLike(id,recipientId);
             if(like !=null)
                return BadRequest("You already liked this user");

             if(await _chatter.GetUser(recipientId)== null)
                return NotFound();

             like= new Like{
                 LikerId=id,
                 LikeeId=recipientId
             };

             _chatter.Add<Like>(like);

             if(await _chatter.SaveAll())
             return Ok();

             return BadRequest("Failed to like user");         
        }
    }
}