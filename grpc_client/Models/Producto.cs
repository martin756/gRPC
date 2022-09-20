using Google.Protobuf.WellKnownTypes;
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
        public int idtipocategoria { get; set; }
        public float precio { get; set; }
        public int cantidad_disponible { get; set; }
        public string fecha_publicacion { get; set; }
        public int publicador_idusuario { get; set; }
        public bool esSubasta { get; set; }
        public List<string> url_fotos { get; set; }
        public Timestamp fecha_inicio { get; set; }
        public Timestamp fecha_fin { get; set; }
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
        public bool esSubasta { get; set; }
        public List<string> url_fotos { get; set; }
        public Timestamp fecha_inicio { get; set; }
        public Timestamp fecha_fin { get; set; }
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

    public class AuditoriaProducto
    {
        public class CambiosEnCampos
        {
            public string campo_registrado { get; set; }
            public string nuevo_valor { get; set; }
        }
        public string accion { get; set; }
        public DateTime fecha_edicion { get; set; }
        public List<CambiosEnCampos> camposCambiados = new();
        
    }

    public class KafkaProperties
    {
        public string topic { get; set; }
        public string groupId { get; set; }
    }
}
