package com.kafka.springbootkafkaconsumer.cliente;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.StatusRuntimeException;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import io.grpc.springbootkafkaconsumer.facturas.*;
import io.grpc.springbootkafkaconsumer.facturas.FacturasGrpc.*;

public class FacturasClient {

    private static final Logger logger = Logger.getLogger(FacturasClient.class.getName());

    private final ManagedChannel channel;
    private final FacturasBlockingStub blockingStub;

    public FacturasClient(String host, int port){
        channel = ManagedChannelBuilder.forAddress(host,port).usePlaintext().build();
        blockingStub = FacturasGrpc.newBlockingStub(channel);
    }

    public void shutdown() throws InterruptedException{
        channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
    }

    public getFactura getFactura(int facturaId){
        logger.info("Seteand factura: " + facturaId);
        FacturaId request = FacturaId.newBuilder().setIdfactura(facturaId).build();
        getFactura response;
        try{
            logger.info("intentando obtener factura "+ facturaId);
            response = blockingStub.traerFactura(request);
        }
        catch (StatusRuntimeException e) {
            logger.info("No se pudo");
            return getFactura.newBuilder().build();
        }
        return response;
    }


}
