package com.retroshop;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;

import java.util.Properties;

import static java.time.Duration.ofMillis;
import static java.util.Collections.singletonList;
import static org.apache.kafka.clients.consumer.ConsumerConfig.*;

public class KafkaConsumerExample {
    private static final String TOPIC = "TestTopic";

    public static void main(String[] args) {
        Properties settings = setUpProperties();
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(settings);

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("...Stopping Basic Consumer...");
            consumer.close();
        }));

        consumeData(consumer);
    }

    private static Properties setUpProperties() {
        Properties settings = new Properties();
        settings.put(GROUP_ID_CONFIG, "basic-consumer");
        settings.put(BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        settings.put(ENABLE_AUTO_COMMIT_CONFIG, "true");
        settings.put(AUTO_COMMIT_INTERVAL_MS_CONFIG, "1000");
        settings.put(AUTO_OFFSET_RESET_CONFIG, "earliest");
        settings.put(KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        settings.put(VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        return settings;
    }

    private static void consumeData(KafkaConsumer consumer) {
        consumer.subscribe(singletonList(TOPIC));
        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(ofMillis(100));
            for (ConsumerRecord<String, String> record : records) {
                System.out.printf("message offset = %d, key = %s, value = %s\n",
                        record.offset(), record.key(), record.value());
            }
        }
    }
}