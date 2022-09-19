# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: carritos.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import productos_pb2 as productos__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
  name='carritos.proto',
  package='',
  syntax='proto3',
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n\x0e\x63\x61rritos.proto\x1a\x0fproductos.proto\"3\n\x07\x43\x61rrito\x12\r\n\x05total\x18\x01 \x01(\x02\x12\x19\n\x11\x63liente_idusuario\x18\x02 \x01(\x05\"\xa7\x01\n\x10Producto_Carrito\x12\x12\n\nidproducto\x18\x01 \x01(\x05\x12\x11\n\tidcarrito\x18\x02 \x01(\x05\x12\x10\n\x08\x63\x61ntidad\x18\x03 \x01(\x05\x12\x10\n\x08subtotal\x18\x04 \x01(\x02\x12\x0e\n\x06nombre\x18\x05 \x01(\t\x12\x0e\n\x06precio\x18\x06 \x01(\x02\x12\r\n\x05total\x18\x07 \x01(\x02\x12\x19\n\x11idproductocarrito\x18\x08 \x01(\x05\"3\n\x0fPutTotalCarrito\x12\x11\n\tidcarrito\x18\x01 \x01(\x05\x12\r\n\x05total\x18\x02 \x01(\x02\"\x17\n\tIdCarrito\x12\n\n\x02id\x18\x01 \x01(\x05\"\"\n\x0fResponseCarrito\x12\x0f\n\x07mensaje\x18\x01 \x01(\t2\x95\x02\n\x08\x43\x61rritos\x12$\n\x0c\x43rearCarrito\x12\x08.Carrito\x1a\n.IdCarrito\x12<\n\x13\x41gregarItemsCarrito\x12\x11.Producto_Carrito\x1a\x10.ResponseCarrito(\x01\x12;\n\x18TraerCarritosByIdUsuario\x12\n.IdUsuario\x1a\x11.Producto_Carrito0\x01\x12*\n\x10TraerCarritoById\x12\n.IdCarrito\x1a\x08.Carrito0\x01\x12<\n\x16\x41\x63tualizarTotalCarrito\x12\x10.PutTotalCarrito\x1a\x10.ResponseCarritob\x06proto3'
  ,
  dependencies=[productos__pb2.DESCRIPTOR,])




_CARRITO = _descriptor.Descriptor(
  name='Carrito',
  full_name='Carrito',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='total', full_name='Carrito.total', index=0,
      number=1, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='cliente_idusuario', full_name='Carrito.cliente_idusuario', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=35,
  serialized_end=86,
)


_PRODUCTO_CARRITO = _descriptor.Descriptor(
  name='Producto_Carrito',
  full_name='Producto_Carrito',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='idproducto', full_name='Producto_Carrito.idproducto', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='idcarrito', full_name='Producto_Carrito.idcarrito', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='cantidad', full_name='Producto_Carrito.cantidad', index=2,
      number=3, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='subtotal', full_name='Producto_Carrito.subtotal', index=3,
      number=4, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='nombre', full_name='Producto_Carrito.nombre', index=4,
      number=5, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='precio', full_name='Producto_Carrito.precio', index=5,
      number=6, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='total', full_name='Producto_Carrito.total', index=6,
      number=7, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='idproductocarrito', full_name='Producto_Carrito.idproductocarrito', index=7,
      number=8, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=89,
  serialized_end=256,
)


_PUTTOTALCARRITO = _descriptor.Descriptor(
  name='PutTotalCarrito',
  full_name='PutTotalCarrito',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='idcarrito', full_name='PutTotalCarrito.idcarrito', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='total', full_name='PutTotalCarrito.total', index=1,
      number=2, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=258,
  serialized_end=309,
)


_IDCARRITO = _descriptor.Descriptor(
  name='IdCarrito',
  full_name='IdCarrito',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='IdCarrito.id', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=311,
  serialized_end=334,
)


_RESPONSECARRITO = _descriptor.Descriptor(
  name='ResponseCarrito',
  full_name='ResponseCarrito',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='mensaje', full_name='ResponseCarrito.mensaje', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=336,
  serialized_end=370,
)

DESCRIPTOR.message_types_by_name['Carrito'] = _CARRITO
DESCRIPTOR.message_types_by_name['Producto_Carrito'] = _PRODUCTO_CARRITO
DESCRIPTOR.message_types_by_name['PutTotalCarrito'] = _PUTTOTALCARRITO
DESCRIPTOR.message_types_by_name['IdCarrito'] = _IDCARRITO
DESCRIPTOR.message_types_by_name['ResponseCarrito'] = _RESPONSECARRITO
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Carrito = _reflection.GeneratedProtocolMessageType('Carrito', (_message.Message,), {
  'DESCRIPTOR' : _CARRITO,
  '__module__' : 'carritos_pb2'
  # @@protoc_insertion_point(class_scope:Carrito)
  })
_sym_db.RegisterMessage(Carrito)

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



_CARRITOS = _descriptor.ServiceDescriptor(
  name='Carritos',
  full_name='Carritos',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_start=373,
  serialized_end=650,
  methods=[
  _descriptor.MethodDescriptor(
    name='CrearCarrito',
    full_name='Carritos.CrearCarrito',
    index=0,
    containing_service=None,
    input_type=_CARRITO,
    output_type=_IDCARRITO,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='AgregarItemsCarrito',
    full_name='Carritos.AgregarItemsCarrito',
    index=1,
    containing_service=None,
    input_type=_PRODUCTO_CARRITO,
    output_type=_RESPONSECARRITO,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='TraerCarritosByIdUsuario',
    full_name='Carritos.TraerCarritosByIdUsuario',
    index=2,
    containing_service=None,
    input_type=productos__pb2._IDUSUARIO,
    output_type=_PRODUCTO_CARRITO,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='TraerCarritoById',
    full_name='Carritos.TraerCarritoById',
    index=3,
    containing_service=None,
    input_type=_IDCARRITO,
    output_type=_CARRITO,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='ActualizarTotalCarrito',
    full_name='Carritos.ActualizarTotalCarrito',
    index=4,
    containing_service=None,
    input_type=_PUTTOTALCARRITO,
    output_type=_RESPONSECARRITO,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
])
_sym_db.RegisterServiceDescriptor(_CARRITOS)

DESCRIPTOR.services_by_name['Carritos'] = _CARRITOS

# @@protoc_insertion_point(module_scope)
