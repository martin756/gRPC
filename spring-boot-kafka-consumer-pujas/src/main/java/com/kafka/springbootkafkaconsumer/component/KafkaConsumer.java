package com.kafka.springbootkafkaconsumer.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumer {

	@Autowired
    private SimpMessagingTemplate template;

    @KafkaListener(topics = "TopicSubasta", groupId = "consumer-group-subastas")
    public void consume(String msg)
    {
        //System.out.println("message: "+msg);
        template.convertAndSend("/topic/ultimaPuja", msg);
    }
}
