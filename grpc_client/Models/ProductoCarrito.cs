using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiRetroshop.Models
{
    public class Usuario
    {
        public Producto idproducto;
        public Carrito idcarrito;
        public int cantidad;
        public float subtotal;
    }
}
