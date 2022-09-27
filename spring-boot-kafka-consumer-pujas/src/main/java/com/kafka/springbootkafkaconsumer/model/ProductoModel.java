package com.kafka.springbootkafkaconsumer.model;

public class ProductoModel {
    public String nombre;
    public int cantidad;
    public float precio;   
    

    public ProductoModel() {
    }

    public ProductoModel(String nombre2, float precio2, int cantidad2) {
        this.nombre = nombre2;
        this.precio = precio2;
        this.cantidad = cantidad2;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getCantidad() {
        return this.cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public float getPrecio() {
        return this.precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
    }

    
}
