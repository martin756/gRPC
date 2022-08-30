from email import message
from usuarios_pb2_grpc import UsuariosServicer, add_UsuariosServicer_to_server
from usuarios_pb2 import Usuario, Response

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
        query = (f"INSERT INTO usuario (`nombre`, `apellido`, `dni`, `email`, `usuario`, `contraseña`) VALUES ('{request.nombre}', '{request.apellido}', '{request.dni}', '{request.email}', '{request.user}', '{request.password}')")
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
            return Usuario(nombre = row.nombre, apellido = row.apellido, dni = row.dni, email = row.email, user = row.usuario, password = row.contraseña)
        else:
            return Usuario()

def start():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    add_UsuariosServicer_to_server(ServicioUsuarios(), server)
    server.add_insecure_port('[::]:50051')
    print("The server is running!")
    server.start()
    server.wait_for_termination()
    pass


if __name__ == "__main__":
    start()