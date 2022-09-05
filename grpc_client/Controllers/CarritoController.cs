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
                    ClienteIdusuario = carrito.ClienteIdusuario,
                    Total = 0
                };

                var carritoAgregado = cliente.CrearCarrito(carrito);
                response = JsonConvert.SerializeObject(carritoAgregado);
            }
            catch (Exception e)
            {
                response = e.Message + e.StackTrace;
            }

            return response;
        }
    }
}
