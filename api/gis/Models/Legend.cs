using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace gis.Models
{

    public class Legend
    {
        [Key]
        public int LegendID { get; set; }

        public string Name { get; set; } = "";

        public string Type { get; set; } = "";

        public string? Color { get; set; }

        public string? Icon { get; set; }

        public int MinZoom { get; set; }

        public int Sort { get; set; }
    }
}
