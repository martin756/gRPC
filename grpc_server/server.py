import base64
from email import message
from time import sleep
import jinja2
import pdfkit
from usuarios_pb2_grpc import UsuariosServicer, add_UsuariosServicer_to_server
from usuarios_pb2 import Usuario, Response
from productos_pb2_grpc import ProductosServicer, add_ProductosServicer_to_server
from productos_pb2 import Producto , ProductoGet ,ProductoPost, ProductoPut, ProductosList, Tipo_categoria
from carritos_pb2_grpc import CarritosServicer, add_CarritosServicer_to_server
from carritos_pb2 import IdCarrito, Carrito, Producto_Carrito, ResponseCarrito
from datetime import datetime
from google.protobuf.timestamp_pb2 import Timestamp
from facturas_pb2 import Factura, IdFactura,IdProductoCarrito, ResponseImprimirFactura
from facturas_pb2_grpc import FacturasServicer, add_FacturasServicer_to_server
import grpc
from concurrent import futures
import mysql.connector

PATH_WKHTMLTOPDF = r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe'


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
            return Usuario(idusuario = row.idusuario, nombre = row.nombre, apellido = row.apellido, dni = row.dni, 
            email = row.email, user = row.usuario, password = row.contraseña, saldo = row.saldo, esMonitor= bool(row.esmonitor) )
        else:
            return Usuario()


    def CargarSaldo(self, request, context):
        cnx =mysql.connector.connect(user='root', password='root',
                             host='localhost', port='3306',
                             database='retroshop')
        cursor = cnx.cursor(named_tuple=True)
        query = (f"SELECT * FROM usuario WHERE idusuario = '{request.idusuario}'")
        
        cursor.execute(query)
        row = cursor.fetchone()
        if row is None:
            return Response(message = "404 Not-Found. El usuario con ese id no existe")
        else:
            query = (f"UPDATE usuario SET `saldo` ='{row.saldo + request.saldo}' where idusuario = '{request.idusuario}' ")
            cursor.execute(query)
            resp = Response(message = f"Saldo total:'{row.saldo + request.saldo}'", idusuario = request.idusuario)
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
        query = (f"select p.*, c.nombre as 'categoria', u.usuario as username from producto p "+
        "inner join tipo_categoria c on p.idtipocategoria = c.idtipocategoria "+
        f"inner join usuario u on p.publicador_idusuario = u.idusuario where idproducto= '{request.idproducto}'")
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

            return result
        else:
            return ProductoGet()


    def TraerProductos(self, request, context):
        cnx = mysql.connector.connect(user='root', password='root', 
                              host='localhost', port='3306',
                              database='retroshop')
        cursor = cnx.cursor(named_tuple=True)
        query = (f"select p.*, c.nombre as 'categoria', u.usuario as username from producto p "+
        "inner join tipo_categoria c on p.idtipocategoria = c.idtipocategoria "+
        "inner join usuario u on p.publicador_idusuario = u.idusuario where p.esSubasta = 0")
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
            fechaInicio = datetime.fromtimestamp(request.fecha_inicio.seconds)#self.getFechaFromTimeStamp(request.fecha_inicio.seconds)
            fechaFin = datetime.fromtimestamp(request.fecha_fin.seconds)#self.getFechaFromTimeStamp(request.fecha_fin.seconds)
            sql = "INSERT INTO subasta(idproducto, preciofinal, fechainicio, fechafin, ultimapuja ) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}')"

            cursor.execute(sql.format(id_item, request.precio, fechaInicio, fechaFin, fechaInicio))
            cnx.commit()

        cursor.close()
        cnx.close()
        return Response(idusuario = id_item, message = "204 No-Content. Producto cargado exitosamente.")

    """def getFechaFromTimeStamp(self, fecha):
        if len(fecha) == 0:
            print("fecha vacia")
            return None
        print("no vacio")
        num = fecha.split(':')[1].replace(' ','').replace('\n','')
        a = int(num)
        a = a/1000
        return datetime.fromtimestamp(a)
        return datetime.fromtimestamp(fecha)"""


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


class FacturasServicio(FacturasServicer):
    @staticmethod
    def get_pdf_template():
        return '''
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Results</title>
        </head>

        <body>
          <h1>Factura {{ idfactura }}</h1>
          <h2>Vendedor: {{ apellido_vendedor }}, {{ nombre_vendedor }}</h2>
          <h2>Comprador: {{ apellido_comprador }}, {{ nombre_comprador }}</h2>
          <ul>
            <li>
              <em>{{ nombre_producto }}:</em> {{ cantidad }} - ${{ precio }}
            </li>
          </ul>
          <h2>Total: ${{ total }}</h2>
        </body>
        </html>
        '''

    @staticmethod
    def get_data_factura(id_factura):
        cursor, conexion = get_cursor_and_connection()
        tables = 'factura f ' \
                 'inner join producto_carrito as pc on f.idproducto_carrito = pc.idproducto_carrito ' \
                 'inner join producto p on pc.idproducto = p.idproducto ' \
                 'inner join usuario comprador on f.cliente_idusuario = comprador.idusuario ' \
                 'inner join usuario vendedor on f.vendedor_idusuario = vendedor.idusuario'
        cols = 'f.idfactura, f.fechacompra, f.cantidad, f.precio, f.total, p.nombre as nombre_producto, comprador.nombre as nombre_comprador, comprador.apellido as apellido_comprador, vendedor.nombre as nombre_vendedor, vendedor.apellido as apellido_vendedor'
        query = f'select {cols} from {tables} where f.idfactura = {id_factura}'
        vals = run_select_query(cursor, query, fetch_all=False)
        cursor.close()
        conexion.close()
        return vals

    def CrearFactura(self, request, context):
        cursor, conexion = get_cursor_and_connection()
        id_producto_carrito = request.idproducto_carrito
        select = f"select idfactura from factura where idproducto_carrito={id_producto_carrito}"
        factura = run_select_query(cursor=cursor, query=select, fetch_all=True)
        if not factura:
            # Traer los valores del idproducto_carrito
            selected_cols = 'idproducto_carrito, cantidad, producto.precio as precio, carrito.cliente_idusuario as comprador, producto.publicador_idusuario as vendedor'
            tables = 'producto_carrito pc inner join producto as producto on pc.idproducto = producto.idproducto inner join carrito as carrito on pc.idcarrito = carrito.idcarrito'
            select_producto_carrito = f"SELECT {selected_cols} FROM {tables} WHERE pc.idproducto_carrito = {id_producto_carrito}"
            producto_carrito = run_select_query(cursor, select_producto_carrito, fetch_all=False)
            value_order = '(`idproducto_carrito`, `fechacompra`, `cantidad`, `precio`, `total`, `vendedor_idusuario`, `cliente_idusuario`)'
            insert_query = f"INSERT INTO factura {value_order} VALUES (%s, %s, %s, %s, %s, %s, %s)"
            tuple_vals = (
                producto_carrito['idproducto_carrito'],
                datetime.today(),
                producto_carrito['cantidad'],
                producto_carrito['precio'],
                producto_carrito['precio'] * producto_carrito['cantidad'],
                producto_carrito['vendedor'],
                producto_carrito['comprador'],
            )
            cursor.execute(insert_query, tuple_vals)
            res = IdFactura(idfactura=cursor.lastrowid)
            conexion.commit()
        else:
            res = IdFactura(idfactura=factura[0]['idfactura'])
        cursor.close()
        conexion.close()
        return res

    def TraerFacturaByIdUsuario(self, request, context):
        cursor, conexion = get_cursor_and_connection()
        id_usuario = request.idusuario
        select_query = f'select * from factura where cliente_idusuario = {id_usuario}'
        result = run_select_query(cursor, select_query)
        cursor.close()
        conexion.close()
        for row in result:
            yield Factura(**row)

    def ImprimirFactura (self, request, context):
        id_factura = request.idfactura
        enviroment = jinja2.Environment()
        template = enviroment.from_string(self.get_pdf_template())
        html_data = template.render(**self.get_data_factura(id_factura))
        config = pdfkit.configuration(wkhtmltopdf=PATH_WKHTMLTOPDF)
        f = pdfkit.from_string(html_data, configuration=config)
        return ResponseImprimirFactura(pdf=base64.b64encode(f).decode('utf-8'))


def get_connection(user='root', password='root', host='localhost', port='3306', database='retroshop'):
    # Idealmente estos datos los tendrian en un .env en cada una de sus maquinas
    return mysql.connector.connect(user=user, password=password, host=host, port=port, database=database)


def get_cursor_and_connection(connection=None, connection_dict=None):
    """
    Funcion que retorna el cursor y la conexion. Si no se recibe la conexion por parametro crea una nueva.
    :param connection: La conexion a utilizar. Puede no recibirse.
    :param connection_dict: Los parametros de conexion en caso que se vaya a crear una nueva con configuraciones particulares.
    :return: El cursor y la conexion (ya sea la proporcionada o una nueva)
    """
    conn = connection or get_connection(**(connection_dict or {}))
    return conn.cursor(dictionary=True), conn  # Usen el cursor como diccionario, retorna cada fila como una hashmap {'clave': 'valor'} donde la clave es el alias del select o el nombre del campo


def run_select_query(cursor, query, fetch_all=True):
    cursor.execute(query)
    return cursor.fetchone() if fetch_all else cursor.fetchall()


def start():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    add_UsuariosServicer_to_server(ServicioUsuarios(), server)
    add_ProductosServicer_to_server(ProductoUsuarios(), server)
    add_CarritosServicer_to_server(CarritoProductos(), server)
    add_FacturasServicer_to_server(FacturasServicio(), server)
    server.add_insecure_port('[::]:50051')
    print("The server is running!")
    server.start()
    server.wait_for_termination()
    pass


if __name__ == "__main__":
    start()