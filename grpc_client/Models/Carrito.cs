using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiRetroshop.Models
{
    public class Carrito
    {
        public float total;
        public Usuario cliente_idusuario;
    }

    public class ItemProducto
    {
        public int idproducto { get; set; }
        public string nombre { get; set; }
        public float precio { get; set; }
        public int cantidad { get; set; }
    }

    public class ClaseFactura
    {
        public string fechacompra { get; set; }
        public List<ItemProducto> items { get; set;}
        public ClaseUsuario datosComprador { get; set; }
        public ClaseUsuario datosVendedor { get; set; }
        public float totalFacturado { get; set; }
        public int idcarrito { get; set; }
    }
}
