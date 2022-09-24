using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiRetroshop.Models
{
    public class ClaseUsuario
    {
        public int idusuario { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public ulong dni { get; set; }
        public string email { get; set; }
    }
}
