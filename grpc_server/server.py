from email import message
from usuarios_pb2_grpc import UsuariosServicer, add_UsuariosServicer_to_server
from usuarios_pb2 import Usuario, Response
from productos_pb2_grpc import ProductosServicer, add_ProductosServicer_to_server
from productos_pb2 import Producto , ProductoGet ,ProductoPost, ProductoPut

import grpc
from concurrent import futures

import mysql.connector

class ServicioUsuarios(UsuariosServicer):

    def Listo(self, request, context):
        return request

    """def RegistraOrden(self, request, context):
        print(f"Orden recibida de {request.direccion}, pizzas {len(request.pizzas)}")

        return ConfirmacionOrden(entregaEstimada = 10)"""

    def AltaUsuario(self, request, context):
        cnx =mysql.connector.connect(user='root', password='root',
                             host='localhost', port='3306',
                             database='retroshop')
        cursor = cnx.cursor()
        query = (f"SELECT * FROM usuario WHERE usuario = '{request.user}'")
        cursor.execute(query)
        row = cursor.fetchone()
        if row is not None:
            return Response(message = "400")
        query = (f"INSERT INTO usuario (`nombre`, `apellido`, `dni`, `email`, `usuario`, `contraseña`, `saldo`) VALUES ('{request.nombre}', '{request.apellido}', '{request.dni}', '{request.email}', '{request.user}', '{request.password}', '{request.saldo}')")
        cursor.execute(query)
        cnx.commit()

        cursor.close()
        cnx.close()

        return Response()

    def TraerUsuario(self, request, context):
        cnx = mysql.connector.connect(user='root', password='root', 
                              host='localhost', port='3306',
                              database='retroshop')
        cursor = cnx.cursor(named_tuple=True)
        query = (f"SELECT * FROM usuario WHERE usuario = '{request.username}' AND contraseña = '{request.password}'")
        cursor.execute(query)
        row = cursor.fetchone()
        if row is not None:
            return Usuario(nombre = row.nombre, apellido = row.apellido, dni = row.dni, email = row.email, user = row.usuario, password = row.contraseña, saldo = row.saldo)
        else:
            return Usuario()


class ProductoUsuarios(ProductosServicer):
    def EditarProducto(self, request, context):
        cnx =mysql.connector.connect(user='root', password='root',
                             host='localhost', port='3306',
                             database='retroshop')
        cursor = cnx.cursor()
        query = (f"SELECT * FROM producto WHERE idproducto = '{request.idproducto}'")
        cursor.execute(query)
        row = cursor.fetchone()
        if row is None:
            return Response(message = "400")
        else:
            query = (f"UPDATE  producto SET `nombre` ='{request.nombre}' , `descripcion` ='{request.descripcion}', `idtipocategoria`='{request.idtipocategoria}', `precio`='{request.precio}', `cantidad_disponible`= '{request.cantidad_disponible}' where idproducto= '{request.idproducto}' ")
            cursor.execute(query)
            cnx.commit()

            cursor.close()
            cnx.close()

            return Response()

    def TraerProductoById(self, request, context):
        cnx = mysql.connector.connect(user='root', password='root', 
                              host='localhost', port='3306',
                              database='retroshop')
        cursor = cnx.cursor(named_tuple=True)
        query = (f"select p.*, c.nombre as 'categoria', u.usuario as username from producto p inner join tipo_categoria c on p.idtipocategoria = c.idtipocategoria inner join usuario u on p.publicador_idusuario = u.idusuario where idproducto= '{request.idproducto}'")
        cursor.execute(query)
        row = cursor.fetchone()
        if row is not None:            
            return ProductoGet(nombre = row.nombre, descripcion = row.descripcion, categoria = row.categoria, precio = row.precio, cantidad_disponible = row.cantidad_disponible, fecha_publicacion = row.fecha_publicacion, publicador = row.username)
        else:
            return ProductoGet()


    def AltaProducto(self, request, context):
        cnx =mysql.connector.connect(user='root', password='root',
                             host='localhost', port='3306',
                             database='retroshop')
        cursor = cnx.cursor()
        query = (f"SELECT * FROM producto WHERE nombre = '{request.nombre}'")
        cursor.execute(query)
        row = cursor.fetchone()
        if row is not None:
            return Response(message = "400")
        query = (f"INSERT INTO producto (`nombre`, `descripcion`, `idtipocategoria`, `precio`, `cantidad_disponible`, `fecha_publicacion`, `publicador_idusuario`) VALUES ('{request.nombre}', '{request.descripcion}', '{request.idtipocategoria}', '{request.precio}', '{request.cantidad_disponible}', '{request.fecha_publicacion}', '{request.publicador_idusuario}')")
        cursor.execute(query)
        cnx.commit()

        cursor.close()
        cnx.close()

        return Response()

  


def start():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    add_UsuariosServicer_to_server(ServicioUsuarios(), server)
    add_ProductosServicer_to_server(ProductoUsuarios(), server)
    server.add_insecure_port('[::]:50051')
    print("The server is running!")
    server.start()
    server.wait_for_termination()
    pass


if __name__ == "__main__":
    start()