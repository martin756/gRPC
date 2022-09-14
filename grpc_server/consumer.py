from faker import Faker
from kafka import KafkaConsumer
from kafka.structs import TopicPartition

import json

# crear nuevos group ids para poder cargar todo de nuevos
#mantener los mismos para cargar solo lo ultimo

if __name__ == "__main__":
    consumer = KafkaConsumer("TestTopic",
                            bootstrap_servers='127.0.0.1:9092',
                            auto_offset_reset='latest', 
                            group_id="consumer-group-a")
    
    consumer3 = KafkaConsumer("TestTopic",
                            bootstrap_servers='127.0.0.1:9092',
                            auto_offset_reset='earliest',
                            group_id="consumer-group-d")


    print("empezando a consumir")

    for msg in consumer:
        try:
            print("usuario3 = {}".format(json.loads(msg.value)))
            usuario = json.loads(msg.value)
        except:
            print("Error3")
    for msg in consumer:
        try:
            print("usuario = {}".format(json.loads(msg.value)))
            usuario = json.loads(msg.value)
            print(usuario['name'])
            print ("%s:%d:%d: key=%s" % (msg.topic, msg.partition,
                                          msg.offset, msg.key
                                          ))
        except:
            print("Error")






