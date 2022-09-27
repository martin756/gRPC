package com.kafka.springbootkafkaconsumer.model;

import java.util.ArrayList;
import java.util.List;

import io.grpc.springbootkafkaconsumer.facturas.getFactura;
import io.grpc.springbootkafkaconsumer.facturas.prodFactura;

public class FacturaModel {
    private int idFactura;
    private String nombreVendedor;
    private String apellidoVendedor;
    private String nombreComprador;
    private String apellidoComprador;
    List<ProductoModel> productos;

    public FacturaModel(getFactura facturas){
        this.idFactura = 999;
        this.nombreVendedor = facturas.getArticulo(0).getNombreVendedor();
        this.apellidoVendedor = facturas.getArticulo(0).getApellidoVendedor();
        this.nombreComprador = facturas.getArticulo(0).getNombreComprador();
        this.apellidoComprador = facturas.getArticulo(0).getApellidoComprador();
        List<prodFactura> fac = facturas.getArticuloList();
        this.productos = new ArrayList<>();
        for(prodFactura prod: fac){
            ProductoModel prodModel = new ProductoModel(prod.getNombre(), prod.getPrecio(), prod.getCantidad());
            productos.add(prodModel);
        }
    }


    public int getIdFactura() {
        return this.idFactura;
    }

    public void setIdFactura(int idFactura) {
        this.idFactura = idFactura;
    }

    public String getNombreVendedor() {
        return this.nombreVendedor;
    }

    public void setNombreVendedor(String nombreVendedor) {
        this.nombreVendedor = nombreVendedor;
    }

    public String getApellidoVendedor() {
        return this.apellidoVendedor;
    }

    public void setApellidoVendedor(String apellidoVendedor) {
        this.apellidoVendedor = apellidoVendedor;
    }

    public String getNombreComprador() {
        return this.nombreComprador;
    }

    public void setNombreComprador(String nombreComprador) {
        this.nombreComprador = nombreComprador;
    }

    public String getApellidoComprador() {
        return this.apellidoComprador;
    }

    public void setApellidoComprador(String apellidoComprador) {
        this.apellidoComprador = apellidoComprador;
    }

    public List<ProductoModel> getProductos() {
        return this.productos;
    }

    public void setProductos(List<ProductoModel> productos) {
        this.productos = productos;
    }

    
}
