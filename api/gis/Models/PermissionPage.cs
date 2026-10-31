using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gis.Models
{
    public class PermissionPage
    {
        public int ID { get; set; }

        public int PermissionID { get; set; }

        public int PageID { get; set; }

        public virtual Page Page { get; set; }

        public virtual Permission Permission { get; set; }
   
    }
}
