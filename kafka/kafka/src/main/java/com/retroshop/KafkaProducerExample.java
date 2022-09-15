package com.retroshop;


import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;

import java.util.Properties;

public class KafkaProducerExample {

    private static final String TOPIC = "TestTopic";

    public static void main(String[] args) {
        Properties settings = setUpProperties();
        KafkaProducer<String, String> producer =  new KafkaProducer<>(settings);

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("...Stopping Basic Producer...");
            producer.close();
        }));

        publishData(producer);
    }

    private static Properties setUpProperties() {
        Properties settings = new Properties();
        settings.put(ProducerConfig.CLIENT_ID_CONFIG, "basic-producer");
        settings.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        settings.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
        settings.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
        return settings;
    }

    private static void publishData(KafkaProducer producer) {
        for (int index = 40; index < 60; index++) {
            final String key = "key-" + index;
            final String value = "value-" + index;
            final ProducerRecord<String, String> record = new ProducerRecord<>(TOPIC, key, value);
            producer.send(record);
        }
    }
}