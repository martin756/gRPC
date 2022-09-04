using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiRetroshop.Models
{
    public class Producto
    {
        public string nombre;
        public string descripcion;
        public TipoCategoria idtipocategoria;
        public float precio;
        public int cantidad_disponible;
        public DateTime fecha_publicacion;
        public Usuario publicador_idusuario;
    }

    public class TipoCategoria
    {
        public string nombre; 
    }
}
