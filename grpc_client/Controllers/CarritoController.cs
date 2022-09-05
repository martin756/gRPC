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
    public class CarritoController : ControllerBase
    {
        [HttpPost]
        [Route("PostCarrito")]
        public string CrearCarrito(Carrito carrito)
        {
            string response;
            try
            {
                // This switch must be set before creating the GrpcChannel/HttpClient.
                AppContext.SetSwitch(
                    "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
                var channel = GrpcChannel.ForAddress("http://localhost:50051");
                var cliente = new Carritos.CarritosClient(channel);

                var postCarrito = new Carrito
                {
                    Total = 0,
                    ClienteIdusuario = carrito.ClienteIdusuario
                };

                var carritoAgregado = cliente.CrearCarrito(postCarrito);
                response = JsonConvert.SerializeObject(carritoAgregado);
            }
            catch (Exception e)
            {
                response = e.Message + e.StackTrace;
            }

            return response;
        }

        [HttpPost]
        [Route("PostItemsCarrito")]
        public async Task<string> AgregarItemsAsync(List<Producto_Carrito> carrito)
        {
            string response;
            try
            {
                // This switch must be set before creating the GrpcChannel/HttpClient.
                AppContext.SetSwitch(
                    "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
                var channel = GrpcChannel.ForAddress("http://localhost:50051");
                var cliente = new Carritos.CarritosClient(channel);

                using var call = cliente.AgregarItemsCarrito();
                foreach (var item in carrito)
                {
                    var postItem = new Producto_Carrito
                    {
                        Idcarrito = item.Idcarrito,
                        Idproducto = item.Idproducto,
                        Cantidad = item.Cantidad,
                        Subtotal = item.Subtotal
                    };
                    await call.RequestStream.WriteAsync(postItem);
                }
                await call.RequestStream.CompleteAsync();
                var resp = await call;
                response = JsonConvert.SerializeObject(resp);
            }
            catch (Exception e)
            {
                response = e.Message + e.StackTrace;
            }

            return response;
        }
    }
}
