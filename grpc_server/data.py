from faker import Faker
from kafka import KafkaProducer
import json
import time

def json_serializer(data):
    return json.dumps(data).encode("utf-8")


producer = KafkaProducer(bootstrap_servers=['127.0.0.1:9092'],
                        value_serializer=json_serializer)


fake = Faker()


def get_user():
    return{
        "name":fake.first_name(),
        "last_name":fake.last_name(),
        "email":fake.email(),
        "username":fake.user_name(),
    }


if __name__ == "__main__":
    print(get_user())
    while 1 ==1 :
        user = get_user()
        print(user)
        producer.send("TestTopic", user)
        time.sleep(4)


