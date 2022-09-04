using apiRetroshop.Models;
using Grpc.Net.Client;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiRetroshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        [HttpGet]
        public string GetProductoById(int id)
        {
            string response;
            try
            {
                // This switch must be set before creating the GrpcChannel/HttpClient.
                AppContext.SetSwitch(
                    "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
                var channel = GrpcChannel.ForAddress("http://localhost:50051");
                var cliente = new Productos.ProductosClient(channel);

                
                var idProducto = new IdProducto
                {
                    Idproducto = id
                };

                var producto = cliente.TraerProductoById(idProducto);
                response = JsonConvert.SerializeObject(producto);
            }
            catch (Exception e)
            {
                response = e.Message + e.StackTrace;
            }

            return response;
        }

        [HttpPost]
        public string PostProducto(ProductoPost producto)
        {
            string response;
            try
            {
                AppContext.SetSwitch(
                    "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
                var channel = GrpcChannel.ForAddress("http://localhost:50051");
                var cliente = new Productos.ProductosClient(channel);

                var postProducto = new ProductoPost
                {
                    Nombre = producto.Nombre,
                    Descripcion = producto.Descripcion,
                    Idtipocategoria = producto.Idtipocategoria,
                    Precio = producto.Precio,
                    CantidadDisponible = producto.CantidadDisponible,
                    FechaPublicacion = producto.FechaPublicacion,
                    PublicadorIdusuario = producto.PublicadorIdusuario
                };
                postProducto.UrlFotos.Add(producto.UrlFotos);

                var productoResponse = cliente.AltaProducto(postProducto);
                response = JsonConvert.SerializeObject(productoResponse);
            }
            catch (Exception e)
            {
                response = e.Message + e.StackTrace;
            }

            return response;
        }

        [HttpPut]
        public string PutProducto(ProductoPut producto)
        {
            string response;
            try
            {
                AppContext.SetSwitch(
                    "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
                var channel = GrpcChannel.ForAddress("http://localhost:50051");
                var cliente = new Productos.ProductosClient(channel);

                var postProducto = new ProductoPut
                {
                    Idproducto = producto.Idproducto,
                    Nombre = producto.Nombre,
                    Descripcion = producto.Descripcion,
                    Idtipocategoria = producto.Idtipocategoria,
                    Precio = producto.Precio,
                    CantidadDisponible = producto.CantidadDisponible
                };

                var productoResponse = cliente.EditarProducto(postProducto);
                response = JsonConvert.SerializeObject(productoResponse);
            }
            catch (Exception e)
            {
                response = e.Message + e.StackTrace;
            }

            return response;
        }
    }
}
