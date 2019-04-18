using System.Linq;
using AutoMapper;
using ChatterBox.API.Dtos;
using ChatterBox.API.Models;

namespace ChatterBox.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest =>dest.Age, opt =>{
                    opt.MapFrom((s,d) => s.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest =>dest.Age, opt =>{
                    opt.MapFrom((s,d) => s.DateOfBirth.CalculateAge());
                });
            CreateMap<Photo, PhotosForDetailDto>();
        }
    }
}