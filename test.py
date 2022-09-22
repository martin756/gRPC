import base64
from datetime import datetime
import jinja2
import mysql.connector
import pdfkit

PATH_WKHTMLTOPDF = r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe'

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
    return cursor.fetchall() if fetch_all else cursor.fetchone()


def CrearFactura(id_producto_carrito):
    cursor, conexion = get_cursor_and_connection()
    # id_producto_carrito = request.idproducto_carrito
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
        res = cursor.lastrowid
        update_balance_query = f'''update usuario set saldo = saldo + {producto_carrito['cantidad'] * producto_carrito['precio']} where idusuario = {producto_carrito['vendedor']}'''
        cursor.execute(update_balance_query)
        conexion.commit()
    else:
        res = factura[0]['idfactura']
    cursor.close()
    conexion.close()
    return res


def TraerFacturaByIdUsuario(id_usuario):
    cursor, conexion = get_cursor_and_connection()
    # id_usuario = request.idusuario
    select_query = f'select * from factura where cliente_idusuario = {id_usuario}'
    res = run_select_query(cursor, select_query)

    cursor.close()
    conexion.close()
    return res


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
           
    <h3>{{ nombre_producto }}:</em> {{ cantidad }} - ${{ precio }}</h3>
        
      
      <h2>Total: ${{ total }}</h2>
    </body>
    </html>
    '''


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


def ImprimirFactura (id_factura):
    # id_factura = request.idfactura
    enviroment = jinja2.Environment()
    template = enviroment.from_string(get_pdf_template())
    html_data = template.render(**get_data_factura(id_factura))
    config = pdfkit.configuration(wkhtmltopdf=PATH_WKHTMLTOPDF)
    f = pdfkit.from_string(html_data, configuration=config)
    with open('archivo.pdf', 'wb') as archivo:
        archivo.write(f)
    return base64.b64encode(f)


if __name__ == '__main__':
    id_factura = CrearFactura(id_producto_carrito=4)  # El parametro a mandar aca es el idproductocarrito al cual generarle la factura. Devuelve el id de la factura correspondiente
    print(TraerFacturaByIdUsuario(id_usuario=16))  # Imprime todas las facturas de un usuario. Se envia el id del usuario como parametro
    arch = ImprimirFactura(id_factura=id_factura)  # Se envia el id de factura para el cual generar el archivo pdf
    print(arch.decode('utf-8'))  # Imprime el archivo en forma de string habiendolo encodeado en base64
    with open('archivo_con_encode.pdf', 'wb') as archivo:  # Escribe de nuevo el archivo
        archivo.write(base64.b64decode(arch))