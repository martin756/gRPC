from time import sleep
from usuarios_pb2_grpc import UsuariosServicer, add_UsuariosServicer_to_server
from usuarios_pb2 import Usuario, Response
from productos_pb2_grpc import ProductosServicer, add_ProductosServicer_to_server
from productos_pb2 import Producto , ProductoGet ,ProductoPost, ProductoPut, ProductosList, Tipo_categoria
from carritos_pb2_grpc import CarritosServicer, add_CarritosServicer_to_server
from carritos_pb2 import IdCarrito, Carrito, Producto_Carrito, ResponseCarrito

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
            return Response(message = "400 - Ya existe usuario")
        query = (f"INSERT INTO usuario (`nombre`, `apellido`, `dni`, `email`, `usuario`, `contraseña`, `saldo`) VALUES "+
        f"('{request.nombre}', '{request.apellido}', '{request.dni}', '{request.email}', '{request.user}', '{request.password}', '{request.saldo}')")
        cursor.execute(query)        
        cnx.commit()
        resp = Response(message = "204", idusuario = cursor.lastrowid)
        cursor.close()
        cnx.close()
        return resp

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

    def CargarSaldo(self, request, context):
        cnx =mysql.connector.connect(user='root', password='root',
                             host='localhost', port='3306',
                             database='retroshop')
        cursor = cnx.cursor()
        query = (f"SELECT * FROM usuario WHERE idusuario = '{request.idusuario}'")
        
        cursor.execute(query)
        row = cursor.fetchone()
        if row is None:
            return Response(message = "404 Not-Found. El usuario con ese id no existe")
        else:
            query = (f"UPDATE usuario SET `saldo` ='{row[7] + request.saldo}' where idusuario = '{request.idusuario}' ")
            cursor.execute(query)
            resp = Response(message = f"Saldo total:'{row[7] + request.saldo}'", idusuario =  cursor.lastrowid)
            cnx.commit()
            cursor.close()
            cnx.close()
            return resp

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
            return Response(message = "404 Not-Found. El producto con ese id no existe")
        else:
            query = (f"UPDATE producto SET `nombre` ='{request.nombre}', `descripcion` ='{request.descripcion}', `idtipocategoria`='{request.idtipocategoria}', "+
            f"`precio`='{request.precio}', `cantidad_disponible`= '{request.cantidad_disponible}'")
            for idx, url_foto in enumerate(request.url_fotos, start=1):
                query += (f", `url_foto{idx}` = '{url_foto}'")
            query += (f"where idproducto= '{request.idproducto}' ")
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

    def TraerProductos(self, request, context):
        cnx = mysql.connector.connect(user='root', password='root', 
                              host='localhost', port='3306',
                              database='retroshop')
        cursor = cnx.cursor(named_tuple=True)
        query = (f"select p.*, c.nombre as 'categoria', u.usuario as username from producto p inner join tipo_categoria c on p.idtipocategoria = c.idtipocategoria inner join usuario u on p.publicador_idusuario = u.idusuario")
        cursor.execute(query)
        records = cursor.fetchall()
        for row in records:
            yield Carrito(idproducto = row.idproducto, nombre = row.nombre, descripcion = row.descripcion, 
            idtipocategoria = row.idtipocategoria, precio = row.precio, cantidad_disponible = row.cantidad_disponible, 
            fecha_publicacion = row.fecha_publicacion, publicador_idusuario = row.publicador_idusuario)
            sleep(3)




        """for row in records:
            yield Producto(idproducto = row.idproducto, nombre = row.nombre, descripcion = row.descripcion, idtipocategoria = row.idtipocategoria, precio = row.precio, cantidad_disponible = row.cantidad_disponible, fecha_publicacion = row.fecha_publicacion, publicador_idusuario = row.publicador_idusuario)
            time.sleep(3)
        return ProductosList(productos = records)
        for row in records:
            yield ProductoGet(nombre = row.nombre, descripcion = row.descripcion, categoria = row.categoria, precio = row.precio, cantidad_disponible = row.cantidad_disponible, fecha_publicacion = row.fecha_publicacion, publicador = row.username)
            yield ProductosList(ProductoGet(nombre = row.nombre, descripcion = row.descripcion, categoria = row.categoria, precio = row.precio, cantidad_disponible = row.cantidad_disponible, fecha_publicacion = row.fecha_publicacion, publicador = row.username))"""

    def AltaProducto(self, request, context):
        cnx =mysql.connector.connect(user='root', password='root',
                             host='localhost', port='3306',
                             database='retroshop')
        cursor = cnx.cursor()
        query = (f"SELECT * FROM producto WHERE nombre = '{request.nombre}'")
        cursor.execute(query)
        row = cursor.fetchone()
        if row is not None:
            return Response(message = "400 Bad-Request. El nombre del producto especificado ya existe")

        query = (f"INSERT INTO producto (`nombre`, `descripcion`, `idtipocategoria`, `precio`, `cantidad_disponible`, `fecha_publicacion`, `publicador_idusuario`, `url_foto1`, `url_foto2`, `url_foto3`, `url_foto4`, `url_foto5`) "+
        f"VALUES ('{request.nombre}', '{request.descripcion}', '{request.idtipocategoria}', '{request.precio}', '{request.cantidad_disponible}', '{request.fecha_publicacion}', '{request.publicador_idusuario}'")
        for url_foto in request.url_fotos:
            query += (f", '{url_foto}'")
        query += ")"
        cursor.execute(query)
        
        cnx.commit()

        cursor.close()
        cnx.close()

        return Response()

class CarritoProductos(CarritosServicer):
    def CrearCarrito(self, request, context):
        cnx =mysql.connector.connect(user='root', password='root',
                        host='localhost', port='3306',
                        database='retroshop')
        cursor = cnx.cursor()
        query = f"INSERT INTO carrito (`total`, `cliente_idusuario`) VALUES ('{request.total}', '{request.cliente_idusuario}')"
        cursor.execute(query)
        idcarrito = IdCarrito(id = cursor.lastrowid)

        cnx.commit()

        cursor.close()
        cnx.close()
        return idcarrito

    def AgregarItemsCarrito(self, request_iterator, context):
        cnx =mysql.connector.connect(user='root', password='root',
                host='localhost', port='3306',
                database='retroshop')
        cursor = cnx.cursor()
        stmt = "INSERT INTO producto_carrito (`idproducto`, `idcarrito`, `cantidad`, `subtotal`) VALUES (%s,%s,%s,%s)"
        data = []
        for request in request_iterator:
            data.append((request.idproducto, request.idcarrito, request.cantidad, request.subtotal))
        cursor.executemany(stmt, data)

        cnx.commit()

        cursor.close()
        cnx.close()
        return ResponseCarrito(mensaje = "204 No Content.")

    def TraerCarritosByIdUsuario(self, request, context):
        cnx = mysql.connector.connect(user='root', password='root', 
                              host='localhost', port='3306',
                              database='retroshop')
        cursor = cnx.cursor(named_tuple=True)
        query = (f"SELECT  c.idcarrito,c.total, pc.idproducto_carrito, pc.cantidad,pc.subtotal,p.idproducto, p.nombre, p.precio FROM carrito c inner join producto_carrito pc on c.idcarrito=pc.idcarrito inner join producto p on p.idproducto=pc.idproducto where c.cliente_idusuario = '{request.idusuario}'")
        cursor.execute(query)
        print(cursor.execute(query))
        records = cursor.fetchall()
        print(query)
        for row in records:
            print(row)
            yield Producto_Carrito(idproducto = row.idproducto, idcarrito = row.idcarrito, cantidad = row.cantidad, subtotal = (row.cantidad*row.precio), descripcion = row.descripcion)

            sleep(3)
        

    def TraerCarritoById(self, request, context):
        return super().TraerCarritoById(request, context)
        


def start():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    add_UsuariosServicer_to_server(ServicioUsuarios(), server)
    add_ProductosServicer_to_server(ProductoUsuarios(), server)
    add_CarritosServicer_to_server(CarritoProductos(), server)
    server.add_insecure_port('[::]:50051')
    print("The server is running!")
    server.start()
    server.wait_for_termination()
    pass


if __name__ == "__main__":
    start()