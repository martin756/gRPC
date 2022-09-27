package com.kafka.springbootkafkaconsumer.controller;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kafka.springbootkafkaconsumer.cliente.FacturasClient;
import com.kafka.springbootkafkaconsumer.model.FacturaModel;
import com.kafka.springbootkafkaconsumer.model.FacturaToPDF;

// import io.grpc.springbootkafkaconsumer.facturas.Factura;
import io.grpc.springbootkafkaconsumer.facturas.prodFactura;
import io.grpc.springbootkafkaconsumer.facturas.getFactura;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Properties;




@RestController
public class FacturaController {

    public static final FacturasClient usuario = new FacturasClient("localhost", 50051);

    
    Logger logger = Logger.getLogger(FacturaController.class.getName());

    // @CrossOrigin(origins = "http://localhost:3000")
    // @GetMapping("/factura/{id_factura}")
    // public String getFactura(@PathVariable("id_factura") int id ){

    //     getFactura fac = usuario.getFactura(id);
    //     prodFactura factura = fac.getArticulo(0);
    //     logger.info("Factura 1");
    //     logger.info("Factura "+ factura.getApellidoComprador());
    //     logger.info("Factura "+ factura.getApellidoVendedor());

    //     return factura.toString() ;

    // }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = {"/factura/{id}" }, method = RequestMethod.GET, produces = "application/pdf")
	public @ResponseBody Resource downloadC(HttpServletResponse response, @PathVariable int id) throws FileNotFoundException {
        getFactura request = usuario.getFactura(id);

        logger.info("factura obtenida");
        logger.info(""+ request.getArticulo(0).toString());
        FacturaModel comprobante = new FacturaModel(request);
		File file = GenerarPdf(comprobante);
		
	    response.setContentType("application/pdf");
	    response.setHeader("Content-Disposition", "inline; filename=" + file.getName());
	    response.setHeader("Content-Length", String.valueOf(file.length()));
	    return new FileSystemResource(file);
	}

    public File GenerarPdf(FacturaModel comprobante){
		
		String comprobantePath = "Nro_"+(comprobante.getIdFactura())+".pdf";

        boolean isCreated = FacturaToPDF.ObtenerPDF(comprobantePath, comprobante);

		File file = new File(comprobantePath);
		return file;
	}


}
