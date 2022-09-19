from email import message
from time import sleep
from usuarios_pb2_grpc import UsuariosServicer, add_UsuariosServicer_to_server
from usuarios_pb2 import Usuario, Response
from productos_pb2_grpc import ProductosServicer, add_ProductosServicer_to_server
from productos_pb2 import Producto , ProductoGet ,ProductoPost, ProductoPut, ProductosList, Tipo_categoria
from carritos_pb2_grpc import CarritosServicer, add_CarritosServicer_to_server
from carritos_pb2 import IdCarrito, Carrito, Producto_Carrito, ResponseCarrito
from datetime import datetime
from google.protobuf.timestamp_pb2 import Timestamp

import grpc
from concurrent import futures

import mysql.connector

class ServicioUsuarios(UsuariosServicer):

    def Listo(self, request, context):
        return request


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
            return Usuario(idusuario = row.idusuario, nombre = row.nombre, apellido = row.apellido, dni = row.dni, email = row.email, user = row.usuario, password = row.contraseña, saldo = row.saldo, esMonitor= bool(row.esMonitor) )
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
            fotos = []
            if row.url_foto1 is not None:
                fotos.append(row.url_foto1)
            if row.url_foto2 is not None:
                fotos.append(row.url_foto2)
            if row.url_foto3 is not None:
                fotos.append(row.url_foto3)
            if row.url_foto4 is not None:
                fotos.append(row.url_foto4)
            if row.url_foto5 is not None:
                fotos.append(row.url_foto5)
            
            result = ProductoGet(
                    nombre = row.nombre, 
                    descripcion = row.descripcion, 
                    categoria = row.categoria, 
                    precio = row.precio, 
                    cantidad_disponible = row.cantidad_disponible, 
                    fecha_publicacion = row.fecha_publicacion, 
                    publicador = row.username,
                    url_fotos = fotos)

            #traer campos de subasta y aniadirlos al return
            if row.esSubasta:
                query = (f"select s.preciofinal as preciofinal, s.ultimapuja as ultimapuja, s.fechafin as fechafin from subasta s where s.idproducto= '{request.idproducto}'")
                cursor.execute(query)
                subasta = cursor.fetchone()

                timestampFin = Timestamp()
                timestampFin.FromDatetime(subasta.fechafin)
                timestampPuja = Timestamp()
                timestampPuja.FromDatetime(subasta.ultimapuja)

                result = ProductoGet(
                    nombre = row.nombre, 
                    descripcion = row.descripcion, 
                    categoria = row.categoria,
                    precio = subasta.preciofinal, 
                    cantidad_disponible = row.cantidad_disponible, 
                    fecha_publicacion = row.fecha_publicacion, 
                    publicador = row.username,
                    fecha_fin = timestampFin,
                    fecha_inicio = timestampPuja,
                    url_fotos = fotos)
        else:
            return result


    def TraerProductos(self, request, context):
        cnx = mysql.connector.connect(user='root', password='root', 
                              host='localhost', port='3306',
                              database='retroshop')
        cursor = cnx.cursor(named_tuple=True)
        query = (f"select p.*, c.nombre as 'categoria', u.usuario as username from producto p inner join tipo_categoria c on p.idtipocategoria = c.idtipocategoria inner join usuario u on p.publicador_idusuario = u.idusuario where p.esSubasta = 0")
        cursor.execute(query)
        records = cursor.fetchall()
        for row in records:
            fotos = []
            if row.url_foto1 is not None:
                fotos.append(row.url_foto1)
            if row.url_foto2 is not None:
                fotos.append(row.url_foto2)
            if row.url_foto3 is not None:
                fotos.append(row.url_foto3)
            if row.url_foto4 is not None:
                fotos.append(row.url_foto4)
            if row.url_foto5 is not None:
                fotos.append(row.url_foto5)
            yield Producto(idproducto = row.idproducto, nombre = row.nombre, descripcion = row.descripcion, 
            idtipocategoria = row.idtipocategoria, precio = row.precio, cantidad_disponible = row.cantidad_disponible, 
            fecha_publicacion = row.fecha_publicacion, publicador_idusuario = row.publicador_idusuario, url_fotos = fotos)


    def TraerSubastas(self, request, context):
        cnx = mysql.connector.connect(user='root', password='root', 
                              host='localhost', port='3306',
                              database='retroshop')
        cursor = cnx.cursor(named_tuple=True)
        query = (f"select p.*, c.nombre as 'categoria', u.usuario as username, "
                " s.fechafin as fechafin, s.ultimapuja as ultimapuja ,s.preciofinal as preciofinal from producto p "
                " inner join tipo_categoria c on p.idtipocategoria = c.idtipocategoria "
                " inner join usuario u on p.publicador_idusuario = u.idusuario "
                " inner join subasta s on s.idproducto = p.idproducto where p.esSubasta = 1 ")
        cursor.execute(query)
        records = cursor.fetchall()
        for row in records:
            fotos = []
            if row.url_foto1 is not None:
                fotos.append(row.url_foto1)
            if row.url_foto2 is not None:
                fotos.append(row.url_foto2)
            if row.url_foto3 is not None:
                fotos.append(row.url_foto3)
            if row.url_foto4 is not None:
                fotos.append(row.url_foto4)
            if row.url_foto5 is not None:
                fotos.append(row.url_foto5)
            
            # implementar conversion de formato MySQL a grpc para envio de timestamp
            timestampFin = Timestamp()
            timestampFin.FromDatetime(row.fechafin)
            timestampPuja = Timestamp()
            timestampPuja.FromDatetime(row.ultimapuja)


            yield Producto(idproducto = row.idproducto,
                        nombre = row.nombre,
                        descripcion = row.descripcion, 
                        idtipocategoria = row.idtipocategoria, 
                        precio = row.preciofinal,
                        cantidad_disponible = row.cantidad_disponible, 
                        fecha_publicacion = row.fecha_publicacion, 
                        publicador_idusuario = row.publicador_idusuario, 
                        esSubasta = row.esSubasta,
                        fecha_fin = timestampFin,
                        fecha_inicio = timestampPuja,
                        url_fotos = fotos)


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

        stmt = f"INSERT INTO producto (`nombre`, `descripcion`, `idtipocategoria`, `precio`, `cantidad_disponible`, `fecha_publicacion`, `publicador_idusuario`, `esSubasta`"
        values = f" VALUES ('{request.nombre}', '{request.descripcion}', '{request.idtipocategoria}', '{request.precio}', '{request.cantidad_disponible}', '{request.fecha_publicacion}', '{request.publicador_idusuario}', '{int(request.esSubasta)}' "
        for idx,url_foto in enumerate(request.url_fotos,start=1):
            stmt += f", `url_foto{idx}`"
            values += f", '{url_foto}'"
        stmt += ")"
        query = stmt+values+")"
        cursor.execute(query)
        cnx.commit()
        id_item = cursor.lastrowid
        
        #aniadir valores a tabla de subasta

        if(int(request.esSubasta)==1):
            fechaInicio = self.getFechaFromTimeStamp(request.fecha_inicio)
            fechaFin = self.getFechaFromTimeStamp(request.fecha_fin)
            sql = "INSERT INTO subasta(idproducto, preciofinal, fechainicio, fechafin, ultimapuja ) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}')"

            cursor.execute(sql.format(id_item, request.precio, fechaInicio, fechaFin, fechaInicio))
            cnx.commit()

        cursor.close()
        cnx.close()
        return Response()

    def getFechaFromTimeStamp(self, fecha):
        if len(fecha) == 0:
            print("fecha vacia")
            return None
        print("no vacio")
        num = fecha.split(':')[1].replace(' ','').replace('\n','')
        a = int(num)
        a = a/1000
        return datetime.fromtimestamp(a)


    def ActualizarStock(self, request, context):
        cnx =mysql.connector.connect(user='root', password='root',
                        host='localhost', port='3306',
                        database='retroshop')
        cursor = cnx.cursor()
        query = (f"UPDATE producto SET `cantidad_disponible` ='{request.cantidad}' where idproducto= '{request.idProducto}'")
        cursor.execute(query)
        cnx.commit()
        cursor.close()
        cnx.close()

        return Response(message = "204 No-Content. Actualizacion exitosa")


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
        query = (f"SELECT c.idcarrito,c.total, pc.idproducto_carrito as productocarrito, pc.cantidad,pc.subtotal,p.idproducto, "+
        "p.precio, p.nombre FROM carrito c "+
        f"inner join producto_carrito pc on c.idcarrito=pc.idcarrito "+
        f"inner join producto p on p.idproducto=pc.idproducto where c.cliente_idusuario = '{request.idusuario}'")
        cursor.execute(query)
        records = cursor.fetchall()
        for row in records:
            yield Producto_Carrito(idproducto = row.idproducto, idcarrito = row.idcarrito, cantidad = row.cantidad, 
            subtotal = row.subtotal, nombre = row.nombre, precio = row.precio, total = row.total, idproductocarrito = row.productocarrito)


    def ActualizarTotalCarrito(self, request, context):
        cnx = mysql.connector.connect(user='root', password='root', 
                        host='localhost', port='3306',
                        database='retroshop')
        cursor = cnx.cursor()
        query = (f"UPDATE carrito SET `total` ='{request.total}' where idcarrito= '{request.idcarrito}'")
        cursor.execute(query)
        cnx.commit()
        cursor.close()
        cnx.close()

        return ResponseCarrito(mensaje = "204 No-Content. Actualizacion exitosa")


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