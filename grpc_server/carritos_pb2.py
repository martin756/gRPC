# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: carritos.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import productos_pb2 as productos__pb2
import usuarios_pb2 as usuarios__pb2
from google.protobuf import timestamp_pb2 as google_dot_protobuf_dot_timestamp__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0e\x63\x61rritos.proto\x1a\x0fproductos.proto\x1a\x0eusuarios.proto\x1a\x1fgoogle/protobuf/timestamp.proto\"3\n\x07\x43\x61rrito\x12\r\n\x05total\x18\x01 \x01(\x02\x12\x19\n\x11\x63liente_idusuario\x18\x02 \x01(\x05\"g\n\x07\x46\x61\x63tura\x12\x11\n\tidfactura\x18\x01 \x01(\x05\x12\x30\n\x0c\x66\x65\x63ha_compra\x18\x02 \x01(\x0b\x32\x1a.google.protobuf.Timestamp\x12\x17\n\x0ftotal_facturado\x18\x03 \x01(\x02\"\xea\x01\n\x10Producto_Carrito\x12\x12\n\nidproducto\x18\x01 \x01(\x05\x12\x11\n\tidcarrito\x18\x02 \x01(\x05\x12\x10\n\x08\x63\x61ntidad\x18\x03 \x01(\x05\x12\x10\n\x08subtotal\x18\x04 \x01(\x02\x12\x0e\n\x06nombre\x18\x05 \x01(\t\x12\x0e\n\x06precio\x18\x06 \x01(\x02\x12\r\n\x05total\x18\x07 \x01(\x02\x12\x19\n\x11idproductocarrito\x18\x08 \x01(\x05\x12\x1f\n\rdatos_factura\x18\t \x01(\x0b\x32\x08.Factura\x12 \n\x0e\x64\x61tos_vendedor\x18\n \x01(\x0b\x32\x08.Usuario\"3\n\x0fPutTotalCarrito\x12\x11\n\tidcarrito\x18\x01 \x01(\x05\x12\r\n\x05total\x18\x02 \x01(\x02\"\x17\n\tIdCarrito\x12\n\n\x02id\x18\x01 \x01(\x05\"\"\n\x0fResponseCarrito\x12\x0f\n\x07mensaje\x18\x01 \x01(\t2\x95\x02\n\x08\x43\x61rritos\x12$\n\x0c\x43rearCarrito\x12\x08.Carrito\x1a\n.IdCarrito\x12<\n\x13\x41gregarItemsCarrito\x12\x11.Producto_Carrito\x1a\x10.ResponseCarrito(\x01\x12;\n\x18TraerCarritosByIdUsuario\x12\n.IdUsuario\x1a\x11.Producto_Carrito0\x01\x12*\n\x10TraerCarritoById\x12\n.IdCarrito\x1a\x08.Carrito0\x01\x12<\n\x16\x41\x63tualizarTotalCarrito\x12\x10.PutTotalCarrito\x1a\x10.ResponseCarritob\x06proto3')



_CARRITO = DESCRIPTOR.message_types_by_name['Carrito']
_FACTURA = DESCRIPTOR.message_types_by_name['Factura']
_PRODUCTO_CARRITO = DESCRIPTOR.message_types_by_name['Producto_Carrito']
_PUTTOTALCARRITO = DESCRIPTOR.message_types_by_name['PutTotalCarrito']
_IDCARRITO = DESCRIPTOR.message_types_by_name['IdCarrito']
_RESPONSECARRITO = DESCRIPTOR.message_types_by_name['ResponseCarrito']
Carrito = _reflection.GeneratedProtocolMessageType('Carrito', (_message.Message,), {
  'DESCRIPTOR' : _CARRITO,
  '__module__' : 'carritos_pb2'
  # @@protoc_insertion_point(class_scope:Carrito)
  })
_sym_db.RegisterMessage(Carrito)

Factura = _reflection.GeneratedProtocolMessageType('Factura', (_message.Message,), {
  'DESCRIPTOR' : _FACTURA,
  '__module__' : 'carritos_pb2'
  # @@protoc_insertion_point(class_scope:Factura)
  })
_sym_db.RegisterMessage(Factura)

Producto_Carrito = _reflection.GeneratedProtocolMessageType('Producto_Carrito', (_message.Message,), {
  'DESCRIPTOR' : _PRODUCTO_CARRITO,
  '__module__' : 'carritos_pb2'
  # @@protoc_insertion_point(class_scope:Producto_Carrito)
  })
_sym_db.RegisterMessage(Producto_Carrito)

PutTotalCarrito = _reflection.GeneratedProtocolMessageType('PutTotalCarrito', (_message.Message,), {
  'DESCRIPTOR' : _PUTTOTALCARRITO,
  '__module__' : 'carritos_pb2'
  # @@protoc_insertion_point(class_scope:PutTotalCarrito)
  })
_sym_db.RegisterMessage(PutTotalCarrito)

IdCarrito = _reflection.GeneratedProtocolMessageType('IdCarrito', (_message.Message,), {
  'DESCRIPTOR' : _IDCARRITO,
  '__module__' : 'carritos_pb2'
  # @@protoc_insertion_point(class_scope:IdCarrito)
  })
_sym_db.RegisterMessage(IdCarrito)

ResponseCarrito = _reflection.GeneratedProtocolMessageType('ResponseCarrito', (_message.Message,), {
  'DESCRIPTOR' : _RESPONSECARRITO,
  '__module__' : 'carritos_pb2'
  # @@protoc_insertion_point(class_scope:ResponseCarrito)
  })
_sym_db.RegisterMessage(ResponseCarrito)

_CARRITOS = DESCRIPTOR.services_by_name['Carritos']
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _CARRITO._serialized_start=84
  _CARRITO._serialized_end=135
  _FACTURA._serialized_start=137
  _FACTURA._serialized_end=240
  _PRODUCTO_CARRITO._serialized_start=243
  _PRODUCTO_CARRITO._serialized_end=477
  _PUTTOTALCARRITO._serialized_start=479
  _PUTTOTALCARRITO._serialized_end=530
  _IDCARRITO._serialized_start=532
  _IDCARRITO._serialized_end=555
  _RESPONSECARRITO._serialized_start=557
  _RESPONSECARRITO._serialized_end=591
  _CARRITOS._serialized_start=594
  _CARRITOS._serialized_end=871
# @@protoc_insertion_point(module_scope)
