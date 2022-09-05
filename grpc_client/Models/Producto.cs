using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiRetroshop.Models
{
    public class ClaseGetProducto
    {
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public string categoria { get; set; }
        public float precio { get; set; }
        public int cantidad_disponible { get; set; }
        public string fecha_publicacion { get; set; }
        public string publicador { get; set; }
        public List<string> url_fotos { get; set; }
    }

    public class ClasePostProducto
    {
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public int idtipocategoria { get; set; }
        public float precio { get; set; }
        public int cantidad_disponible { get; set; }
        public string fecha_publicacion { get; set; }
        public int publicador_idusuario { get; set; }
        public List<string> url_fotos { get; set; }
    }

    public class ClasePutProducto
    {
        public int idproducto { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public int idtipocategoria { get; set; }
        public float precio { get; set; }
        public int cantidad_disponible { get; set; }
        public string fecha_publicacion { get; set; }
        public int publicador_idusuario { get; set; }
        public List<string> url_fotos { get; set; }
    }
}
