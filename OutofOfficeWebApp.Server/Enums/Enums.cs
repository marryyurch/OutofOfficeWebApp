namespace OutofOfficeWebApp.Server.Enums
{
    public enum SubdivisionType
    {
        Marketing = 0,
        Sales = 1,
        HR = 2,
        Development = 3,
        Support = 4
    }

    public enum PositionType
    {
        Manager = 0,
        Analyst = 1,
        Tester = 2,
        Designer = 3,
        Developer = 4
    }

    public enum StatusType
    {
        Inactive = 0,
        Active = 1
    }

    public enum AbsenceReasonType
    {
        Vacation = 0,
        SickLeave = 1,
        UnpaidLeave = 2,
        Other = 3
    }

    public enum RequestStatusType
    {
        New = 0,
        Approved = 1,
        Rejected = 2,
        Canceled = 3,
        Submitted = 4
    }

    public enum ProjectType
    {
        Research = 1,
        Development = 2,
        Testing = 3,
        Deactivated = 4
    }
}
