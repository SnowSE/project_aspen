using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet.Models
{
    public class UserWorkout
    {
        [Key]
        public string Id { get; set; }

        public string UserID { get; set; }
        public User User { get; set; }

        public string WorkoutID { get; set; }
        public Workout Workout { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public bool IsPublic { get; set; }
    }
}
