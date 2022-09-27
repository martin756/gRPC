from kafka import KafkaConsumer
from kafka.structs import TopicPartition
import mysql.connector
from mysql.connector import Error

import json

class AgregarFacturas():
    def __init__(self):
        try:
            self.conexion = mysql.connector.connect(
                host = 'localhost', 
                port = 3306,
                user = 'root',
                password = 'root',
                db = 'retroshop'
            )
        except Error as ex:
            print("Error al intentar conectar conectar: {0}".format(ex))

    def agregarFactura(self, factura):
        if self.conexion.is_connected():
            try:
                cursor = self.conexion.cursor()
                insertQuery = ("INSERT INTO factura(fechacompra, vendedor_idusuario, idcarrito, totalfacturado) VALUES "+
                f"('{factura['fechacompra']}', '{factura['datosVendedor']['idusuario']}', '{factura['idcarrito']}', '{factura['totalFacturado']}')")
                cursor.execute(insertQuery)
                idfactura = cursor.lastrowid

                updateQuery = ("UPDATE producto_carrito pc INNER JOIN producto p ON p.idproducto = pc.idproducto "+
                f"SET pc.idfactura = '{idfactura}' WHERE pc.idcarrito = '{factura['idcarrito']}' AND p.publicador_idusuario = '{factura['datosVendedor']['idusuario']}'")
                cursor.execute(updateQuery)
                self.conexion.commit()
            except Error as ex:
                print("Error al intentar conectar conectar: {0}".format(ex))



if __name__ == "__main__":

    bdSubasta = AgregarFacturas()

    consumer = KafkaConsumer("TopicFacturacion",
                            bootstrap_servers='127.0.0.1:9092',
                            group_id="consumer-group-facturacion")


    print("empezando a consumir")

    for msg in consumer:
        try:
            factura = json.loads(msg.value)
            bdSubasta.agregarFactura(factura)
        except Error as ex:
            print("{0}".format(ex))