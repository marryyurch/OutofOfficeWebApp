namespace OutofOfficeWebApp.Server.Models
{
    public class SoftUser
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public Employee Employee { get; set; }

        public SoftUser()
        {
            Password = GeneratePassword();
        }

        private string GeneratePassword()
        {
            const string upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", lower = "abcdefghijklmnopqrstuvwxyz", digits = "0123456789", special = "!@#$%^&*()";
            var allChars = upper + lower + digits + special;
            var random = new Random();
            return new string(Enumerable.Range(0, 6)
                .Select(i => i == 0 ? upper[random.Next(upper.Length)] :
                              i == 1 ? lower[random.Next(lower.Length)] :
                              i == 2 ? digits[random.Next(digits.Length)] :
                              i == 3 ? special[random.Next(special.Length)] :
                                       allChars[random.Next(allChars.Length)])
                .OrderBy(_ => random.Next()).ToArray());
        }
    }
}
