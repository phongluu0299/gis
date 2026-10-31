using System.ComponentModel.DataAnnotations;

namespace gis.Models
{
    public class Page
    {
        public int PageID { get; set; }

        public int? Parent { get; set; }

        public string? Display { get; set; }

        public string Title { get; set; }

        public string Symbol { get; set; }

        public string? Area { get; set; }

        public string Controller { get; set; }

        public string Action { get; set; }

        public string? Param { get; set; }

        public bool? Hidden { get; set; }

        public int? Sort { get; set; }

        public bool IsNav { get; set; }
        public string? Background { get; set; }
    }
}
