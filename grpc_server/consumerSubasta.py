from faker import Faker
from kafka import KafkaConsumer
from kafka.structs import TopicPartition
import mysql.connector
from mysql.connector import Error

import json

# crear nuevos group ids para poder cargar todo de nuevos
#mantener los mismos para cargar solo lo ultimo

class ActualizaSubastas():
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

    def actualizarSubasta(self, id, pujador, precio):
        if self.conexion.is_connected():
            try:
                cursor = self.conexion.cursor()
                sql = "update subasta set pujador_idusuario = '{0}', preciofinal = '{1}' , ultimapuja = now() where idproducto = '{2}' "
                cursor.execute(sql.format(pujador, precio, id))
                self.conexion.commit()
            except Error as ex:
                print("Error al intentar conectar conectar: {0}".format(ex))



if __name__ == "__main__":

    bdSubasta = ActualizaSubastas()

    consumer = KafkaConsumer("TopicSubasta",
                            bootstrap_servers='127.0.0.1:9092',
                            group_id="consumer-group-subastas")


    print("empezando a consumir")

    for msg in consumer:
        try:
            subasta = json.loads(msg.value)
            bdSubasta.actualizarSubasta(subasta['idProducto'], subasta['idPujador'], subasta['precio_ofrecido'])
        except:
            print("Error")







