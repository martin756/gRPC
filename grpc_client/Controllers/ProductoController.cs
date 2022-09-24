using apiRetroshop.Models;
using Grpc.Core;
using Grpc.Net.Client;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Confluent.Kafka;

namespace apiRetroshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly ProducerConfig _configProducer;
        private readonly ConsumerConfig _configConsumer;
        public ProductoController(ProducerConfig config, ConsumerConfig configConsumer)
        {
            _configProducer = config;
            _configConsumer = configConsumer;
        }

        [HttpGet]
        [Route("GetProductoById")]
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

        [HttpGet]
        [Route("GetProductos")]
        public async Task<string> GetProductosAsync()
        {
            string response;
            try
            {
                // This switch must be set before creating the GrpcChannel/HttpClient.
                AppContext.SetSwitch(
                    "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
                var channel = GrpcChannel.ForAddress("http://localhost:50051");
                var cliente = new Productos.ProductosClient(channel);

                List<Producto> productos = new();
                using (var call = cliente.TraerProductos(new Nulo()))
                while (await call.ResponseStream.MoveNext())
                {
                    var currentProduct = call.ResponseStream.Current;
                    productos.Add(currentProduct);
                }
                response = JsonConvert.SerializeObject(productos);
            }
            catch (Exception e)
            {
                return e.Message + e.StackTrace;
            }

            return response;
        }

        [HttpGet]
        [Route("GetCambiosProductosKafka")]
        public string GetKafkaCambios(int idProducto)
        {
            List<AuditoriaProducto> changesList = new();
            try
            {
                _configConsumer.GroupId = "historial-cambios-productos";
                using var consumer = new ConsumerBuilder<string, string>(_configConsumer).Build();
                consumer.Subscribe("TopicProductos");
                var topicPartition = new TopicPartition("TopicProductos", new Partition(0));
                consumer.Assign(new TopicPartitionOffset
                    (topicPartition, 0));
                Message<string, string> mensaje;
                do
                {
                    var cr = consumer.Consume();
                    mensaje = cr.Message;
                    if (mensaje != null)
                    {
                        if (mensaje.Key.Contains("productoid_"+idProducto))
                        {
                            changesList.Add(JsonConvert.DeserializeObject<AuditoriaProducto>(mensaje.Value));
                        }
                    }
                } while (mensaje != null);
            }
            catch (Exception e)
            {
                return e.Message + e.StackTrace;
            }
            return JsonConvert.SerializeObject(changesList);
        }

        [HttpGet]
        [Route("GetSubastas")]
        public async Task<string> GetSubastasAsync()
        {
            string response;
            try
            {
                AppContext.SetSwitch(
                    "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
                var channel = GrpcChannel.ForAddress("http://localhost:50051");
                var cliente = new Productos.ProductosClient(channel);

                List<Producto> subastas = new();
                using var call = cliente.TraerSubastas(new Nulo());
                while (await call.ResponseStream.MoveNext())
                {
                    var currentSubasta = call.ResponseStream.Current;
                    subastas.Add(currentSubasta);
                }
                response = JsonConvert.SerializeObject(subastas);
            }
            catch (Exception e)
            {
                return e.Message + e.StackTrace;
            }

            return response;
        }

        [HttpGet]
        [Route("GetPujasSubastasKafka")]
        public string GetPujasKafka(int idProducto)
        {
            List<UltimaPujaSubasta> changesList = new();
            try
            {
                _configConsumer.GroupId = "historial-pujas-subastas";
                using var consumer = new ConsumerBuilder<string, string>(_configConsumer).Build();
                consumer.Subscribe("TopicSubasta");
                var topicPartition = new TopicPartition("TopicSubasta", new Partition(0));
                consumer.Assign(new TopicPartitionOffset
                    (topicPartition, 0));
                Message<string, string> mensaje;
                do
                {
                    var cr = consumer.Consume();
                    mensaje = cr.Message;
                    if (mensaje != null)
                    {
                        if (mensaje.Key.Contains("SubastaProducto_" + idProducto))
                        {
                            changesList.Add(JsonConvert.DeserializeObject<UltimaPujaSubasta>(mensaje.Value));
                        }
                    }
                } while (mensaje != null);
            }
            catch (Exception e)
            {
                return e.Message + e.StackTrace;
            }
            return JsonConvert.SerializeObject(changesList);
        }

        [HttpPost]
        [Route("PostPujaSubastaKafka")]
        public async Task<string> PostPujaAsync(UltimaPujaSubasta puja)
        {
            string response;
            try
            {
                AppContext.SetSwitch(
                    "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
                var channel = GrpcChannel.ForAddress("http://localhost:50051");
                var cliente = new Productos.ProductosClient(channel);

                var productoResponse = cliente.pujarUltimaOferta(puja);
                response = JsonConvert.SerializeObject(productoResponse);


                using var producer = new ProducerBuilder<string, string>(_configProducer).Build();
                await producer.ProduceAsync("TopicSubasta", new Message<string, string>
                { Key = "SubastaProducto_"+puja.IdProducto, Value = JsonConvert.SerializeObject(puja) });
                producer.Flush(TimeSpan.FromSeconds(10));
            }
            catch (Exception e)
            {
                return e.Message + e.StackTrace;
            }
            return response;
        }

        [HttpPost]
        public async Task<string> PostProductoAsync(ClasePostProducto producto)
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
                    Nombre = producto.nombre,
                    Descripcion = producto.descripcion,
                    Idtipocategoria = producto.idtipocategoria,
                    Precio = producto.precio,
                    CantidadDisponible = producto.cantidad_disponible,
                    FechaPublicacion = producto.fecha_publicacion,
                    PublicadorIdusuario = producto.publicador_idusuario,
                    EsSubasta = producto.esSubasta,
                    FechaInicio = producto.fecha_inicio,
                    FechaFin = producto.fecha_fin
                };
                foreach (var stringUrl in producto.url_fotos)
                {
                    postProducto.UrlFotos.Add(stringUrl);
                }

                var productoResponse = cliente.AltaProducto(postProducto);
                response = JsonConvert.SerializeObject(productoResponse);

                //Envio a un topic de Kafka para un Producto nuevo
                AuditoriaProducto audit = new();
                audit.fecha_edicion = DateTime.Now;
                audit.accion = "alta";
                audit.camposCambiados.Add(new AuditoriaProducto.CambiosEnCampos
                { campo_registrado = "nombre", nuevo_valor = postProducto.Nombre });
                audit.camposCambiados.Add(new AuditoriaProducto.CambiosEnCampos 
                { campo_registrado = "precio", nuevo_valor = postProducto.Precio.ToString() });

                using var producer = new ProducerBuilder<string, string>(_configProducer).Build();
                await producer.ProduceAsync("TopicProductos", new Message<string, string>
                { Key = "productoid_" + productoResponse.Idusuario, Value = JsonConvert.SerializeObject(audit) });
                producer.Flush(TimeSpan.FromSeconds(10));
            }
            catch (Exception e)
            {
                response = e.Message + e.StackTrace;
            }

            return response;
        }

        [HttpPut]
        [Route("PutProducto")]
        public async Task<string> PutProductoAsync(ClasePutProducto producto)
        {
            string response;
            try
            {
                AppContext.SetSwitch(
                    "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
                var channel = GrpcChannel.ForAddress("http://localhost:50051");
                var cliente = new Productos.ProductosClient(channel);

                var putProducto = new ProductoPut
                {
                    Idproducto = producto.idproducto,
                    Nombre = producto.nombre,
                    Descripcion = producto.descripcion,
                    Idtipocategoria = producto.idtipocategoria,
                    Precio = producto.precio,
                    CantidadDisponible = producto.cantidad_disponible
                };
                foreach (var stringUrl in producto.url_fotos)
                {
                    putProducto.UrlFotos.Add(stringUrl);
                }
                var valores_originales = cliente.TraerProductoById(new IdProducto { Idproducto = producto.idproducto });
                var productoResponse = cliente.EditarProducto(putProducto);
                response = JsonConvert.SerializeObject(productoResponse);

                //Envio al topic de producto de Kafka
                if (valores_originales.Nombre != putProducto.Nombre || valores_originales.Precio != putProducto.Precio)
                {
                    AuditoriaProducto audit = new();
                    audit.fecha_edicion = DateTime.Now;
                    audit.accion = "modificacion";
                    if (valores_originales.Nombre != putProducto.Nombre)
                    {
                        audit.camposCambiados.Add(new AuditoriaProducto.CambiosEnCampos 
                        { campo_registrado = "nombre", nuevo_valor = putProducto.Nombre });
                    }
                    if (valores_originales.Precio != putProducto.Precio)
                    {
                        audit.camposCambiados.Add(new AuditoriaProducto.CambiosEnCampos 
                        { campo_registrado = "precio", nuevo_valor = putProducto.Precio.ToString() });
                    }
                    using var producer = new ProducerBuilder<string, string>(_configProducer).Build();
                    await producer.ProduceAsync("TopicProductos", new Message<string, string> 
                    { Key = "productoid_" + putProducto.Idproducto, Value = JsonConvert.SerializeObject(audit) });
                    producer.Flush(TimeSpan.FromSeconds(10));
                }
            }
            catch (Exception e)
            {
                response = e.Message + e.StackTrace;
            }

            return response;
        }

        [HttpPut]
        [Route("UpdateStock")]
        public string updateStock(int idProducto, int cantidad)
        {
            string response;
            try
            {
                AppContext.SetSwitch(
                    "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
                var channel = GrpcChannel.ForAddress("http://localhost:50051");
                var cliente = new Productos.ProductosClient(channel);

                var putUpdateStock = new ProductoStock
                {
                    IdProducto = idProducto,
                    Cantidad = cantidad
                };
                var updatedStock = cliente.ActualizarStock(putUpdateStock);
                response = JsonConvert.SerializeObject(updatedStock);
            }
            catch (Exception e)
            {
                response = e.Message + e.StackTrace;
            }
            return response;
        }
    }
}
