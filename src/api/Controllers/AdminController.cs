﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Security.Claims;
using Api.DtoModels;
using Api.DataAccess;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Api.DbModels;
using Api.Models.Entities;

namespace Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/[controller]")]
    public class AdminController : ControllerBase
    {
        public const string AspenAdminRole = "admin-aspen";
        private readonly IDonationRepository donationRepository;
        private readonly IEventRepository eventRepository;
        private readonly IMapper mapper;

        public AdminController(IDonationRepository donationRepository, IEventRepository eventRepository, IMapper mapper)
        {
            this.donationRepository = donationRepository;
            this.eventRepository = eventRepository;
            this.mapper = mapper;
        }

        [HttpGet, Authorize(Roles = AspenAdminRole)]
        public IEnumerable<UserClaim> Get() =>
            User.Claims.Select(c => new UserClaim(c.Type.ToString(), c.Value.ToString()));

        [HttpGet("donation/{eventID}"), Authorize(Roles = AspenAdminRole)]
        public async Task<IEnumerable<DtoDonation>> GetEventDonations(long eventID)
        {
            var donations = await donationRepository.GetByEventIdAsync(eventID);
            return mapper.Map<IEnumerable<Donation>, IEnumerable<DtoDonation>>(donations);
        }

        [HttpGet("donation/{eventID}/{teamID}"), Authorize(Roles = AspenAdminRole)]
        public async Task<IEnumerable<DtoDonation>> GetTeamDonations(long eventID, long teamID)
        {
            var donations = await donationRepository.GetByTeamIdAsync(eventID, teamID);
            return mapper.Map<IEnumerable<Donation>, IEnumerable<DtoDonation>>(donations);
        }
    }

    public record UserClaim(string claim, string value);
}
