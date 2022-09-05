// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: carritos.proto
// </auto-generated>
#pragma warning disable 0414, 1591
#region Designer generated code

using grpc = global::Grpc.Core;

public static partial class Carritos
{
  static readonly string __ServiceName = "Carritos";

  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  static void __Helper_SerializeMessage(global::Google.Protobuf.IMessage message, grpc::SerializationContext context)
  {
    #if !GRPC_DISABLE_PROTOBUF_BUFFER_SERIALIZATION
    if (message is global::Google.Protobuf.IBufferMessage)
    {
      context.SetPayloadLength(message.CalculateSize());
      global::Google.Protobuf.MessageExtensions.WriteTo(message, context.GetBufferWriter());
      context.Complete();
      return;
    }
    #endif
    context.Complete(global::Google.Protobuf.MessageExtensions.ToByteArray(message));
  }

  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  static class __Helper_MessageCache<T>
  {
    public static readonly bool IsBufferMessage = global::System.Reflection.IntrospectionExtensions.GetTypeInfo(typeof(global::Google.Protobuf.IBufferMessage)).IsAssignableFrom(typeof(T));
  }

  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  static T __Helper_DeserializeMessage<T>(grpc::DeserializationContext context, global::Google.Protobuf.MessageParser<T> parser) where T : global::Google.Protobuf.IMessage<T>
  {
    #if !GRPC_DISABLE_PROTOBUF_BUFFER_SERIALIZATION
    if (__Helper_MessageCache<T>.IsBufferMessage)
    {
      return parser.ParseFrom(context.PayloadAsReadOnlySequence());
    }
    #endif
    return parser.ParseFrom(context.PayloadAsNewBuffer());
  }

  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  static readonly grpc::Marshaller<global::Carrito> __Marshaller_Carrito = grpc::Marshallers.Create(__Helper_SerializeMessage, context => __Helper_DeserializeMessage(context, global::Carrito.Parser));
  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  static readonly grpc::Marshaller<global::IdCarrito> __Marshaller_IdCarrito = grpc::Marshallers.Create(__Helper_SerializeMessage, context => __Helper_DeserializeMessage(context, global::IdCarrito.Parser));
  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  static readonly grpc::Marshaller<global::Producto_Carrito> __Marshaller_Producto_Carrito = grpc::Marshallers.Create(__Helper_SerializeMessage, context => __Helper_DeserializeMessage(context, global::Producto_Carrito.Parser));
  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  static readonly grpc::Marshaller<global::ResponseCarrito> __Marshaller_ResponseCarrito = grpc::Marshallers.Create(__Helper_SerializeMessage, context => __Helper_DeserializeMessage(context, global::ResponseCarrito.Parser));
  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  static readonly grpc::Marshaller<global::IdUsuario> __Marshaller_IdUsuario = grpc::Marshallers.Create(__Helper_SerializeMessage, context => __Helper_DeserializeMessage(context, global::IdUsuario.Parser));
  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  static readonly grpc::Marshaller<global::GetCarrito> __Marshaller_GetCarrito = grpc::Marshallers.Create(__Helper_SerializeMessage, context => __Helper_DeserializeMessage(context, global::GetCarrito.Parser));

  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  static readonly grpc::Method<global::Carrito, global::IdCarrito> __Method_CrearCarrito = new grpc::Method<global::Carrito, global::IdCarrito>(
      grpc::MethodType.Unary,
      __ServiceName,
      "CrearCarrito",
      __Marshaller_Carrito,
      __Marshaller_IdCarrito);

  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  static readonly grpc::Method<global::Producto_Carrito, global::ResponseCarrito> __Method_AgregarItemsCarrito = new grpc::Method<global::Producto_Carrito, global::ResponseCarrito>(
      grpc::MethodType.ClientStreaming,
      __ServiceName,
      "AgregarItemsCarrito",
      __Marshaller_Producto_Carrito,
      __Marshaller_ResponseCarrito);

  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  static readonly grpc::Method<global::IdUsuario, global::GetCarrito> __Method_TraerCarritosByIdUsuario = new grpc::Method<global::IdUsuario, global::GetCarrito>(
      grpc::MethodType.ServerStreaming,
      __ServiceName,
      "TraerCarritosByIdUsuario",
      __Marshaller_IdUsuario,
      __Marshaller_GetCarrito);

  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  static readonly grpc::Method<global::IdCarrito, global::GetCarrito> __Method_TraerCarritoById = new grpc::Method<global::IdCarrito, global::GetCarrito>(
      grpc::MethodType.Unary,
      __ServiceName,
      "TraerCarritoById",
      __Marshaller_IdCarrito,
      __Marshaller_GetCarrito);

  /// <summary>Service descriptor</summary>
  public static global::Google.Protobuf.Reflection.ServiceDescriptor Descriptor
  {
    get { return global::CarritosReflection.Descriptor.Services[0]; }
  }

  /// <summary>Base class for server-side implementations of Carritos</summary>
  [grpc::BindServiceMethod(typeof(Carritos), "BindService")]
  public abstract partial class CarritosBase
  {
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual global::System.Threading.Tasks.Task<global::IdCarrito> CrearCarrito(global::Carrito request, grpc::ServerCallContext context)
    {
      throw new grpc::RpcException(new grpc::Status(grpc::StatusCode.Unimplemented, ""));
    }

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual global::System.Threading.Tasks.Task<global::ResponseCarrito> AgregarItemsCarrito(grpc::IAsyncStreamReader<global::Producto_Carrito> requestStream, grpc::ServerCallContext context)
    {
      throw new grpc::RpcException(new grpc::Status(grpc::StatusCode.Unimplemented, ""));
    }

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual global::System.Threading.Tasks.Task TraerCarritosByIdUsuario(global::IdUsuario request, grpc::IServerStreamWriter<global::GetCarrito> responseStream, grpc::ServerCallContext context)
    {
      throw new grpc::RpcException(new grpc::Status(grpc::StatusCode.Unimplemented, ""));
    }

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual global::System.Threading.Tasks.Task<global::GetCarrito> TraerCarritoById(global::IdCarrito request, grpc::ServerCallContext context)
    {
      throw new grpc::RpcException(new grpc::Status(grpc::StatusCode.Unimplemented, ""));
    }

  }

  /// <summary>Client for Carritos</summary>
  public partial class CarritosClient : grpc::ClientBase<CarritosClient>
  {
    /// <summary>Creates a new client for Carritos</summary>
    /// <param name="channel">The channel to use to make remote calls.</param>
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public CarritosClient(grpc::ChannelBase channel) : base(channel)
    {
    }
    /// <summary>Creates a new client for Carritos that uses a custom <c>CallInvoker</c>.</summary>
    /// <param name="callInvoker">The callInvoker to use to make remote calls.</param>
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public CarritosClient(grpc::CallInvoker callInvoker) : base(callInvoker)
    {
    }
    /// <summary>Protected parameterless constructor to allow creation of test doubles.</summary>
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    protected CarritosClient() : base()
    {
    }
    /// <summary>Protected constructor to allow creation of configured clients.</summary>
    /// <param name="configuration">The client configuration.</param>
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    protected CarritosClient(ClientBaseConfiguration configuration) : base(configuration)
    {
    }

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual global::IdCarrito CrearCarrito(global::Carrito request, grpc::Metadata headers = null, global::System.DateTime? deadline = null, global::System.Threading.CancellationToken cancellationToken = default(global::System.Threading.CancellationToken))
    {
      return CrearCarrito(request, new grpc::CallOptions(headers, deadline, cancellationToken));
    }
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual global::IdCarrito CrearCarrito(global::Carrito request, grpc::CallOptions options)
    {
      return CallInvoker.BlockingUnaryCall(__Method_CrearCarrito, null, options, request);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual grpc::AsyncUnaryCall<global::IdCarrito> CrearCarritoAsync(global::Carrito request, grpc::Metadata headers = null, global::System.DateTime? deadline = null, global::System.Threading.CancellationToken cancellationToken = default(global::System.Threading.CancellationToken))
    {
      return CrearCarritoAsync(request, new grpc::CallOptions(headers, deadline, cancellationToken));
    }
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual grpc::AsyncUnaryCall<global::IdCarrito> CrearCarritoAsync(global::Carrito request, grpc::CallOptions options)
    {
      return CallInvoker.AsyncUnaryCall(__Method_CrearCarrito, null, options, request);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual grpc::AsyncClientStreamingCall<global::Producto_Carrito, global::ResponseCarrito> AgregarItemsCarrito(grpc::Metadata headers = null, global::System.DateTime? deadline = null, global::System.Threading.CancellationToken cancellationToken = default(global::System.Threading.CancellationToken))
    {
      return AgregarItemsCarrito(new grpc::CallOptions(headers, deadline, cancellationToken));
    }
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual grpc::AsyncClientStreamingCall<global::Producto_Carrito, global::ResponseCarrito> AgregarItemsCarrito(grpc::CallOptions options)
    {
      return CallInvoker.AsyncClientStreamingCall(__Method_AgregarItemsCarrito, null, options);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual grpc::AsyncServerStreamingCall<global::GetCarrito> TraerCarritosByIdUsuario(global::IdUsuario request, grpc::Metadata headers = null, global::System.DateTime? deadline = null, global::System.Threading.CancellationToken cancellationToken = default(global::System.Threading.CancellationToken))
    {
      return TraerCarritosByIdUsuario(request, new grpc::CallOptions(headers, deadline, cancellationToken));
    }
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual grpc::AsyncServerStreamingCall<global::GetCarrito> TraerCarritosByIdUsuario(global::IdUsuario request, grpc::CallOptions options)
    {
      return CallInvoker.AsyncServerStreamingCall(__Method_TraerCarritosByIdUsuario, null, options, request);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual global::GetCarrito TraerCarritoById(global::IdCarrito request, grpc::Metadata headers = null, global::System.DateTime? deadline = null, global::System.Threading.CancellationToken cancellationToken = default(global::System.Threading.CancellationToken))
    {
      return TraerCarritoById(request, new grpc::CallOptions(headers, deadline, cancellationToken));
    }
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual global::GetCarrito TraerCarritoById(global::IdCarrito request, grpc::CallOptions options)
    {
      return CallInvoker.BlockingUnaryCall(__Method_TraerCarritoById, null, options, request);
    }
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual grpc::AsyncUnaryCall<global::GetCarrito> TraerCarritoByIdAsync(global::IdCarrito request, grpc::Metadata headers = null, global::System.DateTime? deadline = null, global::System.Threading.CancellationToken cancellationToken = default(global::System.Threading.CancellationToken))
    {
      return TraerCarritoByIdAsync(request, new grpc::CallOptions(headers, deadline, cancellationToken));
    }
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public virtual grpc::AsyncUnaryCall<global::GetCarrito> TraerCarritoByIdAsync(global::IdCarrito request, grpc::CallOptions options)
    {
      return CallInvoker.AsyncUnaryCall(__Method_TraerCarritoById, null, options, request);
    }
    /// <summary>Creates a new instance of client from given <c>ClientBaseConfiguration</c>.</summary>
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    protected override CarritosClient NewInstance(ClientBaseConfiguration configuration)
    {
      return new CarritosClient(configuration);
    }
  }

  /// <summary>Creates service definition that can be registered with a server</summary>
  /// <param name="serviceImpl">An object implementing the server-side handling logic.</param>
  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  public static grpc::ServerServiceDefinition BindService(CarritosBase serviceImpl)
  {
    return grpc::ServerServiceDefinition.CreateBuilder()
        .AddMethod(__Method_CrearCarrito, serviceImpl.CrearCarrito)
        .AddMethod(__Method_AgregarItemsCarrito, serviceImpl.AgregarItemsCarrito)
        .AddMethod(__Method_TraerCarritosByIdUsuario, serviceImpl.TraerCarritosByIdUsuario)
        .AddMethod(__Method_TraerCarritoById, serviceImpl.TraerCarritoById).Build();
  }

  /// <summary>Register service method with a service binder with or without implementation. Useful when customizing the  service binding logic.
  /// Note: this method is part of an experimental API that can change or be removed without any prior notice.</summary>
  /// <param name="serviceBinder">Service methods will be bound by calling <c>AddMethod</c> on this object.</param>
  /// <param name="serviceImpl">An object implementing the server-side handling logic.</param>
  [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
  public static void BindService(grpc::ServiceBinderBase serviceBinder, CarritosBase serviceImpl)
  {
    serviceBinder.AddMethod(__Method_CrearCarrito, serviceImpl == null ? null : new grpc::UnaryServerMethod<global::Carrito, global::IdCarrito>(serviceImpl.CrearCarrito));
    serviceBinder.AddMethod(__Method_AgregarItemsCarrito, serviceImpl == null ? null : new grpc::ClientStreamingServerMethod<global::Producto_Carrito, global::ResponseCarrito>(serviceImpl.AgregarItemsCarrito));
    serviceBinder.AddMethod(__Method_TraerCarritosByIdUsuario, serviceImpl == null ? null : new grpc::ServerStreamingServerMethod<global::IdUsuario, global::GetCarrito>(serviceImpl.TraerCarritosByIdUsuario));
    serviceBinder.AddMethod(__Method_TraerCarritoById, serviceImpl == null ? null : new grpc::UnaryServerMethod<global::IdCarrito, global::GetCarrito>(serviceImpl.TraerCarritoById));
  }

}
#endregion
