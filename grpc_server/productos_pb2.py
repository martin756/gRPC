# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: productos.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import usuarios_pb2 as usuarios__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0fproductos.proto\x1a\x0eusuarios.proto\"\xc9\x01\n\x08Producto\x12\x0e\n\x06nombre\x18\x01 \x01(\t\x12\x13\n\x0b\x64\x65scripcion\x18\x02 \x01(\t\x12(\n\x0fidtipocategoria\x18\x03 \x01(\x0b\x32\x0f.Tipo_categoria\x12\x0e\n\x06precio\x18\x04 \x01(\x02\x12\x1b\n\x13\x63\x61ntidad_disponible\x18\x05 \x01(\x03\x12\x19\n\x11\x66\x65\x63ha_publicacion\x18\x06 \x01(\x03\x12&\n\x14publicador_idusuario\x18\x07 \x01(\x0b\x32\x08.Usuario\" \n\x0eTipo_categoria\x12\x0e\n\x06nombre\x18\x01 \x01(\t2%\n\tProductos\x12\x18\n\x08SayHello\x12\x05.Nulo\x1a\x05.Nulob\x06proto3')



_PRODUCTO = DESCRIPTOR.message_types_by_name['Producto']
_TIPO_CATEGORIA = DESCRIPTOR.message_types_by_name['Tipo_categoria']
Producto = _reflection.GeneratedProtocolMessageType('Producto', (_message.Message,), {
  'DESCRIPTOR' : _PRODUCTO,
  '__module__' : 'productos_pb2'
  # @@protoc_insertion_point(class_scope:Producto)
  })
_sym_db.RegisterMessage(Producto)

Tipo_categoria = _reflection.GeneratedProtocolMessageType('Tipo_categoria', (_message.Message,), {
  'DESCRIPTOR' : _TIPO_CATEGORIA,
  '__module__' : 'productos_pb2'
  # @@protoc_insertion_point(class_scope:Tipo_categoria)
  })
_sym_db.RegisterMessage(Tipo_categoria)

_PRODUCTOS = DESCRIPTOR.services_by_name['Productos']
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _PRODUCTO._serialized_start=36
  _PRODUCTO._serialized_end=237
  _TIPO_CATEGORIA._serialized_start=239
  _TIPO_CATEGORIA._serialized_end=271
  _PRODUCTOS._serialized_start=273
  _PRODUCTOS._serialized_end=310
# @@protoc_insertion_point(module_scope)
